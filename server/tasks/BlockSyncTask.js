import Promise from 'bluebird'
import LevelDBService from '../services/LevelDBService'
import GXChainService from '../services/GXChainService'
import {ChainStore, ops, hash} from 'gxbjs'

let current_block_height = 0;
let max_block_height = 0;
let syncing = false;
let sync_block_length = 1000;

export default{
    init(){
        return new Promise((resolve, reject)=> {
            if (current_block_height != 0) {
                resolve(current_block_height);
            }
            else {
                LevelDBService.get('synced_block_height').then((block_height)=> {
                    current_block_height = block_height || 0;
                    resolve(current_block_height);
                }).catch(ex=> {
                    current_block_height = 0;
                    resolve(current_block_height);
                })
            }
        });
    },

    sync_to_block(block_height){
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
                    block.transactions.forEach((transaction, i)=> {
                        let tx_id = block.transaction_ids[i];
                        // let tr_buffer = ops.transaction.toBuffer(transaction)
                        // let tx_id = hash.sha256(tr_buffer).toString('hex').substr(0, 40);
                        LevelDBService.put(tx_id, JSON.stringify(transaction));
                    });
                });
                current_block_height = parseInt(current_block_height) + length;
                console.log(`${current_block_height}/${max_block_height}已同步,同步区块数:`, blocks.length);
                syncing = false;
                if (current_block_height < max_block_height) {
                    self.sync_to_block(max_block_height);
                }
            }).catch(ex=> {
                console.error('同步区块失败', block_height, ex);
                syncing = false;
            });
        }
    },

    batch_sync_block(start, length){
        let promises = [];
        for (var i = 0; i < length; ++i) {
            promises.push(GXChainService.fetch_block(parseInt(start) + i));
        }
        return Promise.all(promises);
    },

    store(){
        return new Promise((resolve, reject)=> {
            LevelDBService.put('synced_block_height', current_block_height).then((block_height)=> {
                resolve(current_block_height);
            }).catch(ex=> {
                reject(ex);
            })
        });
    }
}