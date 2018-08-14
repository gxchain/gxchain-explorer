<template>
    <div class="container">
        <Loading v-show="loading"></Loading>
        <div class="row" v-if="asset&&asset.id" v-show="!loading">
            <div class="col-md-12">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        {{asset.symbol}}-{{asset.id}}
                    </div>
                    <div class="panel-body">
                        <p>{{asset.options.description&&JSON.parse(asset.options.description).main}}</p>
                        <div class="table-responsive">
                            <table class="table table-striped table-bordered no-margin">
                                <tbody>
                                <tr>
                                    <th>
                                        {{$t('asset.issuer')}}
                                    </th>
                                    <td>
                                        <router-link :to="{path:'/account/'+asset.issuer.name}">
                                            {{asset.issuer.name}}
                                        </router-link>
                                    </td>
                                    <th>{{$t('asset.precision')}}</th>
                                    <td>{{asset.precision}}</td>
                                </tr>
                                <tr>
                                    <th>{{$t('asset.max_supply')}}</th>
                                    <td>
                                        {{asset.options.max_supply/Math.pow(10,asset.precision)|number(2)}}
                                    </td>
                                    <th>{{$t('asset.current_supply')}}</th>
                                    <td>{{asset.detail.current_supply/Math.pow(10,asset.precision)|number(2)}}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="panel panel-default panel-ranking" v-if="rankings&&rankings.length>0">
                    <div class="panel-heading">
                        <span class="fa fa-fw gxicon gxicon-rank"></span>&nbsp;{{$t('index.ranking.title')}}
                    </div>
                    <div class="pabel-body table-responsive no-padding">
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
                        <div class="footer" v-if="hasMore">
                            <a href="javascript:;" @click="loadRankings(page+1)">
                                <i class="fa fa-angle-double-down"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import AccountImage from './partial/AccountImage';
    import filters from '../filters';

    export default {
        filters,
        components: {
            AccountImage
        },
        data () {
            return {
                loading: true,
                asset: null,
                page: 1,
                hasMore: true,
                rankings: []
            };
        },
        methods: {
            ...mapActions({
                setKeywords: 'setKeywords'
            }),
            loadData () {
                this.$http.get(`/api/asset/${this.keywords.toUpperCase()}`).then(resp => {
                    let asset = resp.body;
                    this.asset = asset;
                    this.loading = false;
                    this.loadRankings(1);
                });
            },
            loadRankings (page) {
                const pageSize = 20;
                this.$http
                .get(`${process.env.STA_SERVICE}/account/assetRankList`, {
                    params: {
                        symbol: this.keywords.toUpperCase(),
                        pageNo: page,
                        pageSize: pageSize
                    }
                })
                .then(resp => {
                    this.page = page;
                    let assetInfo = this.asset;
                    let currentSupply = assetInfo.detail.current_supply / Math.pow(10, assetInfo.precision);
                    if (!resp.body || resp.body.length < pageSize) {
                        this.hasMore = false;
                    }
                    this.rankings = this.rankings.slice(0, (page - 1) * pageSize);
                    this.rankings = this.rankings.concat(resp.body.map(item => {
                        return {
                            accountName: item.accountName,
                            amount: filters.number(item.amount, assetInfo.precision),
                            freezeAmount: filters.number(item.freezeAmount, assetInfo.precision),
                            totalAmount: filters.number(item.totalAmount, assetInfo.precision),
                            percent: filters.number((item.amount + item.freezeAmount) / currentSupply, assetInfo.precision)
                        };
                    }));
                }).catch(ex => {
                    console.error(ex);
                });
            }
        },
        mounted () {
            if (this.$route.params.asset_name !== this.keywords) {
                this.setKeywords({keywords: this.$route.params.asset_name});
            }
            this.loadData();
        },
        watch: {
            keywords () {
                this.loading = true;
                this.asset = null;
                this.loadData();
            },
            '$route' () {
                if (this.$route.params.asset_name !== this.keywords) {
                    this.loading = true;
                    this.asset = null;
                    this.setKeywords({keywords: this.$route.params.asset_name});
                }
            }
        },
        computed: {

            ...mapGetters({
                keywords: 'keywords'
            })
        }
    };
</script>
<style scoped>
    .panel-ranking .footer {
        text-align: center;
        padding: 10px 0;
        border-top: 1px solid #eee;
        font-size: 20px;
    }

    .panel-ranking .footer a {
        color: #999;
    }
</style>
