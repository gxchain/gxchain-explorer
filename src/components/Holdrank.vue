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
            $.ajax({
                type : "get",
                url : "http://gxs.imcrm.cn/gxsapi/holdrank.php?type="+ self.$route.params.type,
                dataType : "jsonp",
                jsonp: "callback",
                success : function(response){
                    //console.log(response);
                    if (response['code'] == 200) {
                        self.loading = false;
                        self.holdrank = response['data']['hold'];
                        self.locknum = response['data']['locknum'];
                        self.uptime = response['data']['uptime'];
                    } else {
                       console.log('error2'); 
                    }
                },
                error:function(){
                    console.log('error1');
                }
            });
        }
     }
  }

</script>
