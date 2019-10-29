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
                        <div class="panel-body no-padding  panel-contract-info">
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
                <div class="col-md-12" v-if="is_contract_account">
                    <div class="panel panel-default panel-contract">
                        <div class="contract-info-wrap">
                            <div class="pull-right tool-tip">
                                <span class="fa fa-fg fa-lightbulb" data-toggle="tooltip" data-placement="top"
                                      :title="'备注信息来源：github.com/gxchain/contractInfo'"></span>
                            </div>
                            <div class="contract-info">
                                <img v-if="contractInfo&&contractInfo.logo" class="portrait" :src="contractInfo.logo" alt="">
                                <svg v-if="!(contractInfo&&contractInfo.logo)" class="portrait" id="icon-contract"
                                     viewBox="0 0 1024 1024" width="100%" height="100%">
                                    <path d="M512 0a512 512 0 1 1 0 1024A512 512 0 0 1 512 0z m38.115556 284.444444l-169.528889 455.111112h93.297777l169.528889-455.111112H550.115556z m108.771555 134.257778L796.444444 512l-163.271111 110.762667 50.176 34.019555L853.333333 541.809778V482.986667l-176.184889-115.825778-18.261333 51.484444zM170.666667 482.190222v58.766222l176.184889 115.825778 18.261333-51.484444L227.555556 512l163.271111-110.762667-50.232889-34.019555L170.666667 482.190222z"
                                          fill="#34CB49"></path>
                                </svg>
                                <div>
                                    <div class="account-wrap">
                                        <span class="account">{{account_info.name}}</span>
                                        <a v-if="contractInfo.links && contractInfo.links.home"
                                           :href="contractInfo.links.home" target="_blank">
                                            <span class="fa fa-fw fa-home"></span>
                                        </a>
                                        <a v-if="contractInfo.links && contractInfo.links.github"
                                           :href="contractInfo.links.github" target="_blank">
                                            <span class="fab fa-fw fa-github"></span>
                                        </a>
                                    </div>
                                    <div class="title" v-if="contractInfo.title">
                                        {{contractInfo.title[_i18n.locale]}}
                                    </div>
                                    <div v-else>
                                        <a class="incomplete-tip" href="https://github.com/gxchain/contractInfo"
                                           target="_blank">{{$t('account.basic.pending_claim')}}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="panel-heading">
                            <span class="tab" :class="{'active':contractTab ==item.key}"
                                  v-for="(item,index) in contractTabs" :key="item.key"
                                  @click="selectSontractTab(item.key)">
                                <span class="fas" :class="[item.icon]"></span>&nbsp;{{item.name}}
                            </span>
                        </div>
                        <!--ABI-->
                        <div class="panel-body no-padding" v-show="contractTab=='ABI'">
                            <ul class="nav nav-tabs" role="tablist">
                                <li :class="{active:abi.type=='action'}" @click="abi.type='action'">
                                    <a role="tab" href="javascriprt:;">Actions</a>
                                </li>
                                <li :class="{active:abi.type=='raw'}" @click="abi.type='raw'">
                                    <a role="tab" href="javascriprt:;">ABI Raw</a>
                                </li>
                                <li :class="{active:abi.type=='table'}" @click="abi.type='table'">
                                    <a role="tab" href="javascriprt:;">Tables</a>
                                </li>
                            </ul>
                            <div class="tab-content">
                                <div role="tabpanel" class="tab-pane" :class="{active:abi.type=='action'}">
                                    <div class="table-responsive no-padding no-margin" style="border:none">
                                        <table class="table table-striped">
                                            <thead>
                                            <tr>
                                                <th>Payable</th>
                                                <th>Define</th>
                                                <th class="text-right" v-if="gxc">Operation</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr v-for="action in account_info.abi.actions" :key="action.name">
                                                <td>{{action.payable}}</td>
                                                <td>{{getActionDefine(action.name)}}</td>
                                                <td align="right" v-if="gxc">
                                                    <a class="btb btn-xs btn-success" href="javascript:;"
                                                       @click="setContractParams(action)">call</a>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div role="tabpanel" class="tab-pane" :class="{active:abi.type=='raw'}">
                                    <pre>{{JSON.stringify(account_info.abi,null,'  ')}}</pre>
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
                        <!--Code-->
                        <div class="panel-body no-padding" v-show="contractTab=='CODE'">
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
                                    <pre>
                                        <code>{{account_info.code}}</code>
                                    </pre>
                                </div>
                            </div>
                        </div>
                        <!--Database-->
                        <div class="panel-body no-padding" v-show="contractTab=='DATABASE'">
                            <div class="panel-heading panel-heading-database">
                                <span class="fas fa-database"></span>&nbsp;{{$t('account.contract.database.title')}}
                                <select v-model="current_table.name">
                                    <option v-for="table in account_info.abi.tables" :value="table.name"
                                            :key="table.name">
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
                            <a class="pull-right" href="#modal-history"
                               data-toggle="modal">{{$t('account.basic.more')}}</a>
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
                                    <history-op :latestTransactions="latestTransactions" parent="Account"></history-op>
                                </table>
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
        <modal-history :account="$route.params.id_or_name"></modal-history>
        <modal-call-contract ref="modalCall"
                             :contract="contract.name"
                             :method="contract.method"
                             :payable="contract.payable"
                             :fields="contract.params">
        </modal-call-contract>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { ChainStore } from 'gxbjs';
