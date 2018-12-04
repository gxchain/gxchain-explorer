<template>
    <div class="container">
        <Loading v-show="loading"></Loading>
        <div class="row" v-if="account_info&&account_info.id" v-show="!loading">
            <div class="col-md-12">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <span class="fa fa-address-card-o">&nbsp;{{$t('account.basic.title')}}</span>
                        <a class="pull-right" :href="'https://wallet.gxb.io/#/account/'+account_info.name+'/overview'"
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
            <div class="col-md-6" v-if="is_contract_account">
                <div class="panel panel-default panel-abi">
                    <div class="panel-heading">
                        <span class="fa fa-legal"></span>&nbsp;{{$t('account.contract.abi.title')}}
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

                                <div class="panel panel-default panel-tables" v-for="table in getTableDefine(account_info.abi.tables)">
                                    <div class="panel-heading"><span class="fa fa-list"></span> {{table.name}}</div>
                                    <div class="table-responsive">
                                        <table class="table table-striped">
                                            <thead>
                                            <tr>
                                                <th width="150">field</th>
                                                <th>type</th>
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
            <div class="col-md-6" v-if="is_contract_account">
                <div class="panel panel-default panel-code">
                    <div class="panel-heading">
                        <span class="fa fa-legal"></span>&nbsp;{{$t('account.contract.code.title')}}
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
            <div class="col-md-4">
                <div class="panel panel-default" v-if="!is_contract_account">
                    <div class="panel-heading">
                        <span class="fa fa-legal"></span>&nbsp;{{$t('account.permissions.title')}}
                    </div>
                    <div class="panel-body no-padding">
                        <div class="table-responsive">
                            <table class="table table-bordered no-margin">
                                <tbody>
                                <tr class="active">
                                    <th width="80%"><span
                                            class="fa fa-lock">&nbsp;{{$t('account.permissions.active')}}</span></th>
                                    <th>
                                        {{$t('account.permissions.threshold')}}({{account_info.active.weight_threshold}})
                                    </th>
                                </tr>
                                <tr v-for="auth in account_info.active.key_auths">
                                    <td class="overflow-wrap">{{auth[0]}}</td>
                                    <td>{{auth[1]}}</td>
                                </tr>
                                <tr class="active">
                                    <th><span class="fa fa-lock">&nbsp;{{$t('account.permissions.owner')}}</span></th>
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
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <span class="fa fa-money"></span>&nbsp;{{$t('account.balances.title')}}
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
            <div class="col-md-8">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <span class="fa fa-history"></span>&nbsp;{{$t('index.transactions.title')}}
                        <a class="pull-right more-btn" v-on:click="collapse"
                           v-if="latestTransactions.length > 9">{{$t('account.basic.more')}}</a>
                    </div>
                    <div class="panel-body no-padding">
                        <Loading v-show="history_loading"></Loading>
                        <table class="table table-striped table-bordered no-margin" v-show="!history_loading">
                            <thead>
                            <tr>
                                <th>{{$t('index.transactions.type')}}</th>
                                <th class="center">{{$t('index.transactions.content')}}</th>
                                <th class="right">{{$t('index.transactions.time')}}</th>
                            </tr>
                            </thead>
                            <History_Op :latestTransactions="latestTransactions" parent="Account"></History_Op>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="!account_info||!account_info.id" v-show="!loading">
            <h4 class="page-header">{{$t('account.title')}}</h4>
            <p class="null-tip">{{$t('account.empty')}}</p>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import { ChainStore } from 'gxbjs';
    import { calc_block_time, get_assets_by_ids } from '@/services/CommonService';
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
                account_info: null,
                latestTransactions: [],
                history_length: 100,
                ChainStore
            };
        },
        filters: filters,
        methods: {

            ...mapActions({
                setKeywords: 'setKeywords'
            }),
            collapse () {
                $('.collapse').collapse('toggle');
            },
            getWAST () {
                this.$http.post('/api/wasm2wast', {wasm: this.account_info.code}).then(resp => {
                    this.code.wast = resp.body.wast;
                }).catch(console.error);
            },
            getActionDefine (action_name) {
                let actionDef = this.account_info.abi.structs.find(s => s.name === action_name);
                return `void ${action_name}(${actionDef.fields.map(f => `${f.type} ${f.name}`).join(', ')})`;
            },
            getTableDefine (tables) {
                return this.account_info.abi.structs.filter(s => tables.find(t => t.name === s.name));
            },
            onUpdate () {
                try {
                    if (!ChainStore.fetchFullAccount(this.$route.params.id_or_name)) {
                        this.loading = false;
                        return;
                    }
                } catch (e) {
                    this.loading = false;
                }
                this.account_info = ChainStore.fetchFullAccount(this.$route.params.id_or_name).toJS();
                if (this.account_info && this.account_info.code && !this.code.wast) {
                    this.getWAST();
                }
                let ids = Object.keys(this.account_info.balances);
                get_assets_by_ids(ids).then(assets => {
                    let assetMap = {};
                    assets.forEach(asset => {
                        assetMap[asset.id] = asset;
                    });
                    for (let i = 0; i < ids.length; i++) {
                        let obj = {
                            symbol: assetMap[ids[i]].symbol,
                            amount: filters.number(((ChainStore.getObject(this.account_info.balances[ids[i]]).get('balance') || 0) / 100000).toFixed(assetMap[ids[i]].precision), assetMap[ids[i]].precision)
                        };
                        this.account_info.balances[ids[i]] = obj;
                    }
                });
                if (this.account_info.history) {
                    let length = this.account_info.history.length < this.history_length ? this.account_info.history.length : this.history_length;
                    for (let i = length - 1; i >= 0; i--) {
                        this.account_info.history[i].op.block_id = this.account_info.history[i].block_num;

                        if (ChainStore.getObject('2.0.0') && ChainStore.getObject('2.1.0')) {
                            let block_interval = ChainStore.getObject('2.0.0').get('parameters').get('block_interval');
                            let head_block_number = ChainStore.getObject('2.1.0').get('head_block_number');
                            let head_block_time = new Date(ChainStore.getObject('2.1.0').get('time') + '+00:00');
                            this.account_info.history[i].op.timestamp = calc_block_time(this.account_info.history[i].block_num, block_interval, head_block_number, head_block_time);
                        }

                        this.latestTransactions.unshift(this.account_info.history[i].op);
                        if (this.latestTransactions.length > length) {
                            this.latestTransactions.pop();
                        }
                    }
                    this.history_loading = false;
                }
                this.loading = false;
            }
        },
        watch: {
            keywords () {
                this.loading = true;
                this.account_info = null;
                this.latestTransactions = [];
                this.onUpdate();
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
                return result.join('&nbsp;');
            }
        },
        mounted () {
            if (this.$route.params.id_or_name !== this.keywords) {
                this.setKeywords({keywords: this.$route.params.id_or_name});
            }
            ChainStore.subscribe(this.onUpdate);
            this.onUpdate();
        },
        destroyed () {
            ChainStore.unsubscribe(this.onUpdate);
        },
        components: {
            History_Op: History_Op
        }
    };
</script>

<style scoped>
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
    .panel-tables{
        margin:10px;
    }
    .panel-tables .panel-heading{
        font-size:15px;
        background: #eee;
        padding:5px;
    }
</style>
