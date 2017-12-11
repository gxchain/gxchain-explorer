import Promise from 'bluebird';
import { Apis } from 'gxbjs-ws';
import { ChainStore } from 'gxbjs';
import Immutable from 'immutable';

/**
 * get account information by name
 * @param account_name
 */
const fetch_account = (account_name) => {
    return Apis.instance().db_api().exec('get_account_by_name', [account_name]);
};

const fetch_full_account = (account) => {
    return Apis.instance().db_api().exec('get_full_accounts', [[account], true]);
};

/**
 * fetch account balance of GXS by account name or id
 * @param account_name
 * @returns {bluebird}
 */
const fetch_account_balance = (account_name) => {
    return new Promise((resolve, reject) => {
        resolve(fetch_account(account_name).then((account) => {
            return Apis.instance().db_api().exec('get_account_balances', [account.id, []]).then(function (balances) {
                return balances;
            });
        }).catch((ex) => { reject(ex) }));
    });
};

/**
 * 获取区块信息
 * @param block_height 区块高度
 */
const fetch_block = function (block_height) {
    return new Promise(function (resolve, reject) {
        return Apis.instance().db_api().exec('get_block', [parseInt(block_height)]).then(function (block) {
            if (!block) {
                resolve(null);
            } else {
                resolve(block);
            }
        }).catch(function (ex) {
            reject(ex);
        });
    });
};

/**
 * 公信股供应量查询接口
 */
const gxs_supply = function () {
    return new Promise(function (resolve, reject) {
        return Apis.instance().db_api().exec('get_objects', [['2.3.1']]).then(function (resps) {
            resolve(resps[0]);
        }).catch((ex) => {
            reject(ex);
        });
    });
};

/**
 * 获取产品信息
 * @param prod_id
 */
const fetch_product = function (prod_id) {
    return new Promise(function (resolve, reject) {
        let prod = ChainStore.objects_by_id.get(prod_id);
        if (prod) {
            prod = prod.toJS();
            prod.schema_contexts = prod.schema_contexts.map(function (schema) {
                if (typeof schema.schema_context === 'string') {
                    schema.schema_context = JSON.parse(schema.schema_context);
                }
                return schema;
            });
            resolve(prod);
        } else {
            return Apis.instance().db_api().exec('get_objects', [[prod_id]]).then(function (resp) {
                if (!resp || resp.length === 0) {
                    reject(new Error('product not found'));
                } else {
                    let prod = Object.assign({schema_contexts: []}, resp[0]);
                    prod.schema_contexts = prod.schema_contexts.map(function (schema) {
                        if (typeof schema.schema_context === 'string') {
                            schema.schema_context = JSON.parse(schema.schema_context);
                        }
                        return schema;
                    });
                    ChainStore.objects_by_id.set(prod_id, Immutable.fromJS(prod));
                    resolve(prod);
                }
            }).catch(function (ex) {
                reject(ex);
            });
        }
    });
};

export default {
    gxs_supply,
    fetch_block,
    fetch_account,
    fetch_full_account,
    fetch_account_balance,
    fetch_product
};
