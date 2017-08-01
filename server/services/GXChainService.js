import Promise from 'bluebird'
import {Apis} from 'gxbjs-ws'
import {ChainStore, PrivateKey, TransactionBuilder, TransactionHelper, hash, FetchChain, key, Aes} from 'gxbjs'

/**
 * 获取账户信息
 * @param account_name
 * @returns {*}
 */
const fetch_account = function (account_name) {
    return new Promise(function (resolve, reject) {
        return FetchChain('getAccount', account_name).then((account)=> {
            resolve(account);
        }).catch((ex)=> {
            reject(ex);
        });
    })
}


/**
 * 获取最新账户余额
 * @param account_name
 */
const fetch_account_balance = function (account_name) {
    return new Promise((resolve,reject)=>{
        fetch_account(account_name).then((account)=> {
            let balanceObj = account.get('balances').toJS();
            let assets = Object.keys(balanceObj);
            let balanceIds=[];
            assets.forEach(function (asset) {
                balanceIds.push(balanceObj[asset]);
            })
            Apis.instance().db_api().exec('get_objects',[balanceIds],true).then((balances)=>{
                resolve(balances);
            }).catch(ex=>{
                reject(ex);
            })
        }).catch(ex=> {
            reject(ex)
        })
    })
}


/**
 * 获取区块信息
 * @param block_height 区块高度
 */
const fetch_block = function (block_height) {
    return new Promise(function (resolve, reject) {
        return Apis.instance().db_api().exec('get_block', [block_height]).then(function (block) {
            if (!block) {
                resolve(null);
            }
            else {
                resolve(block);
            }
        }).catch(function (ex) {
            reject(ex);
        });
    })
}


export default{
    fetch_block,
    fetch_account,
    fetch_account_balance
};