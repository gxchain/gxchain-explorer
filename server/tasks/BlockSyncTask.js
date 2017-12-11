import Promise from 'bluebird';
import LevelDBService from '../services/LevelDBService';
import GXChainService from '../services/GXChainService';

let current_block_height = 0; // 当前已同步区块高度
let max_block_height = 0;  // 最新不可逆区块高度
let syncing = false;  // 是否同步中
let sync_block_length = 100;  // 并行同步区块数量

export default {
    /**
     * 初始化 - 获取上一次已同步的区块高度
     */
    init () {
        return new Promise((resolve) => {
            if (current_block_height !== 0) {
                resolve(current_block_height);
            } else {
                LevelDBService.get('synced_block_height').then((block_height) => {
                    current_block_height = block_height || 0;
                    resolve(current_block_height);
                }).catch(() => {
                    current_block_height = 0;
                    resolve(current_block_height);
                });
            }
        });
    },

    /**
     * 从当前已同步区块同步到指定区块
     * @param block_height 区块高度
     */
    sync_to_block (block_height) {
        let self = this;
        if (syncing) {
            return;
        }
        max_block_height = Math.max(max_block_height, parseInt(block_height));
        if (max_block_height > current_block_height) {
            syncing = true;
            let maxLength = max_block_height - current_block_height;
            let length = Math.min(maxLength, sync_block_length);
            self.batch_sync_block(parseInt(current_block_height), length).then(function (blocks) {
                blocks.forEach(function (block, i) {
                    if (!block) {
                        return;
                    }
                    block.transactions.forEach((transaction, j) => {
                        let tx_id = block.transaction_ids[j]; // GXChain based api will return transaction_ids as an array

                        // Logic for Graphene based chain, we should calculate tx_id ourself
                        // Please do know that this will not work in browser at this time, so do the calc in node
                        // let tr_buffer = ops.transaction.toBuffer(transaction)
                        // let tx_id = hash.sha256(tr_buffer).toString('hex').substr(0, 40);

                        transaction.current_block_number = current_block_height + i;
                        LevelDBService.put(tx_id, JSON.stringify(transaction));
                    });
                });
                current_block_height = parseInt(current_block_height) + length;
                console.log(`${current_block_height}/${max_block_height}已同步,同步区块数:`, blocks.length);
                syncing = false;
                if (current_block_height < max_block_height) {
                    self.sync_to_block(max_block_height);
                }
            }).catch(ex => {
                console.error('同步区块失败', block_height, ex);
                syncing = false;
            });
        }
    },

    /**
     * 批量同步区块
     * @param start 开始区块
     * @param length 后续区块数量
     * @returns {*}
     */
    batch_sync_block (start, length) {
        let promises = [];
        for (var i = 0; i < length; ++i) {
            promises.push(GXChainService.fetch_block(parseInt(start) + i));
        }
        return Promise.all(promises);
    },

    /**
     * 在服务关闭的时候保存当前已同步的区块高度
     */
    store () {
        return new Promise((resolve, reject) => {
            LevelDBService.put('synced_block_height', current_block_height).then(() => {
                resolve(current_block_height);
            }).catch(ex => {
                reject(ex);
            });
        });
    }
};
