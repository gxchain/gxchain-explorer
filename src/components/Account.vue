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
            <div class="col-md-4">
                <div class="panel panel-default">
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
                                    <th>{{$t('account.permissions.threshold')}}({{account_info.active.weight_threshold}})</th>
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
                            <tr>
                                <th>GXC</th>
                                <td align="right">{{account_info.balances['1.3.0']}}</td>
                            </tr>
                            <tr>
                                <th>GXS</th>
                                <td align="right">{{account_info.balances['1.3.1']}}</td>
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
                        <table class="table table-striped table-bordered no-margin">
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
    import { mapGetters, mapActions } from 'vuex';
    import { ChainStore } from 'gxbjs';
    import { formatted_asset, calc_block_time } from '@/services/CommonService';
    import filters from '@/filters';
    import History_Op from './partial/History_Op.vue';

    export default {
        data () {
            return {
                loading: true,
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
                this.account_info.balances['1.3.0'] = this.account_info.balances['1.3.0'] ? this.formatted_number('1.3.0', ChainStore.getObject(this.account_info.balances['1.3.0']).get('balance'), 5) : this.formatted_number('1.3.0', 0, 5);
                this.account_info.balances['1.3.1'] = this.account_info.balances['1.3.1'] ? this.formatted_number('1.3.1', ChainStore.getObject(this.account_info.balances['1.3.1']).get('balance'), 5) : this.formatted_number('1.3.1', 0, 5);

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
                    this.loading = false;
                }
            },

            formatted_number (asset_id, amount, decimalOffset) {
                return formatted_asset(asset_id, amount, decimalOffset);
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

            account_type () {
                let result = [];
                if (this.account_info.membership_expiration_date !== '1970-01-01T00:00:00') {
                    result.push(`<span class="label label-warning">${this.$t('account.membership.lifetime')}</span>`);
                } else {
                    result.push(`<span class="label label-default">${this.$t('account.membership.normal')}</span>`);
                }
                if (this.account_info.merchant_expiration_date !== '1970-01-01T00:00:00') {
                    result.push(`<span class="label label-info">${this.$t('account.membership.merchant')}</span>`);
                }
                if (this.account_info.datasource_expiration_date !== '1970-01-01T00:00:00') {
                    result.push(`<span class="label label-warning">${this.$t('account.membership.datasource')}</span>`);
                }
                if (this.account_info.data_transaction_member_expiration_date !== '1970-01-01T00:00:00') {
                    result.push(`<span class="label label-warning">${this.$t('account.membership.data_transaction_member')}</span>`);
                }
                return result.join('&nbsp;');
            }
        },
        mounted () {
            if (this.$route.params.id_or_name !== this.keywords) {
                this.setKeywords({keywords: this.$route.params.id_or_name});
            }
            ChainStore.subscribe(this.onUpdate);
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
</style>