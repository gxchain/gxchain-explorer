<template>
    <div class="container">
        <Loading v-show="loading"/>
        <div class="row" v-show="!loading">
            <div class="col-md-12">
                <hr/>
                <div class="alert alert-info" role="alert">
                <p>{{$t('holdrank.last_updated_at',{datetime:uptime})}}</p>
                <p>{{$t('holdrank.locknum')}}:{{locknum}}</p>
                </div>
                <div class="panel-heading">
                    <ul class="nav nav-tabs">
                        <li role="presentation" v-bind:class="{ active: this.$route.params.type == 1 }">
                            <router-link :to="{path:'/holdrank/1'}">{{$t('holdrank.rank.active')}}
                            </router-link>
                        </li>
                        <li role="presentation" v-bind:class="{ active: this.$route.params.type == 2 }">
                            <router-link :to="{path:'/holdrank/2'}">{{$t('holdrank.rank.lock')}}
                            </router-link>
                        </li>
                        <li role="presentation" v-bind:class="{ active: this.$route.params.type == 3 }">
                            <router-link :to="{path:'/holdrank/3'}">{{$t('holdrank.rank.all')}}
                            </router-link>
                        </li>
                    </ul>
                </div>

                <div class="panel-body no-padding table-responsive">
                    <table class="table table-striped table-bordered no-margin">
                        <tbody>
                            <tr>
                                <td>#</td>
                                <td>{{$t('holdrank.table.userid')}}</td>
                                <td>{{$t('holdrank.table.username')}}</td>
                                <td>{{$t('holdrank.table.activegxs')}}</td>
                                <td>{{$t('holdrank.table.peractive')}}</td>
                                <td>{{$t('holdrank.table.lockgxs')}}</td>
                                <td>{{$t('holdrank.table.perlock')}}</td>
                                <td>{{$t('holdrank.table.allgxs')}}</td>
                                <td>{{$t('holdrank.table.perall')}}</td>
                                <td>{{$t('holdrank.table.detail')}}</td>
                            </tr>
                            <tr v-for="r in holdrank">
                                <td>{{r.ranknum}}</td>
                                <td>{{r.userid}}</td>
                                <td>{{r.username}}</td>
                                <td>{{r.activegxs}}</td>
                                <td>{{r.peractive}}%</td>
                                <td>{{r.lockgxs}}</td>
                                <td>{{r.perlock}}%</td>
                                <td>{{r.allgxs}}</td>
                                <td>{{r.perall}}%</td>
                                <td><a :href="r.accountlink" target="_blank">{{$t('holdrank.table.click')}}</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
            </div>
        </div> 
    </div>
</template>

<script>

import {get_rank} from '@/services/HoldrankService'

export default {
    data() {
      return {
        loading:true,
        holdrank:[],
        locknum:0,
        uptime:'',
      }
    },
    computed: {
      
    },
    watch: {
      "$route": "getHoldRank"
    },
    mounted() {
        this.getHoldRank();
    },

    destroyed() {
    },

    methods: {
        getHoldRank: function () {
            let self = this;

            get_rank(self.$route.params.type).then(function (rankdata) {
                self.holdrank = rankdata['data']['hold'];
                self.locknum = rankdata['data']['locknum'];
                self.uptime = rankdata['data']['uptime'];
                self.loading = false;
                console.log(self.holdrank);

            }).catch(ex => {
                console.error(ex);
            });
           
        }
     }
  }

</script>
