import Promise from 'bluebird';
import { Apis } from 'gxbjs-ws';
import { ChainStore } from 'gxbjs';
import Immutable from 'immutable';
import superagent from 'superagent';
import config from '../../config';

/**
 * fetch account information by account name or id
 * @param account_name
 */
const fetch_account = account_name => {
  return Apis.instance()
    .db_api()
    .exec('get_account_by_name', [account_name]);
};

/**
 * fetch full account information by name
 * @param account_name
 * @returns {bluebird}
 */
const fetch_full_account = account => {
  return Apis.instance()
    .db_api()
    .exec('get_full_accounts', [[account], false]);
};

/**
 * fetch account history by account name or id
 * @param id_or_name
 * @returns {bluebird}
 */
const fetch_account_history = (id_or_name, pageNo, pageSize) => {
  console.log(JSON.parse(config.build.env.ES_PLUGIN));
  return new Promise(function(resolve, reject) {
    if (id_or_name.indexOf('.') === -1) {
      fetch_account(id_or_name)
        .then(account => {
          superagent
            .post(JSON.parse(config.build.env.ES_PLUGIN))
            .set('Content-Type', 'application/json')
            .send({
              query: {
                bool: {
                  must: [
                    {
                      term: {
                        'account_history.account': account.id
                      }
                    }
                  ]
                }
              },
              from: (pageNo - 1) * pageSize,
              size: pageSize,
              sort: [{ 'block_data.block_time': 'desc' }]
            })
            .end((err, res) => {
              if (err) {
                reject(err);
              } else {
                try {
                  const respList = res.body.hits.hits;
                  const list = [];
                  for (let i = 0; i < respList.length; i++) {
                    list.push(respList[i]._source);
                  }
                  resolve({
                    list,
                    totalCount: res.body.hits.total,
                    pageNo,
                    pageSize
                  });
                } catch (ex) {
                  reject(ex);
                }
              }
            });
        })
        .catch(ex => {
          reject(ex);
        });
    } else {
      superagent
        .post(JSON.parse(config.build.env.ES_PLUGIN))
        .set('Content-Type', 'application/json')
        .send({
          query: {
            bool: {
              must: [
                {
                  term: {
                    'account_history.account': id_or_name
                  }
                }
              ]
            }
          },
          from: (pageNo - 1) * pageSize,
          size: pageSize,
          sort: [{ 'block_data.block_time': 'desc' }]
        })
        .end((err, res) => {
          if (err) {
            reject(err);
          } else {
            try {
              const respList = res.body.hits.hits;
              const list = [];
              for (let i = 0; i < respList.length; i++) {
                list.push(respList[i]._source);
              }
              resolve({
                list,
                totalCount: res.body.hits.total,
                pageNo,
                pageSize
              });
            } catch (ex) {
              reject(ex);
            }
          }
        });
    }
  });
};

/**
 * fetch account balance of GXC by account name or id
 * @param id_or_name
 * @returns {bluebird}
 */
const fetch_account_balance = id_or_name => {
  return new Promise((resolve, reject) => {
    if (id_or_name.indexOf('.') === -1) {
      fetch_account(id_or_name)
        .then(account => {
          return Apis.instance()
            .db_api()
            .exec('get_account_balances', [account.id, []]);
        })
        .then(balances => {
          resolve(balances);
        })
        .catch(ex => {
          reject(ex);
        });
    } else {
      Apis.instance()
        .db_api()
        .exec('get_account_balances', [id_or_name, []])
        .then(balances => {
          resolve(balances);
        })
        .catch(ex => {
          reject(ex);
        });
    }
  });
};

/**
 * fetch vest balance of GXC by account name or id
 * @param id_or_name
 * @returns {bluebird}
 */
const get_vesting_balances = (id_or_name) => {
  return new Promise((resolve, reject) => {
    if (id_or_name.indexOf('.') === -1) {
      fetch_account(id_or_name)
        .then((account) => {
          return Apis.instance().db_api().exec('get_vesting_balances', [account.id, []]);
        })
        .then((balances) => {
          resolve(balances);
        })
        .catch((ex) => {
          reject(ex);
        });
    } else {
      Apis.instance()
        .db_api()
        .exec('get_vesting_balances', [id_or_name, []])
        .then((balances) => {
          resolve(balances);
        })
        .catch((ex) => {
          reject(ex);
        });
    }
  });
};

/**
 * 获取区块信息
 * @param block_height 区块高度
 */
const fetch_block = function(block_height) {
  return new Promise(function(resolve, reject) {
    return Apis.instance()
      .db_api()
      .exec('get_block', [parseInt(block_height)])
      .then(function(block) {
        if (!block) {
          resolve(null);
        } else {
          resolve(block);
        }
      })
      .catch(function(ex) {
        reject(ex);
      });
  });
};

/**
 * 资产信息
 * @param asset_name
 */
const fetch_asset = function(asset_name) {
  return new Promise(function(resolve, reject) {
    return Apis.instance()
      .db_api()
      .exec('lookup_asset_symbols', [[asset_name]])
      .then(function(assets) {
        let asset = assets && assets.length > 0 ? assets[0] : {};
        if (asset.id) {
          Apis.instance()
            .db_api()
            .exec('get_objects', [[asset.dynamic_asset_data_id, asset.issuer]])
            .then(objs => {
              asset.detail = objs[0];
              asset.issuer = objs[1];
              resolve(asset);
            });
        } else {
          resolve(asset);
        }
      })
      .catch(function(ex) {
        reject(ex);
      });
  });
};