import { Apis } from 'gxbjs-ws';
import filters from '@/filters';
import { calc_block_time } from '@/services/CommonService';
import HistoryOp from './partial/HistoryOp.vue';
import modalHistory from '@/components/modals/modal-history.vue';
import modalCallContract from '@/components/modals/modal-call-contract.vue';

export default {
    data () {
        return {
            loading: true,
            history_loading: true,
            history_length: 10,
            contract: {
                params: [],
                name: '',
                method: '',
                payable: false
            },
            abi: {
                type: 'action'
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
            totalPage: 0,
            contractInfo: {},
            contractTab: 'ABI',
            contractTabs: [
                {
                    key: 'ABI',
                    icon: 'fa-angle-right',
                    name: this.$t('account.contract.abi.title')
                },
                {
                    key: 'CODE',
                    icon: 'fa-code',
                    name: this.$t('account.contract.code.title')
                },
                {
                    key: 'DATABASE',
                    icon: 'fa-database',
                    name: this.$t('account.contract.database.title')
                }
            ]
        };
    },
    filters: filters,
    methods: {

        ...mapActions({
            setKeywords: 'setKeywords',
            setContractInfoMap: 'setContractInfoMap'
        }),
        getWAST () {
            this.$http.post('/api/wasm2wast', { wasm: this.account_info.code }).then(resp => {
                this.code.wast = resp.body.wast;
            }).catch(console.error);
        },
        setContractParams (action) {
            let actionDef = this.account_info.abi.structs.find(s => s.name === action.name);
            this.$refs.modalCall.result = '';
            this.contract.name = this.account_info.name;
            this.contract.method = action.name;
            this.contract.payable = action.payable;
            this.contract.params = actionDef.fields.map(f => {
                let field = { name: f.name, type: f.type, value: '' };
                if (f.type === 'contract_asset') {
                    field.value = {
                        amount: 0,
                        asset_id: 1
                    };
                }
                return field;
            });
            $('#modal-call').modal();
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
        onUpdate () {
            try {
                if (!ChainStore.fetchFullAccount(this.$route.params.id_or_name)) {
                    this.loading = false;
                    return;
                }
            } catch (e) {
                this.loading = false;
            }
            try {
                this.account_info = ChainStore.fetchFullAccount(this.$route.params.id_or_name).toJS();
            } catch (error) {
            }
            if (this.account_info && this.account_info.code && !this.code.wast) {
                if (this.account_info.abi.tables.length > 0) {
                    this.current_table.name = this.account_info.abi.tables[0].name;
                }
                this.getWAST();
            }
            if (this.account_info && this.account_info.id && this.isTrustNode === -1) {
                this.loadTrustNodeInfo(this.account_info.id);
            }
            if (this.account_info && this.account_info.balances) {
                let ids = Object.keys(this.account_info.balances);
                for (let i = 0; i < ids.length; i++) {
                    let obj = {
                        symbol: this.assetList[ids[i]].symbol,
                        amount: filters.number(((ChainStore.getObject(this.account_info.balances[ids[i]]).get('balance') || 0) / 100000).toFixed(this.assetList[ids[i]].precision), this.assetList[ids[i]].precision)
                    };
                    this.account_info.balances[ids[i]] = obj;
                }
            }
            if (this.account_info && this.account_info.history) {
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
        },
        getContractInfo (contract_name) {
            let url = `https://raw.githubusercontent.com/gxchain/contractInfo/master/contracts/${contract_name}.json?v=${new Date().getTime()}`;
            this.$http.get(url).then(resp => {
                if (resp.status === 200) {
                    this.contractInfo = resp.body;
                    this.setContractInfoMap({ key: contract_name, content: resp.body });
                }
            }).catch(ex => {
                this.setContractInfoMap({ key: contract_name, content: {} });
            });
        },
        initContractInfo () {
            this.contractInfo = this.contractInfoMap[this.$route.params.id_or_name];
            if (!this.contractInfo) {
                this.getContractInfo(this.$route.params.id_or_name);
            }
        },
        selectSontractTab (key) {
            this.contractTab = key;
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
            $('#modal-history').modal('hide');
            this.onUpdate();
            this.initContractInfo();
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
                this.setKeywords({ keywords: this.$route.params.id_or_name });
            }
        }
    },
    computed: {

        ...mapGetters({
            keywords: 'keywords',
            assetList: 'assetList',
            gxc: 'gxc',
            contractInfoMap: 'contractInfoMap'
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
            this.setKeywords({ keywords: this.$route.params.id_or_name });
        }
        ChainStore.subscribe(this.onUpdate);
        this.onUpdate();
        this.initContractInfo();
    },
    destroyed () {
        ChainStore.unsubscribe(this.onUpdate);
    },
    components: {
        HistoryOp,
        modalHistory,
        modalCallContract
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

.panel-contract pre {
  border: none;
  border-top: 1px solid #eee;
  border-radius: 0;
  margin: 0;
  max-height: 500px;
}

.panel-code .wasm pre {
  white-space: normal;
}

.panel-contract .panel-heading {
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding: 0;
}

.panel-contract .tab {
  padding: 0 12px;
  display: inline-block;
  height: 55px;
  line-height: 55px;
  cursor: pointer;
}

.panel-contract .tab.active {
  color: #6699ff;
}

.contract-info-wrap {
  padding: 15px;
}

.contract-info-wrap .portrait {
  width: 55px;
  height: 55px;
  border-radius: 50%;
  margin-right: 20px;
}

.contract-info {
  display: flex;
  align-items: center;
}

.contract-info .panel-contract .panel-body {
  padding-top: 10px !important;
}

.contract-info .account-wrap {
  font-size: 18px;
  font-weight: 500;
  color: #333;
}

.contract-info-wrap .tool-tip {
  font-size: 18px;
  position: relative;
  top: 2px;
}

.contract-info .account {
  margin-right: 15px;
}

.contract-info .title {
  margin-top: 10px;
}

.panel-tables {
  margin: 10px;
}

.panel-tables .panel-heading {
  font-size: 15px;
  background: #eee;
  padding: 5px;
}

.panel-contract-info pre {
  border: none;
  border-radius: 0;
  margin: 0;
  padding: 10px;
  font-size: 8px;
  line-height: 8px;
  color: #666;
}

.panel-contract .panel-heading-database {
  padding: 10px;
}

.incomplete-tip {
  background: #f0ad4e;
  border-radius: 3px;
  color: #fff;
  padding: 0.2em 0.6em 0.3em;
  font-size: 75%;
}
</style>
