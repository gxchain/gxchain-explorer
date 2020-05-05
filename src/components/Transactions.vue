<template>
  <div class="container">
    <Loading v-show="loading"></Loading>
    <div class="row" v-show="!loading">
      <div class="col-md-12">
        <div class="pull-left color-gray">
          <div>{{ $t('pagination.page') }}: {{ this.current_page }} / {{ this.total_page }}</div>
          <div>{{ $t('transactions.total_txs') }}：{{ total }}</div>
        </div>
        <div class="pull-right">
          <div class="btn-group">
            <button :disabled="current_page == 1" class="btn btn-primary" @click="goPrev">{{ $t('pagination.prev') }}</button>
            <button :disabled="current_page == total_page" class="btn btn-primary" @click="goNext">{{ $t('pagination.next') }}</button>
          </div>
        </div>
      </div>
      <div class="col-md-12">
        <div class="table-responsive">
          <table class="table table-striped table-bordered no-margin">
            <thead>
              <tr>
                <th>txid</th>
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
      current_page: 1,
      transactions: [],
      total: 0,
      pageSize: 20
    };
  },
  computed: {
    total_page() {
      let page = Math.ceil(this.total / this.pageSize);
      return page;
    }
  },
  methods: {
    goPrev() {
      this.indexId += 20;
      this.current_page -= 1;
      this.fetch_transactions();
    },
    goNext() {
      this.indexId -= 20;
      this.current_page += 1;
      this.fetch_transactions();
    },
    fetch_transactions() {
      this.loading = true;
      this.$http
        .get(`${process.env.STA_SERVICE}/transaction/list`, {
          params: {
            limit: 20,
            indexId: this.indexId === -1 ? undefined : this.indexId
          }
        })
        .then((resp) => {
          this.loading = false;

          this.transactions = resp.body.result.map((item) => {
            item.blockInfo = null;
            item.witness_info = null;
            return item;
          });
          this.total = resp.body.totalCnt;
          this.indexId = resp.body.indexId;
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

<style scoped>
.color-gray {
  color: #999;
}
.pagination-box {
  text-align: center;
}
</style>
