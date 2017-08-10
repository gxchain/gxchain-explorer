<template>
  <div class="container">
    <div class="row" v-if="account&&account.id">
      <div class="col-md-12">
        <div class="panel panel-default">
          <div class="panel-heading">
            <span class="fa fa-address-card-o">&nbsp;{{$t('account.basic.title')}}</span>
            <a class="pull-right" :href="'https://wallet.gxb.io/#/account/'+account.name+'/overview'"
               target="_blank">{{$t('account.basic.more')}}</a>
          </div>
          <div class="panel-body no-padding">
            <div class="table-responsive">
              <table class="table table-striped no-margin">
                <tbody>
                <tr>
                  <th width="220px">{{$t('account.basic.account_name')}}</th>
                  <td>{{account.name}}</td>
                </tr>
                <tr>
                  <th>{{$t('account.basic.account_id')}}</th>
                  <td>{{account.id}}</td>
                </tr>
                <tr>
                  <th>{{$t('account.basic.referrer_name')}}</th>
                  <td>
                    <router-link :to="{path:'/block/'+account.referrer_name}">
                      {{account.referrer_name}}({{account.referrer}})
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
      <div class="col-md-6">
        <div class="panel panel-default">
          <div class="panel-heading">
            <span class="fa fa-legal"></span>&nbsp;{{$t('account.permissions.title')}}
          </div>
          <div class="panel-body no-padding">
            <div class="table-responsive">
              <table class="table table-bordered no-margin">
                <tbody>
                <tr class="active">
                  <th width="80%"><span class="fa fa-lock">&nbsp;{{$t('account.permissions.active')}}</span></th>
                  <th>{{$t('account.permissions.threshold')}}（{{account.active.weight_threshold}}）</th>
                </tr>
                <tr v-for="auth in account.active.key_auths">
                  <td class="overflow-wrap">{{auth[0]}}</td>
                  <td>{{auth[1]}}</td>
                </tr>
                <tr class="active">
                  <th><span class="fa fa-lock">&nbsp;{{$t('account.permissions.owner')}}</span></th>
                  <th>{{$t('account.permissions.threshold')}}（{{account.owner.weight_threshold}}）</th>
                </tr>
                <tr v-for="auth in account.owner.key_auths">
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
                <td align="right">{{account.balances['1.3.0'] | number(5)}}</td>
              </tr>
              <tr>
                <th>GXS</th>
                <td align="right">{{account.balances['1.3.1'] | number(5)}}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!account||!account.id">
      <h4 class="page-header">{{$t('account.title')}}</h4>
      <p class="null-tip">{{account.error || $t('account.empty')}}</p>
    </div>
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
    filters: filters,
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
          account.balances['1.3.0'] = (gxc ? (gxc.balance / 100000).toFixed(5) : 0) + '';
          account.balances['1.3.1'] = (gxs ? (gxs.balance / 100000).toFixed(5) : 0) + '';

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
          result.push(`<span class="label label-warning">${this.$t('account.membership.lifetime')}</span>`)
        }
        else {
          result.push(`<span class="label label-default">${this.$t('account.membership.normal')}</span>`)
        }
        if (this.account.merchant_expiration_date != '1970-01-01T00:00:00') {
          result.push(`<span class="label label-info">${this.$t('account.membership.merchant')}</span>`)
        }
        if (this.account.datasource_expiration_date != '1970-01-01T00:00:00') {
          result.push(`<span class="label label-warning">${this.$t('account.membership.datasource')}</span>`)
        }
        if (this.account.data_transaction_member_expiration_date != '1970-01-01T00:00:00') {
          result.push(`<span class="label label-warning">${this.$t('account.membership.data_transaction_member')}</span>`)
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

  .overflow-wrap {
    word-break: break-all;
  }

  .overflow-nowrap{
    white-space: nowrap;
  }

</style>
