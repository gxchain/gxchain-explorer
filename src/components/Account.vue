<template>
    <div class="container">
        <Loading v-show="loading"></Loading>
        <section v-if="account_info&&account_info.id" v-show="!loading">
            <div class="row">
                <div class="col-md-12">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <span class="fa fa-fw fa-address-card"></span> {{$t('account.basic.title')}}

                            <a v-if="network.chainId =='4f7d07969c446f8342033acb3ab2ae5044cbe0fde93db02de75bd17fa8fd84b8'"
                               class="pull-right"
                               :href="'https://wallet.gxb.io/#/account/'+account_info.name+'/overview'"
                               target="_blank">{{$t('account.basic.more')}}</a>

                            <a v-else class="pull-right"
                               :href="'https://testnet.wallet.gxchain.org/#/account/'+account_info.name+'/overview'"
                               target="_blank">{{$t('account.basic.more')}}</a>

                        </div>
                        <div class="panel-body no-padding">
                            <div class="table-responsive">
                                <table class="table table-striped no-margin">
                                    <tbody>
                                    <tr>
                                        <th width="220px">{{$t('account.basic.account_name')}}</th>
                                        <td>{{account_info.name}}</td>
                                    </tr>
                                    <tr>
                                        <th>{{$t('account.basic.account_id')}}</th>
                                        <td>{{account_info.id}}</td>
                                    </tr>
                                    <tr>
                                        <th>{{$t('account.basic.referrer_name')}}</th>
                                        <td>
                                            <router-link :to="{path:'/account/'+account_info.referrer_name}">
                                                {{account_info.referrer_name}}({{account_info.referrer}})
                                            </router-link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>{{$t('account.basic.membership')}}</th>
                                        <td>
                                            <div v-html="account_type"></div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <span class="fas fa-gavel"></span>&nbsp;{{$t('account.permissions.title')}}
                        </div>
                        <div class="panel-body no-padding">
                            <div class="table-responsive">
                                <table class="table table-bordered table-striped no-margin">
                                    <tbody>
                                    <tr class="active">
                                        <th width="80%"><span
                                                class="fa fa-lock">&nbsp;{{$t('account.permissions.active')}}</span>
                                        </th>
                                        <th>
                                            {{$t('account.permissions.threshold')}}({{account_info.active.weight_threshold}})
                                        </th>
                                    </tr>
                                    <tr v-for="auth in account_info.active.key_auths">
                                        <td class="overflow-wrap">{{auth[0]}}</td>
                                        <td>{{auth[1]}}</td>
                                    </tr>
                                    <tr class="active">
                                        <th><span class="fa fa-lock">&nbsp;{{$t('account.permissions.owner')}}</span>
                                        </th>
                                        <th>
                                            {{$t('account.permissions.threshold')}}({{account_info.owner.weight_threshold}})
                                        </th>
                                    </tr>
                                    <tr v-for="auth in account_info.owner.key_auths">
                                        <td class="overflow-wrap">{{auth[0]}}</td>
                                        <td>{{auth[1]}}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <span class="fa fa-fw fa-money-check"></span>&nbsp;{{$t('account.balances.title')}}
                        </div>
                        <div class="panel-body no-padding">
                            <table class="table table-striped no-margin">
                                <thead>
                                <tr>
                                    <th>{{$t('account.balances.asset')}}</th>
                                    <th align="right">
                                        <div class="text-right">{{$t('account.balances.balance')}}</div>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="asset in account_info.balances" :key="asset.symbol">
                                    <th>{{asset.symbol}}</th>
                                    <td align="right">{{asset.amount}}</td>
                                </tr>
                                <tr v-if="account_info&&account_info.locked_balances.length>0" key="locked">
                                    <th class="color-warning">{{$t('account.locked_balance')}}</th>
                                    <td align="right">
                                        {{sumLockedBalance(account_info.locked_balances)/100000|number(2)}}
                                    </td>
                                </tr>
                                <tr v-if="account_info&&account_info.pledge_balances.length>0" key="pledge">
                                    <th class="color-warning">{{$t('account.pledge_balance')}}</th>
                                    <td align="right">
                                        {{account_info.pledge_balances[0].amount.amount/100000|number(2)}}
                                    </td>
                                </tr>
                                <tr v-if="Object.keys(account_info.balances).length==0">
                                    <td colspan="2">
                                        <div class="gray text-center">
                                            <small>{{$t('account.balances.empty')}}</small>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <!--ABI-->
                <div class="col-md-6" v-if="is_contract_account">
                    <div class="panel panel-default panel-abi">
                        <div class="panel-heading">
                            <span class="fas fa-angle-right"></span>&nbsp;{{$t('account.contract.abi.title')}}
                        </div>
                        <div class="panel-body no-padding">
                            <ul class="nav nav-tabs" role="tablist">
                                <li :class="{active:abi.type=='raw'}" @click="abi.type='raw'">
                                    <a role="tab" href="javascriprt:;">ABI Raw</a>
                                </li>
                                <li :class="{active:abi.type=='action'}" @click="abi.type='action'">
                                    <a role="tab" href="javascriprt:;">Actions</a>
                                </li>
                                <li :class="{active:abi.type=='table'}" @click="abi.type='table'">
                                    <a role="tab" href="javascriprt:;">Tables</a>
                                </li>
                            </ul>
                            <div class="tab-content">
                                <div role="tabpanel" class="tab-pane" :class="{active:abi.type=='raw'}">
                                    <pre>{{JSON.stringify(account_info.abi,null,'  ')}}</pre>
                                </div>
                                <div role="tabpanel" class="tab-pane" :class="{active:abi.type=='action'}">
                                    <div class="table-responsive no-padding no-margin" style="border:none">
                                        <table class="table table-striped">
                                            <thead>
                                            <tr>
                                                <th>Payable</th>
                                                <th>Define</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr v-for="action in account_info.abi.actions" :key="action.name">
                                                <td>{{action.payable}}</td>
                                                <td>{{getActionDefine(action.name)}}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div role="tabpanel" class="tab-pane" :class="{active:abi.type=='table'}">
                                    <div class="panel panel-default panel-tables"
                                         v-for="table in getTableDefine(account_info.abi.tables)">
                                        <div class="panel-heading"><span class="fa fa-fw fa-list"></span> {{table.name}}
                                        </div>
                                        <div class="table-responsive">
                                            <table class="table table-striped">
                                                <thead>
                                                <tr>
                                                    <th width="150">type</th>
                                                    <th>field</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr v-for="field in table.fields" :key="field.name">
                                                    <td>{{field.type}}</td>
                                                    <td>{{field.name}}</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--Code-->
                <div class="col-md-6" v-if="is_contract_account">
                    <div class="panel panel-default panel-code">
                        <div class="panel-heading">
                            <span class="fas fa-code"></span>&nbsp;{{$t('account.contract.code.title')}}
                        </div>
                        <div class="panel-body no-padding">
                            <ul class="nav nav-tabs" role="tablist">
                                <li :class="{active:code.type=='wast'}" @click="code.type='wast'">
                                    <a role="tab" href="javascriprt:;">WAST</a>
                                </li>
                                <li :class="{active:code.type=='wasm'}" @click="code.type='wasm'">
                                    <a role="tab" href="javascriprt:;">WASM</a>
                                </li>
                            </ul>
                            <div class="tab-content">
                                <div role="tabpanel" class="tab-pane" :class="{active:code.type=='wast'}">
                                    <pre>{{this.code.wast}}</pre>
                                </div>
                                <div role="tabpanel" class="tab-pane wasm" :class="{active:code.type=='wasm'}">
                                    <pre>{{account_info.code}}</pre>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--Database-->
            <div class="row">
                <div class="col-md-12" v-if="is_contract_account">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <span class="fas fa-database"></span>&nbsp;{{$t('account.contract.database.title')}}
                            <select v-model="current_table.name">
                                <option v-for="table in account_info.abi.tables" :value="table.name" :key="table.name">
                                    {{table.name}}
                                </option>
                            </select>
                            <a class="btn btn-sm btn-default" :class="{disabled:current_table.page===0}"
                               @click=loadTableData(current_table.page-1)>
                                <i class="fa fa-arrow-left"></i>
                            </a>
                            <a class="btn btn-sm btn-default" :class="{disabled:!current_table.hasMore}"
                               @click="loadTableData(current_table.page+1)">
                                <i class="fa fa-arrow-right"></i>
                            </a>
                        </div>
                        <div class="panel-body no-padding">
                            <div class="table-responsive no-margin">
                                <table class="table table-bordered table-striped no-margin">
                                    <thead>
                                    <tr>
                                        <th v-for="h in current_table.headers">{{h}}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-if="current_table.data.length>0" v-for="row in current_table.data">
                                        <td v-for="v in row">{{v}}</td>
                                    </tr>
                                    <tr v-if="current_table.data.length==0">
                                        <td class="text-center" :colspan="current_table.headers.length">
                                            <small>{{$t('account.contract.database.no_record')}}</small>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--Recent Transactions-->
            <div class="row">
                <div class="col-md-12">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <span class="fa fa-fw gxicon gxicon-transaction"></span>&nbsp;{{$t('index.transactions.title')}}
                        </div>
                        <div class="panel-body no-padding">
                            <Loading v-show="history_loading"></Loading>
                            <div class="table-responsive">
                                <table class="table table-striped table-bordered no-margin" v-show="!history_loading">
                                    <thead>
                                    <tr>
                                        <th>{{$t('index.transactions.type')}}</th>
                                        <th>{{$t('index.transactions.content')}}</th>
                                        <th class="right" width="80">{{$t('index.transactions.time')}}</th>
                                    </tr>
                                    </thead>
                                    <History_Op :latestTransactions="latestTransactions" parent="Account"></History_Op>
                                </table>
                            </div>
                            <div class="load-box" v-if="totalPage > 0">
                                <span class="more" v-if="pageNo < totalPage" @click="loadMoreHistory">{{$t('account.basic.more')}}</span>
                                <span class="no-more" v-else>{{$t('account.basic.no_more')}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div v-if="!account_info||!account_info.id" v-show="!loading">
            <h4 class="page-header">{{$t('account.title')}}</h4>
            <p class="null-tip">{{$t('account.empty')}}</p>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import { ChainStore } from 'gxbjs';
    import { Apis } from 'gxbjs-ws';
    import { get_assets_by_ids, fetch_account_by_chain, fetch_account_history } from '@/services/CommonService';
    import filters from '@/filters';
    import History_Op from './partial/History_Op.vue';

    export default {
        data () {
            return {
                loading: true,
                history_loading: true,
                abi: {
                    type: 'raw'
                },
                code: {
                    type: 'wast',
                    wast: ''
                },
                current_table: {
                    headers: [],
                    name: '',
                    page: 0,
                    primary_key: null,
                    upper_bound: -1,
                    lower_bound: 0,
                    hasMore: false,
                    data: []
                },
                account_info: null,
                latestTransactions: [],
                isTrustNode: -1,
                network: process.env.network,
                ChainStore,
                pageNo: 1,
                pageSize: 10,
                totalPage: 0
            };
        },
        filters: filters,
        methods: {

            ...mapActions({
                setKeywords: 'setKeywords'
            }),
            getWAST () {
                this.$http.post('/api/wasm2wast', {wasm: this.account_info.code}).then(resp => {
                    this.code.wast = resp.body.wast;
                }).catch(console.error);
            },
            sumLockedBalance (balances) {
                var sum = 0;
                balances.forEach(b => {
                    sum += Number(b.amount.amount);
                });
                return sum;
            },
            getActionDefine (action_name) {
                let actionDef = this.account_info.abi.structs.find(s => s.name === action_name);
                return `void ${action_name}(${actionDef.fields.map(f => `${f.type} ${f.name}`).join(', ')})`;
            },
            getTableDefine (tables) {
                return this.account_info.abi.structs.filter(s => tables.find(t => t.name === s.name));
            },
            loadTableData (page) {
                const pageSize = 10;
                if (page < this.current_table.page) {
                    this.current_table.upper_bound = this.current_table.lower_bound + 1;
                }
                if (page === 0) {
                    this.current_table.upper_bound = -1;
                }
                Apis.instance().db_api().exec('get_table_rows_ex', [
                    this.account_info.name, // contract_name
                    this.current_table.name, // table_name
                    {
                        lower_bound: 0,
                        upper_bound: this.current_table.upper_bound,
                        reverse: true,
                        limit: pageSize
                    }
                ]).then(resp => {
                    this.current_table.page = page;
                    if (resp.rows.length > 0) {
                        this.current_table.lower_bound = resp.rows[0][this.current_table.primary_key];
                        this.current_table.upper_bound = resp.rows[resp.rows.length - 1][this.current_table.primary_key];
                    }
                    this.current_table.data = resp.rows.map(row => {
                        let result = [];
                        this.current_table.headers.forEach(h => {
                            result.push(row[h]);
                        });
                        return result;
                    });
                    this.current_table.hasMore = resp.rows.length === pageSize;
                });
            },
            loadTrustNodeInfo (id) {
                if (this.trustNodeInfoLoading) {
                    return;
                }
                this.trustNodeInfoLoading = true;
                Promise.all([
                    Apis.instance().db_api().exec('get_witness_by_account', [id]),
                    Apis.instance().db_api().exec('get_committee_member_by_account', [id])
                ]).then(results => {
                    this.isTrustNode = results[0] && results[1];
                });
            },
            loadAccountHistory (id, pageNo, pageSize, dataList) {
                fetch_account_history(this.account_info.id, pageNo, pageSize).then(res => {
                    const respList = res.body.list;
                    const list = dataList || [];
                    this.totalPage = Math.ceil(res.body.totalCount / pageSize);
                    for (let i = 0; i < respList.length; i++) {
                        const item = [];
                        item[0] = respList[i].operation_type;
                        item[1] = respList[i].operation_history.op_object;
                        if (item[1].hasOwnProperty('amount_')) {
                            item[1].amount = item[1].amount_;
                        }
                        item['block_id'] = respList[i].block_data.block_num;
                        item['timestamp'] = new Date(respList[i].block_data.block_time + 'Z').format('yyyy-MM-dd hh:mm:ss');
                        list.push(item);
                    }
                    this.latestTransactions = list;
                    this.history_loading = false;
                }).catch((ex) => {
                    console.error(ex);
                    this.history_loading = false;
                });
            },
            loadMoreHistory () {
                this.pageNo++;
                this.loadAccountHistory(this.account_info.id, this.pageNo, this.pageSize, this.latestTransactions);
            },
            onUpdate () {
                fetch_account_by_chain(this.$route.params.id_or_name).then(res => {
                    this.account_info = res.toJS();
                    if (this.account_info && this.account_info.code && !this.code.wast) {
                        if (this.account_info.abi.tables.length > 0) {
                            this.current_table.name = this.account_info.abi.tables[0].name;
                        }
                        this.getWAST();
                    }
                    if (this.account_info && this.account_info.id && this.isTrustNode === -1) {
                        this.loadTrustNodeInfo(this.account_info.id);
                        this.loadAccountHistory(this.account_info.id, this.pageNo, this.pageSize);
                    }
                    let ids = Object.keys(this.account_info.balances);
                    get_assets_by_ids(ids).then(assets => {
                        let assetMap = {};
                        assets.forEach(asset => {
                            assetMap[asset.id] = asset;
                        });
                        for (let i = 0; i < ids.length; i++) {
                            if (typeof this.account_info.balances[ids[i]] !== 'object') {
                                let obj = {
                                    symbol: assetMap[ids[i]].symbol,
                                    amount: filters.number(((ChainStore.getObject(this.account_info.balances[ids[i]]).get('balance') || 0) / 100000).toFixed(assetMap[ids[i]].precision), assetMap[ids[i]].precision)
                                };
                                this.account_info.balances[ids[i]] = obj;
                            }
                        }
                    });
                    this.loading = false;
                    return null;
                }).catch((ex) => {
                    console.error(ex);
                    this.loading = false;
                });
            }
        },
        watch: {
            keywords (newVal, oldVal) {
                if (!oldVal) return; // 防止页面刷新，触发2次onUpdate调用
                this.loading = true;
                this.account_info = null;
                this.current_table = {
                    headers: [],
                    name: '',
                    primary_key: null,
                    upper_bound: -1,
                    lower_bound: 0,
                    page: 0,
                    data: [],
                    hasMore: false
                };
                this.code.wast = '';
                this.isTrustNode = -1;
                this.pageNo = 1;
                this.latestTransactions = [];
                this.onUpdate();
            },
            'current_table.name': function (val) {
                if (val) {
                    this.account_info.abi.structs.forEach(s => {
                        if (s.name === val) {
                            this.current_table.headers = s.fields.map(f => f.name);
                            this.current_table.primary_key = null;
                            if (this.current_table.headers.length > 0) {
                                this.current_table.primary_key = this.current_table.headers[0];
                            }
                            this.current_table.page = 0;
                            this.current_table.upper_bound = -1;
                            this.current_table.lower_bound = 0;
                            this.loadTableData(0);
                        }
                    });
                }
            },
            '$route' () {
                if (this.$route.params.id_or_name !== this.keywords) {
                    this.loading = true;
                    this.account_info = null;
                    this.latestTransactions = [];
                    this.setKeywords({keywords: this.$route.params.id_or_name});
                }
            }
        },
        computed: {

            ...mapGetters({
                keywords: 'keywords'
            }),

            is_contract_account () {
                return this.account_info && !!this.account_info.code;
            },

            account_type () {
                let result = [];
                if (this.account_info.code) {
                    return `<span class="label label-warning">${this.$t('account.membership.contract')}</span>`;
                }
                if (this.account_info.membership_expiration_date !== '1970-01-01T00:00:00') {
                    result.push(`<span class="label label-warning">${this.$t('account.membership.lifetime')}</span>`);
                } else {
                    result.push(`<span class="label label-default">${this.$t('account.membership.normal')}</span>`);
                }
                if (this.isTrustNode) {
                    result.push(`<span class="label label-success">${this.$t('account.membership.trustnode')}</span>`);
                }
                return result.join('&nbsp;');
            }
        },
        mounted () {
            if (this.$route.params.id_or_name !== this.keywords) {
                this.setKeywords({keywords: this.$route.params.id_or_name});
            }
            this.onUpdate();
        },
        destroyed () {
        },
        components: {
            History_Op: History_Op
        }
    };
</script>

<style scoped>
    .color-warning {
        color: #ffbc10;
    }

    .right {
        text-align: right;
    }

    .center {
        text-align: center;
    }

    .more-btn {
        cursor: pointer;
    }

    .overflow-wrap {
        word-break: break-all;
    }

    .panel .table-responsive {
        margin-bottom: 0;
        border: none;
    }

    .panel-abi pre, .panel-code pre {
        border: none;
        border-top: 1px solid #eee;
        border-radius: 0;
        margin: 0;
        max-height: 500px;
    }

    .panel-code .wasm pre {
        white-space: normal
    }

    .panel-code .panel-heading, .panel-abi .panel-heading {
        border-bottom: 1px solid #eee;
    }

    .panel-code .panel-body, .panel-abi .panel-body {
        padding-top: 10px !important;
    }

    .panel-tables {
        margin: 10px;
    }

    .panel-tables .panel-heading {
        font-size: 15px;
        background: #eee;
        padding: 5px;
    }
    .load-box {
        padding: 8px;
        text-align: center;
    }
    .load-box .more {
        color: #6699ff;
    }
    .load-box .more:hover {
        text-decoration: underline;
        cursor: pointer;
    }
    .load-box .no-more {
        color: #333333;
    }
</style>
