<template>
  <div class="col-md-12">
    <div class="panel panel-default">
      <div class="panel-heading">
        <span class="fa fa-list">&nbsp;{{$t('transaction.trx_op')}} <span v-if="id>0">{{id}}</span></span>
      </div>
      <div class="panel-body no-padding">
        <div class="table-responsive">
          <table class="table table-striped no-margin">
            <!-- 0:transfer -->
            <tbody v-if="ops[op[0]] == 'transfer'">
              <tr>
                <th>{{$t('transaction.trx_type')}}</th>
                <td align="right"><span class="label label-success">{{$t('transaction.trxTypes.transfer.name')}}</span></td>
              </tr>
              <tr>
                <th>{{$t('transaction.trxTypes.transfer.from')}}</th>
                <td align="right"><router-link :to="{path: '/account/' + op[1].from}">{{formatted_account(op[1].from,'from')}}</router-link></td>
              </tr>
              <tr>
                <th>{{$t('transaction.trxTypes.transfer.to')}}</th>
                <td align="right"><router-link :to="{path: '/account/' + op[1].to}">{{formatted_account(op[1].to,'to')}}</router-link></td>
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
            <!-- 5:account_create -->
            <tbody v-if="ops[op[0]] == 'account_create'">
              <tr>
                <th>{{$t('transaction.trx_type')}}</th>
                <td align="right"><span class="label label-primary">{{$t('transaction.trxTypes.account_create.name')}}</span></td>
              </tr>
              <tr>
                <th>{{$t('transaction.trxTypes.account_create.registrar')}}</th>
                <td align="right"><router-link :to="{path: '/account/' + op[1].registrar}">{{formatted_account(op[1].registrar,'registrar')}}</router-link></td>
              </tr>
              <tr>
                <th>{{$t('transaction.trxTypes.account_create.referrer')}}</th>
                <td align="right"><router-link :to="{path: '/account/' + op[1].referrer}">{{formatted_account(op[1].referrer,'referrer')}}</router-link></td>
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
            <!-- 6:account_update -->
            <tbody v-if="ops[op[0]] == 'account_update'">
              <tr>
                <th>{{$t('transaction.trx_type')}}</th>
                <td align="right"><span class="label label-primary">{{$t('transaction.trxTypes.account_update.name')}}</span></td>
              </tr>
              <tr>
                <th>{{$t('transaction.trxTypes.account_update.account')}}</th>
                <td align="right"><router-link :to="{path: '/account/' + op[1].account}">{{formatted_account(op[1].account,'account')}}</router-link></td>
              </tr>
              <tr>
                <th>{{$t('transaction.trxTypes.account_update.fee')}}</th>
                <td align="right">{{formatted_number(op[1].fee.asset_id,op[1].fee.amount,5)}}</td>
              </tr>
            </tbody>
            <!-- 7:account_whitelist -->
            <tbody v-if="ops[op[0]] == 'account_whitelist'">
              <tr>
                <th>{{$t('transaction.trx_type')}}</th>
                <td align="right"><span class="label label-primary">{{$t('transaction.trxTypes.account_whitelist.name')}}</span></td>
              </tr>
              <tr>
                <th>{{$t('transaction.trxTypes.account_whitelist.authorizing_account')}}</th>
                <td align="right"><router-link :to="{path: '/account/' + op[1].authorizing_account}">{{formatted_account(op[1].authorizing_account,'authorizing_account')}}</router-link></td>
              </tr>
              <tr>
                <th>{{$t('transaction.trxTypes.account_whitelist.account_to_list')}}</th>
                <td align="right"><router-link :to="{path: '/account/' + op[1].account_to_list}">{{formatted_account(op[1].account_to_list,'authorizing_account')}}</router-link></td>
              </tr>
              <tr>
                <th>{{$t('transaction.trxTypes.account_whitelist.fee')}}</th>
                <td align="right">{{formatted_number(op[1].fee.asset_id,op[1].fee.amount,5)}}</td>
              </tr>
            </tbody>

            <!-- 数据交易相关 -->
            <!-- 55:data_transaction_create -->
            <tbody v-if="ops[op[0]] == 'data_transaction_create'">
              <tr>
                <th>{{$t('transaction.trx_type')}}</th>
                <td align="right"><span class="label label-primary">{{$t('transaction.trxTypes.data_transaction_create.name')}}</span></td>
              </tr>
              <tr>
                <th>{{$t('transaction.trxTypes.data_transaction_create.request_id')}}</th>
                <td align="right">{{op[1].request_id}}</td>
              </tr>
              <tr>
                <th>{{$t('transaction.trxTypes.data_transaction_create.product_id')}}</th>
                <td align="right">{{formatted_product(op[1].product_id,'product_name')}}</td>
              </tr>
              <tr>
                <th>{{$t('transaction.trxTypes.data_transaction_create.version')}}</th>
                <td align="right">{{op[1].version}}</td>
              </tr>
              <tr>
                <th>{{$t('transaction.trxTypes.data_transaction_create.params')}}</th>
                <td align="right">{{op[1].params}}</td>
              </tr>
              <tr>
                <th>{{$t('transaction.trxTypes.data_transaction_create.fee')}}</th>
                <td align="right">{{formatted_number(op[1].fee.asset_id,op[1].fee.amount,5)}}</td>
              </tr>
              <tr>
                <th>{{$t('transaction.trxTypes.data_transaction_create.requester')}}</th>
                <td align="right"><router-link :to="{path: '/account/' + op[1].requester}">{{formatted_account(op[1].requester,'requester')}}</router-link></td>
              </tr>
              <tr>
                <th>{{$t('transaction.trxTypes.data_transaction_create.create_date_time')}}</th>
                <td align="right">{{op[1].create_date_time}}</td>
              </tr>
            </tbody>
            <!-- 57:data_transaction_pay -->
            <tbody v-if="ops[op[0]] == 'data_transaction_pay'">
            <tr>
              <th>{{$t('transaction.trx_type')}}</th>
              <td align="right"><span class="label label-primary">{{$t('transaction.trxTypes.data_transaction_pay.name')}}</span></td>
            </tr>
            <tr>
              <th>{{$t('transaction.trxTypes.data_transaction_pay.request_id')}}</th>
              <td align="right">{{op[1].request_id}}</td>
            </tr>
            <tr>
              <th>{{$t('transaction.trxTypes.data_transaction_pay.fee')}}</th>
              <td align="right">{{formatted_number(op[1].fee.asset_id,op[1].fee.amount,5)}}</td>
            </tr>
            <tr>
              <th>{{$t('transaction.trxTypes.data_transaction_pay.from')}}</th>
              <td align="right"><router-link :to="{path: '/account/' + op[1].from}">{{formatted_account(op[1].from,'from')}}</router-link></td>
            </tr>
            <tr>
              <th>{{$t('transaction.trxTypes.data_transaction_pay.to')}}</th>
              <td align="right"><router-link :to="{path: '/account/' + op[1].to}">{{formatted_account(op[1].to,'to')}}</router-link></td>
            </tr>
            <tr>
              <th>{{$t('transaction.trxTypes.data_transaction_pay.amount')}}</th>
              <td align="right">{{formatted_number(op[1].amount.asset_id,op[1].amount.amount,5)}}</td>
            </tr>
            </tbody>
            <!-- 59:data_transaction_datasource_upload -->
            <tbody v-if="ops[op[0]] == 'data_transaction_datasource_upload'">
              <tr>
                <th>{{$t('transaction.trx_type')}}</th>
                <td align="right"><span class="label label-primary">{{$t('transaction.trxTypes.data_transaction_datasource_upload.name')}}</span></td>
              </tr>
              <tr>
                <th>{{$t('transaction.trxTypes.data_transaction_datasource_upload.request_id')}}</th>
                <td align="right">{{op[1].request_id}}</td>
              </tr>
              <tr>
                <th>{{$t('transaction.trxTypes.data_transaction_datasource_upload.requester')}}</th>
                <td align="right"><router-link :to="{path: '/account/' + op[1].requester}">{{formatted_account(op[1].requester,'requester')}}</router-link></td>
              </tr>
              <tr>
                <th>{{$t('transaction.trxTypes.data_transaction_datasource_upload.datasource')}}</th>
                <td align="right"><router-link :to="{path: '/account/' + op[1].datasource}">{{formatted_account(op[1].datasource,'datasource')}}</router-link></td>
              </tr>
              <tr>
                <th>{{$t('transaction.trxTypes.data_transaction_datasource_upload.fee')}}</th>
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
  import {fetch_account,fetch_product,formatted_asset} from '@/services/CommonService'
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
        items: {
          'product_name': '',
        },
        ops: Object.keys(ChainTypes.operations),
        op: this.operation,
      }
    },
    methods: {
       formatted_account:function (id,key) {
         let self = this;
          fetch_account(id).then(function (res) {
            self.op[1][key] = res.body.name;
          }).catch(ex => {
            console.error(ex);
          })
          return this.op[1][key];
      },
      formatted_product:function (id,key) {
        let self = this;
        fetch_product(id).then(function (res) {
          self.items[key] = res.body.product_name;
        }).catch(ex => {
          console.error(ex);
        })
        return this.items[key];
      },
      formatted_number:function (asset_id,amount,decimalOffset) {
          return formatted_asset(asset_id,amount,decimalOffset);
      }
    }
  }
</script>
