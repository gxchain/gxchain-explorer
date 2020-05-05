<template>
  <div class="container">
    <Loading v-show="loading"></Loading>
    <div class="row" v-show="!loading">
      <div class="col-md-12">
        <div class="pagination">
          <pagination ref="pagination" class="pagination-box" :pagination="pagination" :callback="fetch_transactions" :options="paginationOptions"></pagination>
          <div class="pagination-input"><input class="input-page" :value="this.pagination.current_page" @change="onPageChange" /> / {{ pagination.last_page }}</div>
        </div>
      </div>
      <div class="col-md-12">
        <div class="tips">
          <div>{{ $t('transactions.total_txs') }}：{{ total }}({{ $t('transactions.tips') }})</div>
        </div>
      </div>
      <div class="col-md-12">
        <div class="table-responsive">
          <table class="table table-striped table-bordered no-margin">
            <thead>
              <tr>
                <th>TXID</th>
                <th>{{ $t('transactions.block') }}</th>
                <th>{{ $t('transactions.timestamp') }}</th>
                <th>{{ $t('transactions.witness') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr :key="`tx_${tx.transactionId}`" v-for="tx in transactions">
                <td>
                  <router-link :to="{ path: '/transaction/' + tx.transactionId }">
                    {{ tx.transactionId }}
                  </router-link>
                </td>
                <td>
                  <router-link :to="{ path: '/block/' + tx.blockNum }">
                    {{ tx.blockNum }}
                  </router-link>
                </td>
                <td>
                  <div v-if="tx.blockInfo">
                    {{ new Date(tx.blockInfo.timestamp + 'Z').format('yyyy-MM-dd hh:mm:ss') }}
                  </div>
                </td>
                <td>
                  <router-link v-if="tx.witness_info" :to="{ path: '/account/' + tx.witness_info.name }">
                    {{ tx.witness_info.name }}
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Operation from './partial/Operation.vue';
import pagination from 'vue-bootstrap-pagination';
import { fetch_account, fetch_block, get_objects } from '@/services/CommonService';

export default {
  data() {
    return {
      loading: true,
      indexId: -1,
      transactions: [],
      total: 0,
      pagination: {
        per_page: 20, // required
        current_page: 1, // required
        last_page: 50000 // required
      },
      paginationOptions: {
        offset: 5,
        previousText: this.$t('pagination.prev'),
        nextText: this.$t('pagination.next'),
        alwaysShowPrevNext: true
      }
    };
  },
  methods: {
    onPageChange(e) {
      let page = Number(e.target.value);
      if (!isNaN(page)) {
        if (page < 1) {
          page = 1;
        }
        if (page > this.pagination.last_page) {
          page = this.pagination.last_page;
        }
        this.$refs.pagination.changePage(page);
      }
    },
    fetch_transactions() {
      this.loading = true;
      let indexId = this.indexId + this.pagination.per_page - this.pagination.current_page * this.pagination.per_page;
      indexId = indexId > 0 ? indexId : undefined;
      this.$http
        .get(`${process.env.STA_SERVICE}/transaction/list`, {
          params: {
            limit: this.pagination.per_page,
            indexId: indexId
          }
        })
        .then((resp) => {
          this.loading = false;
          this.transactions = resp.body.result.map((item) => {
            item.blockInfo = null;
            item.witness_info = null;
            return item;
          });
          // Assign total only once
          this.total = this.total || resp.body.totalCnt;
          this.indexId = this.indexId > 0 ? this.indexId : resp.body.indexId + this.pagination.per_page;
          this.transactions.forEach((tx) => {
            fetch_block(tx.blockNum).then((resp) => {
              tx.blockInfo = resp.body;
              get_objects([tx.blockInfo.witness]).then((res) => {
                fetch_account(res[0].witness_account)
                  .then((res) => {
                    tx.witness_info = res.body.account;
                  })
                  .catch((ex) => {
                    console.error(ex);
                  });
              });
            });
          });
        })
        .catch((ex) => {
          console.warn('error loading transactions', ex);
          this.loading = false;
        });
    }
  },
  components: {
    Operation: Operation,
    pagination
  },
  mounted() {
    this.fetch_transactions();
  }
};
</script>

<style scoped lang="less">
.tips {
  color: #999;
  margin-bottom: 15px;
  text-align: center;
}
.pagination {
  margin: 0;
  justify-content: center;
  display: flex;
  align-items: center;
}
.pagination-box {
  display: flex;
}
.pagination-input {
  margin-left: 10px;
  white-space: nowrap;
}
.input-page {
  display: inline-block;
  width: 50px;
  height: 34px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
