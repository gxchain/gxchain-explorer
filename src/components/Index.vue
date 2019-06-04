<template>
    <div class="container">
        <Loading v-show="loading"></Loading>

        <!--<div class="row">-->
            <!--&lt;!&ndash;TrustNodes Voting Progress&ndash;&gt;-->
            <!--<div class="col-md-12">-->
                <!--<div class="panel panel-default panel-progress">-->
                    <!--<div class="panel-heading">-->
                        <!--<span class="fa fa-fw fa-tasks"></span> {{$t('index.voting.title')}}-->
                    <!--</div>-->
                    <!--<div class="panel-body">-->
                        <!--<p class="text-right">{{vote.num|number(2)}} / 16,000,000.00</p>-->
                        <!--<div class="progress">-->
                            <!--<div class="progress-bar progress-bar-info progress-bar-striped active"-->
                                 <!--role="progressbar"-->
                                 <!--:aria-valuenow="voting_progress"-->
                                 <!--aria-valuemin="0"-->
                                 <!--aria-valuemax="100"-->
                                 <!--style="min-width: 2em;"-->
                                 <!--:style="{width:voting_progress.toFixed(2)+'%'}">-->
                                <!--{{voting_progress.toFixed(0)}}%-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->

        <h4 class="page-header" v-show="!loading">{{$t('index.latest_status')}}:
            <small>{{$t('index.last_updated_at', {seconds: delta})}}</small>
        </h4>

        <div class="row">

            <!--Overview-->
            <div class="col-md-12 no-padding">
                <div class="col-md-5">
                    <div class="section-summary">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="title">{{$t('index.overview.transactions')}}</div>
                                <digital-roll :number="transaction_num"
                                              :font-size="digital_roll_font_size"></digital-roll>
                            </div>
                        </div>
                        <hr/>
                        <div class="row">
                            <div class="col-sm-6">
                                <p class="title">{{$t('index.overview.accounts')}}</p>
                                <div class="font-bebas">{{account_number|number(0)}}</div>
                            </div>
                            <div class="col-sm-6">
                                <p class="title">{{$t('index.overview.duration')}}</p>
                                <div class="font-bebas">{{blockchain_run_duration}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-7">
                    <Chart ref="sta"
                           style="width:100%;height:250px;"
                           :options="statistics"
                           theme="light"
                           auto-resize>
                    </Chart>
                </div>
            </div>

            <!--Blocks-->
            <div class="col-md-12">
                <div v-if="block_info&&global_params&&supply_info" class="panel panel-default">
                    <div class="panel-heading">
                        <span class="fa fa-fw gxicon gxicon-block"></span>&nbsp;{{$t('index.summary.title')}}
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

            <!--Histories-->
            <div class="col-md-12">
                <div v-if="latestBlocks" class="panel panel-default panel-histories">
                    <div class="panel-heading">
                        <span class="fa fa-fw gxicon gxicon-transaction"></span>&nbsp;{{$t('index.transactions.title')}}
                    </div>
                    <div class="panel-body no-padding">
                        <Loading v-show="history_loading"></Loading>
                        <table class="table table-striped no-margin" v-show="!history_loading">
                            <thead>
                            <tr>
                                <th>{{$t('index.transactions.type')}}</th>
                                <th>{{$t('index.transactions.content')}}</th>
                                <th class="right" width="80">{{$t('index.transactions.time')}}</th>
                            </tr>
                            </thead>
                            <History_Op :latestTransactions="latestTransactions"></History_Op>
                        </table>
                    </div>
                </div>
            </div>

            <!--Asset Ranking-->
            <div class="col-md-12">
                <div class="panel panel-default panel-ranking">
                    <div class="panel-heading">
                        <span class="fa fa-fw gxicon gxicon-rank"></span>&nbsp;{{$t('index.ranking.title')}}
                        <span>
                            <button class="btn btn-xs btn-ranking" v-for="asset in supportedAssets"
                                    :class="{active:currentAsset===asset}"
                                    @click="currentAsset=asset">{{asset}}
                            </button>
                        </span>
                    </div>
                    <div class="panel-body no-padding table-responsive">
                        <table class="table table-striped">
                            <thead>
                            <tr>
                                <th width="100">{{$t('index.ranking.number')}}</th>
                                <th>{{$t('index.ranking.account')}}</th>
                                <th class="text-right">{{$t('index.ranking.locked_balance')}}</th>
                                <th class="text-right">{{$t('index.ranking.balance')}}</th>
                                <th class="text-right">{{$t('index.ranking.total_balance')}}</th>
                                <th class="text-right">{{$t('index.ranking.percent')}}</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(item,i) in rankings">
                                <td>{{i+1}}</td>
                                <td>
                                    <account-image :size="8"
                                                   :account="item.accountName"></account-image>
                                    &nbsp;
                                    <router-link :to="{path:'/account/'+item.accountName}">
                                        {{item.accountName}}
                                    </router-link>
                                </td>
                                <td align="right">
                                    {{item.freezeAmount}}
                                </td>
                                <td align="right">
                                    {{item.amount}}
                                </td>
                                <td align="right">
                                    {{item.totalAmount}}
                                </td>
                                <td align="right">{{(item.percent*100).toFixed(2)}}%</td>
                            </tr>
                            </tbody>
                        </table>
                        <div class="footer">
                            <router-link :to="{path:`/asset/${currentAsset}`}">
                                <i class="fa fa-angle-double-down"></i>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>

            <!--Assets-->
            <div class="col-md-12">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <span class="fa fa-fw gxicon gxicon-asset"></span> {{$t('index.asset.title')}}
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
                                    &nbsp;
                                    <router-link :to="{path:`/asset/${asset.symbol}`}">{{asset.symbol}}</router-link>
                                </td>
                                <td>
                                    <account-image :size="8" :account="asset.issuer.name"></account-image>
                                    &nbsp;
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
    import 'echarts/lib/component/title';
    import 'echarts/lib/component/axis';

    export default {
        data () {
            return {
                loading: true,
                vote: {
                    num: 0,
                    accounts: 0
                },
                account_number: 0,
                history_loading: true,
                assets_loading: true,
                supportedAssets: ['GXC', 'PPS', 'LVCOIN', 'BLOCK'],
                currentAsset: 'GXC',
                rankings: [],
                assets: [],
                timer: 0,
                last_updated_at: 0,
                block_info: null,
                global_params: null,
                supply_info: null,
                latestBlocks: [],
                latestTransactions: [],
                history_length: 35,
                blockchain_run_duration: '',
                transaction_num: 0,
                statistics: {
                    title: {
                        text: this.$t('index.statistics.title'),
                        left: 'left',
                        textStyle: {
                            color: '#9d9faf'
                        }
                    },
                    grid: {
                        bottom: 20,
                        left: 10,
                        right: 20,
                        containLabel: true
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: [],
                        axisLine: {
                            lineStyle: {
                                color: '#919191'
                            }
                        }
                    },
                    yAxis: {
                        type: 'value',
                        axisLine: {
                            lineStyle: {
                                color: '#b9bac5'
                            }
                        }
                    },
                    series: [
                        {
                            data: [],
                            type: 'line',
                            smooth: true,
                            areaStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        {
                                            offset: 0,
                                            color: '#6699ff'
                                        },
                                        {
                                            offset: 1,
                                            color: '#e5eaff'
                                        }
                                    ])
                                }
                            }
                        }
                    ]
                },
                ChainStore
            };
        },
        filters,
        computed: {
            delta () {
                return parseInt((this.timer - this.last_updated_at) / 1000);
            },
            assets_info () {
                let result = {};
                this.assets.forEach(asset => {
                    result[asset.symbol] = asset;
                });
                return result;
            },
            digital_roll_font_size () {
                return window.screen.width > 1000 ? 40 : 20;
            },
            voting_progress () {
                return Math.min(this.vote.num / 16000000, 1) * 100;
            }
        },

        mounted () {
            this.setKeywords({keywords: ''});
            ChainStore.subscribe(this.onUpdate);
            Apis.instance()
            .db_api()
            .exec('get_objects', [['2.0.0', '2.1.0', '2.3.1']])
            .then(() => {
                this.onUpdate();
                this.getInitialBlocks(
                    ChainStore.getObject('2.1.0').toJS().head_block_number
                );
            });
            this.loadVoteNumbers();
            this.loadAssets();
            this.loadAccountNumber();
            this.accountNumberInterval = setInterval(() => {
                this.loadAccountNumber();
            }, 10000);
            this.runDurationInterval = setInterval(() => {
                let duration = new Date() - new Date('2017-06-10T13:52:26Z');
                const MS_PER_DAY = 24 * 60 * 60 * 1000;
                const MS_PER_HOUR = 60 * 60 * 1000;
                const MS_PER_MINUTES = 60 * 1000;

                let days = parseInt(duration / MS_PER_DAY);
                let hours = parseInt((duration - days * MS_PER_DAY) / MS_PER_HOUR);
                let minutes = parseInt(
                    (duration - days * MS_PER_DAY - hours * MS_PER_HOUR) / MS_PER_MINUTES
                );
                let seconds = parseInt(
                    (duration -
                        days * MS_PER_DAY -
                        hours * MS_PER_HOUR -
                        minutes * MS_PER_MINUTES) /
                    1000
                );
                seconds = seconds < 9 ? '0' + seconds : seconds;
                this.blockchain_run_duration = this.$t('index.statistics.blockchain_run_duration', {
                    days,
                    hours,
                    minutes,
                    seconds
                });
            }, 500);
            this.loadTotalTransactionNum();
            this.transactionNumInterval = setInterval(() => {
                this.loadTotalTransactionNum();
            }, 3000);
            this.loadStatistics();
        },

        destroyed () {
            clearInterval(this.intervalHandler);
            clearInterval(this.accountNumberInterval);
            clearInterval(this.runDurationInterval);
            clearInterval(this.transactionNumInterval);
            ChainStore.unsubscribe(this.onUpdate);
        },

        watch: {
            currentAsset () {
                this.loadRankings();
            }
        },

        methods: {
            ...mapActions({
                setKeywords: 'setKeywords'
            }),
            loadVoteNumbers () {
                this.$http
                .get(`${process.env.STA_SERVICE}/vote/statistics`)
                .then(resp => {
                    this.vote.num = Math.max(resp.body.voteSum, 0);
                    this.vote.accounts = resp.body.accountSum || 0;
                }).catch(console.error);
            },
            loadRankings () {
                let asset = this.currentAsset;
                this.$http
                .get(`${process.env.STA_SERVICE}/account/assetRankList`, {
                    params: {
                        symbol: asset,
                        pageNo: 1,
                        pageSize: 20
                    }
                })
                .then(resp => {
                    let assetInfo = this.assets_info[asset];
                    let currentSupply = assetInfo.detail.current_supply / Math.pow(10, assetInfo.precision);
                    this.rankings = resp.body.map(item => {
                        return {
                            accountName: item.accountName,
                            amount: filters.number(item.amount, assetInfo.precision),
                            freezeAmount: filters.number(item.freezeAmount, assetInfo.precision),
                            totalAmount: filters.number(item.totalAmount, assetInfo.precision),
                            percent: filters.number((item.amount + item.freezeAmount) / currentSupply, assetInfo.precision)
                        };
                    });
                });
            },
            loadTotalTransactionNum () {
                this.$http
                .get(`${process.env.STA_SERVICE}/transaction/num`)
                .then(resp => {
                    this.transaction_num = resp.body.num;
                });
            },
            loadStatistics () {
                // debugger; // eslint-disable-line
                this.$http
                .get(`${process.env.STA_SERVICE}/transactionNum`, {
                    params: {
                        timestamp: new Date().getTime(),
                        days: 10
                    }
                })
                .then(resp => {
                    let xAxisData = resp.body.map(item => {
                        return item.date
                        .split('-')
                        .slice(1)
                        .join('/');
                    });
                    let min = Number.MAX_VALUE;
                    let data = resp.body.map(item => {
                        min = Math.min(item.num, min);
                        return item.num;
                    });
                    this.$refs.sta.mergeOptions({
                        xAxis: {
                            data: xAxisData
                        },
                        yAxis: {
                            min: Math.max(0, min - 100)
                        },
                        series: {
                            data: data
                        }
                    });
                    this.$refs.sta.hideLoading();
                });
            },
            loadAccountNumber () {
                Apis.instance()
                .db_api()
                .exec('get_account_count', [])
                .then(resp => {
                    this.account_number = resp;
                });
            },
            loadAssets () {
                this.$http.get('/api/assets').then(resp => {
                    this.assets = resp.body;
                    this.assets_loading = false;
                    this.loadRankings();
                });
            },
            getInitialBlocks (maxBlock) {
                if (maxBlock) {
                    this.getBlocks(maxBlock, 5);
                }
            },

            getBlocks (maxBlock, length) {
                for (let i = length - 1; i >= 0; i--) {
                    let height = maxBlock - i;
                    Apis.instance()
                    .db_api()
                    .exec('get_block', [height])
                    .then(result => {
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
                                    if (
                                        ChainStore.getObject('2.0.0') &&
                                        ChainStore.getObject('2.1.0')
                                    ) {
                                        let block_interval = ChainStore.getObject('2.0.0')
                                        .get('parameters')
                                        .get('block_interval');
                                        let head_block_number = ChainStore.getObject('2.1.0').get(
                                            'head_block_number'
                                        );
                                        let head_block_time = new Date(
                                            ChainStore.getObject('2.1.0').get('time') + '+00:00'
                                        );
                                        op.timestamp = calc_block_time(
                                            result.id,
                                            block_interval,
                                            head_block_number,
                                            head_block_time
                                        );
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
                    })
                    .catch(error => {
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
                if (
                    !ChainStore.getObject('2.0.0') ||
                    !ChainStore.getObject('2.1.0') ||
                    !ChainStore.getObject('2.3.1')
                ) {
                    return;
                }

                this.global_params = ChainStore.getObject('2.0.0').toJS();
                this.block_info = ChainStore.getObject('2.1.0').toJS();
                this.supply_info = ChainStore.getObject('2.3.1').toJS();

                if (this.latestBlocks[0]) {
                    if (this.block_info.head_block_number > this.latestBlocks[0].id) {
                        let length =
                            this.block_info.head_block_number - this.latestBlocks[0].id;
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
    a {
        vertical-align: middle;
    }
    
    .page-header {
        margin: 0 0 20px;
    }

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
        transition-duration: 0.3s;
    }

    .section-summary:hover {
        box-shadow: 0 0 15px #ccc;
    }

    .section-summary .top,
    .section-summary .bottom {
        padding: 20px;
    }

    .section-summary .title {
        color: #9d9faf;
        font-size: 15px;
        margin-bottom: 15px;
    }

    .font-bebas {
        font-family: bebas;
        font-size: 20px;
        color: #3c4463;
    }

    .section-summary hr {
        border-color: #e0e0e0;
        margin: 20px -20px;
    }

    .btn-ranking {
        border: transparent;
    }

    .btn-ranking.active, .btn-ranking:active {
        background: #eaf2ff;
        color: #7095e1;
        border: transparent;
        border-radius: 10px;
        box-shadow: none;
    }

    .btn-ranking:focus {
        outline: none;
    }

    .panel-ranking .footer {
        text-align: center;
        padding: 10px 0;
        border-top: 1px solid #eee;
        font-size: 20px;
    }

    .panel-ranking .footer a {
        color: #999;
    }

    .panel-progress .panel-body {
        border-top: 1px solid #eee;
    }

    .progress-bar-info {
        background-color: #3d4463;
    }
    
    .panel-histories table {
        word-break: break-all;
    }

    .panel-histories table tr th:last-child {
        min-width: 70px;
    }
</style>
