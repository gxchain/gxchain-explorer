<template>
  <div class="col-md-12">
    <div class="panel panel-default">
      <div class="panel-heading">
        <span class="fa fa-list">&nbsp;{{$t('transaction.trx_op')}} <span v-if="id>0">{{id}}</span></span>
      </div>
      <div class="panel-body no-padding">
        <div class="table-responsive">
          <table class="table table-striped no-margin">
            <tbody v-if="ops[op[0]] == 'transfer'">
              <tr>
                <th>{{$t('transaction.trx_type')}}</th>
                <td align="right"><span class="label label-success">{{$t('transaction.trxTypes.transfer.name')}}</span></td>
              </tr>
              <tr>
                <th>{{$t('transaction.trxTypes.transfer.from')}}</th>
                <td align="right"><router-link :to="{path: '/account/' + op[1].from}">{{formatted_account(op[1].from,'from')}}{{op[1].from}}</router-link></td>
              </tr>
              <tr>
                <th>{{$t('transaction.trxTypes.transfer.to')}}</th>
                <td align="right"><router-link :to="{path: '/account/' + op[1].to}">{{formatted_account(op[1].to,'to')}}{{op[1].to}}</router-link></td>
              </tr>
              <tr>
                <th>{{$t('transaction.trxTypes.transfer.amount')}}</th>
                <td align="right">{{formatted_number(op[1].amount.asset_id,op[1].amount.amount,5)}}</td>
              </tr>
              <tr>
                <th>{{$t('transaction.trxTypes.transfer.fee')}}</th>
                <td align="right">{{formatted_number(op[1].fee.asset_id,op[1].fee.amount,5)}}</td>
              </tr>
            </tbody>

            <tbody v-if="ops[op[0]] == 'account_create'">
              <tr>
                <th>{{$t('transaction.trx_type')}}</th>
                <td align="right"><span class="label label-primary">{{$t('transaction.trxTypes.account_create.name')}}</span></td>
              </tr>
              <tr>
                <th>{{$t('transaction.trxTypes.account_create.registrar')}}</th>
                <td align="right"><router-link :to="{path: '/account/' + op[1].registrar}">{{formatted_account(op[1].registrar,'registrar')}}{{op[1].registrar}}</router-link></td>
              </tr>
              <tr>
                <th>{{$t('transaction.trxTypes.account_create.referrer')}}</th>
                <td align="right"><router-link :to="{path: '/account/' + op[1].referrer}">{{formatted_account(op[1].referrer,'referrer')}}{{op[1].referrer}}</router-link></td>
              </tr>
              <tr>
                <th>{{$t('transaction.trxTypes.account_create.account')}}</th>
                <td align="right"><router-link :to="{path: '/account/' + op[1].name}">{{op[1].name}}</router-link></td>
              </tr>
              <tr>
                <th>{{$t('transaction.trxTypes.account_create.fee')}}</th>
                <td align="right">{{formatted_number(op[1].fee.asset_id,op[1].fee.amount,5)}}</td>
              </tr>
            </tbody>

            <tbody v-if="ops[op[0]] == 'account_update'">
              <tr>
                <th>{{$t('transaction.trx_type')}}</th>
                <td align="right"><span class="label label-primary">{{$t('transaction.trxTypes.account_update.name')}}</span></td>
              </tr>
              <tr>
                <th>{{$t('transaction.trxTypes.account_update.account')}}</th>
                <td align="right"><router-link :to="{path: '/account/' + op[1].name}">{{op[1].name}}</router-link></td>
              </tr>
              <tr>
                <th>{{$t('transaction.trxTypes.account_update.fee')}}</th>
                <td align="right">{{formatted_number(op[1].fee.asset_id,op[1].fee.amount,5)}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {ChainTypes} from 'gxbjs/es'
  import {fetch_account,formatted_asset} from '@/services/CommonService'
  let ops = Object.keys(ChainTypes.operations);

  export default {
    props: {
      id: {
        type: Number
      },
      operation: {
        type: Array
      }
    },
    data() {
      return {
        items: {},
        ops: Object.keys(ChainTypes.operations),
        op: this.operation
      }
    },
    methods: {
      formatted_account:function (id,key) {
        let self = this;
        Promise.all([
          fetch_account(id),
        ]).then(function (resps) {
          self.op[1][key] = resps[0].body.name;
          return self.op[1][key];
        }).catch(ex => {
          console.error(ex);
        })
      },
      formatted_number:function (asset_id,amount,decimalOffset) {
        return formatted_asset(asset_id,amount,decimalOffset);
      }
    }
  }
</script>
