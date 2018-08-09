<template>
    <div class="container">
        <Loading v-show="loading"></Loading>

        <h4 class="page-header" v-show="!loading">{{$t('index.latest_status')}}:
            <small>{{$t('index.last_updated_at', {seconds: delta})}}</small>
        </h4>

        <div class="row" v-show="!loading">

            <!--Overview-->
            <div class="col-md-12 no-padding" v-if="block_info">
                <div class="col-md-5">
                    <div class="section-summary">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="title">总交易数</div>
                                <digital-roll :number="block_info.head_block_number"></digital-roll>
                            </div>
                        </div>
                        <hr/>
                        <div class="row">
                            <div class="col-md-6">
                                <p class="title">链上账户数</p>
                                <div class="">{{account_number|number(0)}}</div>
                            </div>
                            <div class="col-md-6">
                                <p class="title">运行时间</p>
                                <div>375D 23H 15M 23'</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-7">
                    <Chart :style="{height:'250px',width:'100%'}" :options="statistics" ref="sta" theme="light" auto-resize></Chart>
                </div>
            </div>

            <!--Blocks-->
            <div class="col-md-12">
                <div v-if="block_info&&global_params&&supply_info" class="panel panel-default">
                    <div class="panel-heading">
                        <span class="gxicon gxicon-block"></span>&nbsp;{{$t('index.summary.title')}}
                    </div>
                    <div class="panel-body no-padding table-responsive">
                        <table class="table table-striped table-bordered no-margin">
                            <tbody>
                            <tr>
                                <th>{{$t('index.summary.head_block_number')}}</th>
                                <td>
                                    <router-link :to="{path:'/block/'+block_info.head_block_number}">
                                        {{block_info.head_block_number}}
                                    </router-link>
                                </td>
                                <th>{{$t('index.summary.last_irreversible_block_num')}}</th>
                                <td>
                                    <router-link :to="{path:'/block/'+block_info.last_irreversible_block_num}">
                                        {{block_info.last_irreversible_block_num}}
                                    </router-link>
                                </td>
                            </tr>
                            <tr>
                                <th>{{$t('index.summary.block_interval')}}</th>
                                <td>{{global_params.parameters.block_interval}}</td>
                                <th>{{$t('index.summary.recently_missed_count')}}</th>
                                <td>{{block_info.recently_missed_count}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!--Witnesses-->
            <div class="col-md-4">
                <div v-if="global_params" class="panel panel-default">
                    <div class="panel-heading">
                        <span class="gxicon gxicon-witness"></span>&nbsp;{{$t('index.witness.title')}}
                    </div>
                    <div class="panel-body no-padding">
                        <div class="table-responsive">
                            <table class="table table-striped no-margin">
                                <thead>
                                <tr>
                                    <th>{{$t('index.witness.witness')}}</th>
                                    <th>{{$t('index.witness.last_confirmed_block')}}</th>
                                    <th>{{$t('index.witness.votes')}}</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="witness in global_params.active_witnesses"
                                    :class="{info:getLastConfirmedBlock(witness)==block_info.head_block_number}">
                                    <td>
                                        <account-image :size="8"
                                                       :account="getWitnessAccountName(witness)"></account-image>
                                        &nbsp;
                                        <router-link :to="{path:'/account/'+getWitnessAccountName(witness)}">
                                            {{getWitnessAccountName(witness)}}
                                        </router-link>
                                    </td>
                                    <td>
                                        <router-link :to="{path:'/block/'+getLastConfirmedBlock(witness)}">
                                            {{getLastConfirmedBlock(witness)}}
                                        </router-link>
                                    </td>
                                    <td>
                                        {{ChainStore.getObject(witness) &&
                                        ChainStore.getObject(witness).get('total_votes') / 100000 | number(2)}}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <!--理事会成员-->
                <div v-if="global_params" class="panel panel-default">
                    <div class="panel-heading">
                        <span class="gxicon gxicon-commitee"></span>&nbsp;{{$t('index.committee.title')}}
                    </div>
                    <div class="panel-body no-padding">
                        <table class="table table-striped no-margin">
                            <thead>
                            <tr>
                                <th>{{$t('index.committee.account')}}</th>
                                <th>{{$t('index.committee.votes')}}</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="member in global_params.active_committee_members">
                                <td>
                                    <account-image :size="8" :account="getCommitteeAccountName(member)"></account-image>
                                    &nbsp;
                                    <router-link :to="{path:'/account/'+getCommitteeAccountName(member)}">
                                        {{getCommitteeAccountName(member)}}
                                    </router-link>
                                </td>
                                <td>
                                    {{ChainStore.getObject(member) && ChainStore.getObject(member).get('total_votes') /
                                    100000 | number(2)}}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!--Assets-->
            <div class="col-md-8">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <span class="gxicon gxicon-asset"></span> {{$t('index.asset.title')}}
                    </div>
                    <div class="panel-body no-padding">
                        <Loading v-show="assets_loading"></Loading>
                        <table class="table table-striped no-margin" v-show="!assets_loading">
                            <thead>
                            <tr>
                                <th>{{$t('index.asset.symbol')}}</th>
                                <th>{{$t('index.asset.issuer')}}</th>
                                <th class="right">{{$t('index.asset.supply')}}</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="asset in assets" :key="asset.id">
                                <td>
                                    <account-image :size="8" :account="asset.symbol"></account-image>
                                    &nbsp
                                    <router-link :to="{path:`/asset/${asset.symbol}`}">{{asset.symbol}}</router-link>
                                </td>
                                <td>
                                    <account-image :size="8" :account="asset.issuer.name"></account-image>
                                    &nbsp
                                    <router-link :to="{path:`/account/${asset.issuer.name}`}">{{asset.issuer.name}}
                                    </router-link>
                                </td>
                                <td class="right">
                                    {{asset.detail.current_supply/Math.pow(10,asset.precision)|number(asset.precision)}}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!--Histories-->
                <div v-if="latestBlocks" class="panel panel-default">
                    <div class="panel-heading">
                        <span class="gxicon gxicon-transaction"></span>&nbsp;{{$t('index.transactions.title')}}
                    </div>
                    <div class="panel-body no-padding">
                        <Loading v-show="history_loading"></Loading>
                        <table class="table table-striped no-margin" v-show="!history_loading">
                            <thead>
                            <tr>
                                <th>{{$t('index.transactions.type')}}</th>
                                <th class="center">{{$t('index.transactions.content')}}</th>
                                <th class="right">{{$t('index.transactions.time')}}</th>
                            </tr>
                            </thead>
                            <History_Op :latestTransactions="latestTransactions"></History_Op>
                        </table>
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
    import { ChainStore } from 'gxbjs';
    import { Apis } from 'gxbjs-ws';
    import filters from '../filters';
    import History_Op from './partial/History_Op.vue';
    import { calc_block_time } from '@/services/CommonService';
    import { mapActions } from 'vuex';
    import DigitalRoll from './partial/DigitalRoll';
    import AccountImage from './partial/AccountImage';
    import echarts from 'echarts/lib/echarts';

    export default {
        data () {
            return {
                loading: true,
                account_number: 0,
                history_loading: true,
                assets_loading: true,
                assets: [],
                timer: 0,
                last_updated_at: 0,
                block_info: null,
                global_params: null,
                supply_info: null,
                latestBlocks: [],
                latestTransactions: [],
                history_length: 35,
                statistics: {
                    title: {
                        text: '近15日交易数'
                    },
                    grid: {
                        left: '1%',
                        right: '2%',
                        bottom: '5%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        type: 'line',
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#6699ff'
                                }, {
                                    offset: 1,
                                    color: '#e5eaff'
                                }])
                            }
                        }
                    }]
                },
                ChainStore
            };
        },
        filters,
        computed: {
            delta () {
                return parseInt((this.timer - this.last_updated_at) / 1000);
            }
        },

        mounted () {
            this.setKeywords({keywords: ''});
            ChainStore.subscribe(this.onUpdate);
            Apis.instance().db_api().exec('get_objects', [['2.0.0', '2.1.0', '2.3.1']]).then(() => {
                this.onUpdate();
                this.getInitialBlocks(ChainStore.getObject('2.1.0').toJS().head_block_number);
            });
            this.loadAssets();
            this.loadAccountNumber();
            setInterval(() => {
                this.loadAccountNumber();
            }, 30000);
        },

        destroyed () {
            clearInterval(this.intervalHandler);
            ChainStore.unsubscribe(this.onUpdate);
        },

        methods: {
            ...mapActions({
                setKeywords: 'setKeywords'
            }),
            loadAccountNumber () {
                this.$http.get('/api/account/number').then(resp => {
                    this.account_number = resp.body.number;
                });
            },
            loadAssets () {
                this.$http.get('/api/assets').then(resp => {
                    this.assets = resp.body;
                    this.assets_loading = false;
                });
            },
            getCommitteeAccountName (member) {
                if (ChainStore.getObject(member) && ChainStore.getObject(ChainStore.getObject(member).get('committee_member_account'))) {
                    return ChainStore.getObject(ChainStore.getObject(member).get('committee_member_account')).get('name');
                }
                return null;
            },

            getWitnessAccountName (witness) {
                if (ChainStore.getObject(witness) && ChainStore.getObject(ChainStore.getObject(witness).get('witness_account'))) {
                    return ChainStore.getObject(ChainStore.getObject(witness).get('witness_account')).get('name');
                }
                return null;
            },

            getLastConfirmedBlock (witness) {
                return ChainStore.getObject(witness) && ChainStore.getObject(witness).get('last_confirmed_block_num');
            },

            getInitialBlocks (maxBlock) {
                if (maxBlock) {
                    this.getBlocks(maxBlock, 5);
                }
            },

            getBlocks (maxBlock, length) {
                for (let i = length - 1; i >= 0; i--) {
                    let height = maxBlock - i;
                    Apis.instance().db_api().exec('get_block', [
                        height
                    ])
                    .then((result) => {
                        if (!result) {
                            return false;
                        }

                        result.id = height; // The returned object for some reason does not include the block height..
                        this.latestBlocks.unshift(result);
                        if (this.latestBlocks.length > 20) {
                            this.latestBlocks.pop();
                        }
                        if (result.transactions.length > 0) {
                            result.transactions.forEach(trx => {
                                trx.operations.forEach(op => {
                                    op.block_id = result.id;
                                    if (ChainStore.getObject('2.0.0') && ChainStore.getObject('2.1.0')) {
                                        let block_interval = ChainStore.getObject('2.0.0').get('parameters').get('block_interval');
                                        let head_block_number = ChainStore.getObject('2.1.0').get('head_block_number');
                                        let head_block_time = new Date(ChainStore.getObject('2.1.0').get('time') + '+00:00');
                                        op.timestamp = calc_block_time(result.id, block_interval, head_block_number, head_block_time);
                                    }
                                    this.latestTransactions.unshift(op);
                                    this.history_loading = false;
                                    if (this.latestTransactions.length > this.history_length) {
                                        this.latestTransactions.pop();
                                    }
                                });
                            });
                        }

                        if (i === 0) {
                            this.loading = false;
                            this.history_loading = false;
                        }
                    }).catch((error) => {
                        console.log('Error in Index.getBlocks: ', error);
                        this.loading = false;
                        this.history_loading = false;
                    });
                }
            },

            runTimer: function () {
                let self = this;
                this.intervalHandler = setInterval(function () {
                    self.timer = new Date();
                }, 300);
            },

            onUpdate () {
                if (this.timer === 0) {
                    this.runTimer();
                }
                this.last_updated_at = new Date();
                if (!ChainStore.getObject('2.0.0') || !ChainStore.getObject('2.1.0') || !ChainStore.getObject('2.3.1')) {
                    return;
                }

                this.global_params = ChainStore.getObject('2.0.0').toJS();
                this.block_info = ChainStore.getObject('2.1.0').toJS();
                this.supply_info = ChainStore.getObject('2.3.1').toJS();

                if (this.latestBlocks[0]) {
                    if (this.block_info.head_block_number > this.latestBlocks[0].id) {
                        let length = this.block_info.head_block_number - this.latestBlocks[0].id;
                        this.getBlocks(this.block_info.head_block_number, length);
                    }
                }
            }
        },
        components: {
            History_Op: History_Op,
            DigitalRoll: DigitalRoll,
            AccountImage
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

    #search-result .btn-group {
        margin: 20px;
    }

    #search-result .btn-group .btn.active {
        background-color: #3c4463;
        border-color: #3c4463;
        color: #fff;
    }

    #search-result .null-tip {
        color: #999;
    }

    .section-summary {
        background: #f2f2f2;
        padding: 20px;
        margin-bottom: 20px;
        border-radius: 10px;
        transition-duration: .3s;
    }

    .section-summary:hover {
        box-shadow: 0 0 15px #ccc;
    }

    .section-summary .top, .section-summary .bottom {
        padding: 20px;
    }

    .section-summary .title {
        color: #9d9faf;
        font-size: 15px;
        margin-bottom: 15px;
    }

    .section-summary hr {
        border-color: #e0e0e0;
        margin: 20px -20px;
    }
</style>
