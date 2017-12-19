<style scoped>
    #seg {
        margin: 20px 10px;
    }

    .router-link-active {
        border-color: #008fcd !important;
        background: #008fcd !important;;
        color: #fff !important;;
    }

    .close{
        line-height: 13px;
    }

    .title td{
        font-weight: 500;
    }
</style>

<template>
    <div class="container">
        <div class="text-center">
            <div id="seg" class="btn-group btn-group-lg text-center" role="group">
                <router-link :to="{path:'/holdrank/1'}" class="btn btn-default">{{$t('holdrank.rank.active')}}
                </router-link>
                <router-link :to="{path:'/holdrank/2'}" class="btn btn-default">{{$t('holdrank.rank.lock')}}
                </router-link>
                <router-link :to="{path:'/holdrank/3'}" class="btn btn-default">{{$t('holdrank.rank.all')}}
                </router-link>
            </div>
        </div>
        <Loading v-show="loading"/>
        <div class="row" v-show="!loading">
            <div class="col-md-12">
                <hr/>
                <div class="alert alert-info" role="alert">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <p>
                        <span>{{$t('holdrank.locknum')}}: {{formatted_number('1.3.1',locknum,5)}}</span>
                        <span>（{{$t('holdrank.last_updated_at',{datetime:uptime})}}）</span>
                    </p>
                </div>
                <div class="panel-body no-padding table-responsive">
                    <table class="table table-striped table-bordered no-margin">
                        <tbody>
                            <tr class="title">
                                <td>#</td>
                                <td>{{$t('holdrank.table.userid')}}</td>
                                <td>{{$t('holdrank.table.username')}}</td>
                                <template v-if="typeid == 2">
                                <td class="text-right">{{$t('holdrank.table.lockgxs')}}</td>
                                <td class="text-right">{{$t('holdrank.table.perlock')}}</td>
                                </template>
                                <template v-else-if="typeid == 3">
                                <td class="text-right">{{$t('holdrank.table.allgxs')}}</td>
                                <td class="text-right">{{$t('holdrank.table.perall')}}</td>
                                </template>
                                <template v-else>
                                <td class="text-right">{{$t('holdrank.table.activegxs')}}</td>
                                <td class="text-right">{{$t('holdrank.table.peractive')}}</td>
                                </template>
                            </tr>
                            <tr v-for="r in holdrank">
                                <td>{{r.ranknum}}</td>
                                <td>1.2.{{r.userid}}</td>
                                <td><a :href="r.accountlink" target="_blank">{{r.username}}</a></td>
                                <template v-if="typeid == 2">
                                <td class="text-right">{{formatted_number('1.3.1',r.lockgxs,5)}}</td>
                                <td class="text-right">{{r.perlock}}%</td>
                                </template>
                                <template v-else-if="typeid == 3">
                                <td class="text-right">{{formatted_number('1.3.1',r.allgxs,5)}}</td>
                                <td class="text-right">{{r.perall}}%</td>
                                </template>
                                <template v-else>
                                <td class="text-right">{{formatted_number('1.3.1',r.activegxs,5)}}</td>
                                <td class="text-right">{{r.peractive}}%</td>
                                </template>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {formatted_asset, get_rank} from '@/services/CommonService';

export default {
    data () {
        return {
            loading: true,
            holdrank: [],
            locknum: 0,
            uptime: '',
            typeid: 1
        };
    },
    computed: {},
    watch: {
        '$route': 'getHoldRank'
    },
    mounted () {
        this.getHoldRank();
    },
    destroyed () {},
    methods: {
        getHoldRank: function () {
            let self = this;
            get_rank(self.$route.params.type).then(function (rankdata) {
                self.holdrank = rankdata['data']['hold'];
                self.locknum = rankdata['data']['locknum'];
                self.uptime = rankdata['data']['uptime'];
                self.loading = false;
                self.typeid = self.$route.params.type;
            }).catch(ex => {
                console.error(ex);
            });
        },
        formatted_number (asset_id, amount, decimalOffset) {
            return formatted_asset(asset_id, amount, decimalOffset);
        }
    }
};
</script>
