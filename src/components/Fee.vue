<style scoped>
.close {
  line-height: 13px;
}
tbody tr td {
  vertical-align: middle;
}
</style>

<template>
  <div class="container">
    <Loading v-show="loading" />
    <div class="row" v-show="!loading">
      <div class="col-md-12">
        <div class="alert alert-info" role="alert">
          <button
            type="button"
            class="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <p>
            <span>{{ $t('fee.mark') }}</span>
          </p>
        </div>
        <div class="panel-body no-padding table-responsive">
          <div :key="index_g" v-for="(item_g, index_g) in fee_grouping">
            <blockquote>
              <p>{{ $t('fee.feeGroups.' + index_g) }}</p>
            </blockquote>
            <table class="table table-striped table-bordered no-margin">
              <tbody>
                <tr>
                  <td class="text-center">{{ $t('fee.title.action') }}</td>
                  <td class="text-right">{{ $t('fee.title.type') }}</td>
                  <td class="text-right">{{ $t('fee.title.fee') }}(GXC)</td>
                  <td class="text-right">{{ $t('fee.title.feeltm') }}(GXC)</td>
                </tr>
                <template v-for="item in get_data(index_g)">
                  <tr :key="`item_${index2}`" v-for="(item2, index2) in item">
                    <td
                      v-if="index2 == 0"
                      :rowspan="item.length"
                      class="text-center"
                    >
                      {{ $t('fee.trxTypes.' + item2.fee_name) }}
                    </td>
                    <td class="text-right">
                      {{ $t('fee.feeTypes.' + item2.fee_xx) }}
                    </td>
                    <td v-if="item2.assetAmount == 0" class="text-right">
                      {{ $t('fee.feeTypes._none') }}
                    </td>
                    <td v-else class="text-right">{{ item2.assetAmount }}</td>
                    <td v-if="item2.assetAmountLTM == 0" class="text-right">
                      {{ $t('fee.feeTypes._none') }}
                    </td>
                    <td v-else class="text-right">
                      {{ item2.assetAmountLTM }}
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
            <hr />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ChainStore } from 'gxbjs';
import { ChainTypes } from 'gxbjs/es';
import { Apis } from 'gxbjs-ws';

let ops = Object.keys(ChainTypes.operations);

let fee_grouping = {
  general_row: [0, 25, 26, 27, 28, 32, 33, 37, 39, 40],
  asset_row: [10, 11, 14],
  account_row: [5, 6, 7, 8, 9],
  business_row: [20, 21, 22, 23, 24, 29, 30, 31, 34, 35, 36]
};

let op_ids = [
  0,
  25,
  26,
  27,
  28,
  32,
  33,
  37,
  39,
  40,
  10,
  11,
  14,
  5,
  6,
  7,
  8,
  9,
  20,
  21,
  22,
  23,
  24,
  29,
  30,
  31,
  34,
  35,
  36
];

let ltm_required = [5, 7, 20, 21, 34];

export default {
  data() {
    return {
      loading: true,
      general_row: [],
      asset_row: [],
      account_row: [],
      business_row: [],
      fee_grouping: {},
      ChainStore
    };
  },
  computed: {},
  mounted() {
    Apis.instance()
      .db_api()
      .exec('get_objects', [['2.0.0']])
      .then(resp => {
        this.getInfo(resp[0]);
      });
  },
  destroyed() {},
  methods: {
    getInfo(info) {
      let self = this;
      let global_object = info;
      let current_fees = global_object.parameters.current_fees;
      let scale = current_fees.scale;
      let fees_raw = current_fees.parameters;
      self.fee_grouping = fee_grouping;

      fees_raw.map(fee_struct => {
        let op_id = fee_struct[0];
        if (op_ids.includes(op_id)) {
          let operation_name = ops[op_id];
          let fee = fee_struct[1];
          let rows = [];
          for (let key in fee) {
            if (key === 'membership_annual_fee') {
              continue;
            }
            let amount = (fee[key] * scale) / 1e4;
            let assetAmount = amount ? amount / 100000 : 0;
            let assetAmountLTM = amount * 0.2 ? (amount * 0.2) / 100000 : 0;

            let temp = {};
            temp['fee_name'] = operation_name;
            temp['fee_xx'] = key;

            if (ltm_required.indexOf(op_id) < 0) {
              temp['assetAmount'] = assetAmount;
            } else {
              temp['assetAmount'] = '-*';
            }
            temp['assetAmountLTM'] = assetAmountLTM;
            rows.push(temp);
          }
          if (fee_grouping['general_row'].indexOf(op_id) >= 0) {
            self.general_row.push(rows);
          }
          if (fee_grouping['asset_row'].indexOf(op_id) >= 0) {
            self.asset_row.push(rows);
          }
          if (fee_grouping['account_row'].indexOf(op_id) >= 0) {
            self.account_row.push(rows);
          }
          if (fee_grouping['business_row'].indexOf(op_id) >= 0) {
            self.business_row.push(rows);
          }
        }
      });
      self.loading = false;
    },
    get_data(key) {
      if (key === 'general_row') {
        return this.general_row;
      }
      if (key === 'asset_row') {
        return this.asset_row;
      }
      if (key === 'account_row') {
        return this.account_row;
      }
      if (key === 'business_row') {
        return this.business_row;
      }
    }
  }
};
</script>