/**
 * 链上资产列表
 */
const fetch_assets = function() {
  return new Promise(function(resolve, reject) {
    return Apis.instance()
      .db_api()
      .exec('list_assets', ['A', 100])
      .then(function(assets) {
        let ids = [];
        assets.forEach(asset => {
          ids.push(asset.dynamic_asset_data_id);
          ids.push(asset.issuer);
        });
        Apis.instance()
          .db_api()
          .exec('get_objects', [ids])
          .then(objs => {
            assets.forEach((asset, i) => {
              asset.detail = objs[2 * i];
              asset.issuer = objs[2 * i + 1];
            });
            resolve(assets);
          });
      })
      .catch(function(ex) {
        reject(ex);
      });
  });
};

/**
 * GXC供应量查询接口
 */
const gxc_supply = function() {
  return new Promise(function(resolve, reject) {
    return Apis.instance()
      .db_api()
      .exec('get_objects', [['2.3.1']])
      .then(function(resps) {
        resolve(resps[0]);
      })
      .catch(ex => {
        reject(ex);
      });
  });
};

/**
 * 获取产品信息
 * @param prod_id
 */
const fetch_product = function(prod_id) {
  return new Promise(function(resolve, reject) {
    let prod = ChainStore.objects_by_id.get(prod_id);
    if (prod) {
      prod = prod.toJS();
      prod.schema_contexts = prod.schema_contexts.map(function(schema) {
        if (typeof schema.schema_context === 'string') {
          schema.schema_context = JSON.parse(schema.schema_context);
        }
        return schema;
      });
      resolve(prod);
    } else {
      return Apis.instance()
        .db_api()
        .exec('get_objects', [[prod_id]])
        .then(function(resp) {
          if (!resp || resp.length === 0) {
            reject(new Error('product not found'));
          } else {
            let prod = Object.assign({ schema_contexts: [] }, resp[0]);
            prod.schema_contexts = prod.schema_contexts.map(function(schema) {
              if (typeof schema.schema_context === 'string') {
                schema.schema_context = JSON.parse(schema.schema_context);
              }
              return schema;
            });
            ChainStore.objects_by_id.set(prod_id, Immutable.fromJS(prod));
            resolve(prod);
          }
        })
        .catch(function(ex) {
          reject(ex);
        });
    }
  });
};

const fetch_candidates = function() {
  let filtered_nodes = [
    'aaron',
    'caitlin',
    'kairos',
    'sakura',
    'taffy',
    'init0',
    'init1',
    'init2',
    'init3',
    'init4',
    'init5',
    'init6',
    'init7',
    'init8',
    'init9',
    'init10',
    'miner1',
    'miner2',
    'miner3',
    'miner4',
    'miner5',
    'miner6',
    'miner7',
    'miner8',
    'miner9',
    'miner10',
    'miner11',
    'hrrs',
    'dennis1',
    'david12',
    'marks-lee',
    'robin-green',
    'coinget-bp'
  ];
  return Apis.instance()
    .db_api()
    .exec('get_trust_nodes', [])
    .then(nodes => {
      return Promise.all([
        Apis.instance()
          .db_api()
          .exec('get_full_accounts', [nodes, false]),
        superagent.get(
          'https://static.gxb.io/dapp/blockcity/nodevote/trustNode.json'
        )
      ]).then(results => {
        let accounts = results[0];
        let trustNodeOffChainInfo = JSON.parse(results[1].text).list;
        let candidates = accounts.map(a => {
          let info = trustNodeOffChainInfo.find(
            t => t.accountName === a[1].account.name
          );
          return {
            id: a[1].account.id,
            account: a[1].account.name,
            margin:
              a[1].pledge_balances.length > 0
                ? a[1].pledge_balances[0].amount.amount
                : 0,
            votes: 0,
            extra: info || null
          };
        });
        candidates = candidates.filter(c => {
          return filtered_nodes.indexOf(c.account) === -1;
        });
        let promises = candidates.map(c => {
          return Apis.instance()
            .db_api()
            .exec('get_witness_by_account', [c.id]);
        });
        return Promise.all(promises).then(witnesses => {
          candidates = candidates
            .map((c, i) => {
              c.votes = witnesses[i].total_votes;
              c.total_vote_weights = witnesses[i].total_vote_weights;
              c.commission_rate = witnesses[i].commission_rate;
              c.witness_info = witnesses[i];
              return c;
            })
            .sort((a, b) => {
              if (a.commission_rate === b.commission_rate) {
                return a.total_vote_weights - b.total_vote_weights;
              } else {
                return b.commission_rate - a.commission_rate;
              }
            });
          return candidates.filter((c) => {
            return c.witness_info.is_valid;
          });
        });
      });
    })
    .catch(ex => {
      console.error(ex);
    });
};

export default {
  gxc_supply,
  fetch_block,
  fetch_asset,
  fetch_assets,
  fetch_account,
  fetch_full_account,
  fetch_account_history,
  fetch_account_balance,
  get_vesting_balances,
  fetch_product,
  fetch_candidates
};
