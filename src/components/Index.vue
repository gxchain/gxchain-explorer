<template>
    <div class="container">
        <Loading v-show="loading"></Loading>

        <h4 class="page-header" v-show="!loading">{{$t('index.latest_status')}}:
            <small>{{$t('index.last_updated_at', {seconds: delta})}}</small>
        </h4>

        <div class="row" v-show="!loading">
            <!--区块信息-->
            <div class="col-md-12">
                <div v-if="block_info&&global_params&&supply_info" class="panel panel-default">
                    <div class="panel-heading">
                        <span class="fa fa-chain"></span>&nbsp;{{$t('index.summary.title')}}
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
                            <tr>
                                <th>{{$t('index.summary.total_supply')}}</th>
                                <td>{{supply_info.current_supply / 100000 | number(2)}}&nbsp;GXS</td>
                                <th>{{$t('index.summary.circulating_supply')}}</th>
                                <td>{{60000000 | number(2)}}&nbsp;GXS</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!--见证人-->
            <div class="col-md-4">
                <div v-if="global_params" class="panel panel-default">
                    <div class="panel-heading">
                        <span class="fa fa-eye"></span>&nbsp;{{$t('index.witness.title')}}
                    </div>
                    <div class="panel-body no-padding">
                        <div class="table-responsive">
                            <table class="table table-striped table-bordered no-margin">
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
                                        {{ChainStore.getObject(witness) && ChainStore.getObject(witness).get('total_votes') / 100000 | number(2)}}
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
                        <span class="fa fa-users"></span>&nbsp;{{$t('index.committee.title')}}
                    </div>
                    <div class="panel-body no-padding">
                        <table class="table table-striped table-bordered no-margin">
                            <thead>
                            <tr>
                                <th>{{$t('index.committee.account')}}</th>
                                <th>{{$t('index.committee.votes')}}</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="member in global_params.active_committee_members">
                                <td>
                                    <router-link :to="{path:'/account/'+getCommitteeAccountName(member)}">
                                        {{getCommitteeAccountName(member)}}
                                    </router-link>
                                </td>
                                <td>
                                    {{ChainStore.getObject(member) && ChainStore.getObject(member).get('total_votes') / 100000 | number(2)}}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!--历史交易记录-->
            <div class="col-md-8">
                <div v-if="latestBlocks" class="panel panel-default">
                    <div class="panel-heading">
                        <span class="fa fa-history"></span>&nbsp;{{$t('index.transactions.title')}}
                    </div>
                    <div class="panel-body no-padding">
                        <table class="table table-striped table-bordered no-margin">
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

    export default {
        data () {
            return {
                loading: true,
                timer: 0,
                last_updated_at: 0,
                block_info: null,
                global_params: null,
                supply_info: null,
                latestBlocks: [],
                latestTransactions: [],
                history_length: 35,
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
            ChainStore.subscribe(this.onUpdate);
            Apis.instance().db_api().exec('get_objects', [['2.0.0', '2.1.0', '2.3.1']]).then(() => {
                this.onUpdate();
                this.getInitialBlocks(ChainStore.getObject('2.1.0').toJS().head_block_number);
            });
        },

        destroyed () {
            clearInterval(this.intervalHandler);
            ChainStore.unsubscribe(this.onUpdate);
        },

        methods: {

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
                                        if (this.latestTransactions.length > this.history_length) {
                                            this.latestTransactions.pop();
                                        }
                                    });
                                });
                            }

                            if (i === 0) {
                                this.loading = false;
                            }
                        }).catch((error) => {
                            console.log('Error in Index.getBlocks: ', error);
                            this.loading = false;
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

    #search-result .btn-group {
        margin: 20px;
    }

    #search-result .btn-group .btn.active {
        background-color: #1d8eca;
        border-color: #1d8eca;
        color: #fff;
    }

    #search-result .null-tip {
        color: #999;
    }
</style>
