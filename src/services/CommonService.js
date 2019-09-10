import Vue from 'vue';
import Promise from 'bluebird';
import { Apis } from 'gxbjs-ws';
import { ChainStore } from 'gxbjs';
import { deserializeCallData } from 'gxbjs/es/tx_serializer';
import Immutable from 'immutable';

let FetchChain = ChainStore.FetchChain;

const baseURL = location.host;

export const fetch_block = (block_height) => {
    return Vue.http.get(`//${baseURL}/api/block/${block_height}`, {
        responseType: 'json'
    });
};

export const fetch_transaction = (tx_id, t) => {
    let _t = t ? `?t=${t}` : '';
    return Vue.http.get(`//${baseURL}/api/transaction/${tx_id}${_t}`, {
        responseType: 'json'
    });
};

export const fetch_account = (id_or_name) => {
    return Vue.http.get(`//${baseURL}/api/account/${id_or_name}`, {
        responseType: 'json'
    });
};

export const fetch_account_history = (id_or_name, pageNo, pageSize) => {
    return Vue.http.get(`//${baseURL}/api/account_history/${id_or_name}?pageNo=${pageNo}&pageSize=${pageSize}`, {
        responseType: 'json'
    });
};

export const fetch_account_balance = (id_or_name) => {
    return Vue.http.get(`//${baseURL}/api/account_balance/${id_or_name}`, {
        responseType: 'json'
    });
};

export const fetch_product = (product_id) => {
    return Vue.http.get(`//${baseURL}/api/product/${product_id}`, {
        responseType: 'json'
    });
};

export const fetch_account_by_chain = (account_name) => {
    return new Promise(function (resolve, reject) {
        return FetchChain('getAccount', account_name).then((account) => {
            resolve(account);
        }).catch((ex) => {
            reject(ex);
        });
    });
};

export const fetch_product_by_chain = (prod_id) => {
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

/**
 * get objects by id
 * @param ids
 */
export const get_objects = (ids) => {
    return Apis.instance().db_api().exec('get_objects', [ids]);
};

export const deserialize_contract_params = (contract, method, data) => {
    return get_objects([contract]).then(accs => {
        return deserializeCallData(method, data, accs[0].abi);
    });
};

export const calc_block_time = (block_number, block_interval, head_block, head_block_time) => {
    if (!block_interval || !head_block) return null;
    const seconds_below = (head_block - block_number) * block_interval;
    return new Date(head_block_time - seconds_below * 1000);
};

let fallbackStore = {};
export const set_item = (key, val) => {
    try {
        localStorage.setItem(key, val);
    } catch (ex) {
        console.log('fallback to memory store');
        fallbackStore[key] = val;
    }
};

export const get_item = (key) => {
    try {
        return localStorage.getItem(key);
    } catch (ex) {
        return fallbackStore[key];
    }
};
