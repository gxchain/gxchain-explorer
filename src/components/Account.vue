<template>
  <div class="container">
    <div class="row" v-if="account&&account.id">
      <div class="col-md-12">
        <div class="panel panel-default">
          <div class="panel-heading">
            <span class="fa fa-address-card-o">&nbsp;基本信息</span>
            <a class="pull-right" :href="'https://wallet.gxb.io/#/account/'+account.name+'/overview'" target="_blank">更多</a>
          </div>
          <div class="panel-body no-padding">
            <table class="table table-striped no-margin">
              <tbody>
              <tr>
                <th>账户名</th>
                <td>{{account.name}}</td>
              </tr>
              <tr>
                <th>账户ID</th>
                <td>{{account.id}}</td>
              </tr>
              <tr>
                <th>推荐人</th>
                <td>
                  <router-link :to="{path:'/block/'+account.referrer_name}">{{account.referrer_name}}({{account.referrer}})</router-link>
                </td>
              </tr>
              <tr>
                <th>账户类型</th>
                <td>
                  <div v-html="account_type"></div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="panel panel-default">
          <div class="panel-heading">
            <span class="fa fa-legal"></span>&nbsp;账户权限
          </div>
          <div class="panel-body no-padding">
            <table class="table no-margin">
              <tbody>
              <tr class="active">
                <th><span class="fa fa-lock">&nbsp;活跃权限</span></th>
                <th>阈值（{{account.active.weight_threshold}}）</th>
              </tr>
              <tr v-for="auth in account.active.key_auths">
                <td>{{auth[0]}}</td>
                <td>{{auth[1]}}</td>
              </tr>
              <tr class="active">
                <th><span class="fa fa-lock">&nbsp;账户权限</span></th>
                <th>阈值（{{account.owner.weight_threshold}}）</th>
              </tr>
              <tr v-for="auth in account.owner.key_auths">
                <td>{{auth[0]}}</td>
                <td>{{auth[1]}}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="panel panel-default">
          <div class="panel-heading">
            <span class="fa fa-money"></span>&nbsp;账户余额
          </div>
          <div class="panel-body no-padding">
            <table class="table table-striped no-margin">
              <thead>
              <tr>
                <th>资产</th>
                <th align="right"><div class="text-right">余额</div></th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <th>GXC</th>
                <td align="right">{{account.balances['1.3.0']| number(5)}}</td>
              </tr>
              <tr>
                <th>GXS</th>
                <td align="right">{{account.balances['1.3.1']| number(5)}}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <p v-if="!account||!account.id" class="null-tip">{{account.error || '未查询到账户信息'}}</p>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import {fetch_account, fetch_account_balance} from '@/services/CommonService'
  import Promise from 'bluebird'
  import filters from '@/filters'

  export default {
    data() {
      return {
        account: {}
      }
    },
    filters:filters,
    methods: {
      ...mapActions({
        setKeywords: 'setKeywords'
      }),
      fetch_account_info() {
        let self = this;
        Promise.all([
          fetch_account(this.$route.params.id_or_name),
          fetch_account_balance(this.$route.params.id_or_name)
        ]).then(function (resps) {
          let account = resps[0].body;
          if (!account.id) {
            return self.account = {};
          }
          let balances = resps[1].body;
          let gxc = balances.find(function (balance_info) {
            return balance_info.asset_type == '1.3.0'
          });
          let gxs = balances.find(function (balance_info) {
            return balance_info.asset_type == '1.3.1'
          });
          account.balances['1.3.0'] = (gxc ? (gxc.balance / 10000).toFixed(5) : 0)+'';
          account.balances['1.3.1'] = (gxs ? (gxs.balance / 10000).toFixed(5) : 0)+'';

          self.account = account;
        }).catch(ex => {
          console.error(ex);
          self.account = {error: '获取账户信息失败'};
        })
      }
    },
    watch: {
      keywords() {
        this.fetch_account_info();
      }
    },
    computed: {
      ...mapGetters({
        keywords: 'keywords'
      }),
      account_type() {
        let result = [];
        if (this.account.membership_expiration_date != '1970-01-01T00:00:00') {
          result.push('<span class="label label-warning">终身会员</span>')
        }
        else {
          result.push('<span class="label label-default">普通会员</span>')
        }
        if (this.account.merchant_expiration_date != '1970-01-01T00:00:00') {
          result.push('<span class="label label-info">认证商户</span>')
        }
        if (this.account.membership_expiration_date != '1970-01-01T00:00:00') {
          result.push('<span class="label label-warning">认证数据源</span>')
        }
        if (this.account.data_transaction_member_expiration_date != '1970-01-01T00:00:00') {
          result.push('<span class="label label-warning">交易认证节点</span>')
        }
        return result.join('&nbsp;');
      }
    },
    mounted() {
      if (this.$route.params.id_or_name != this.keywords) {
        this.setKeywords({keywords: this.$route.params.id_or_name})
      }
      this.fetch_account_info();
    },
  }
</script>

<style scoped>
  .no-padding {
    padding: 0;
  }

  .no-margin {
    margin: 0;
  }
</style>
