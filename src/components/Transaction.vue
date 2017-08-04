<template>
  <div class="container">
    <h4 class="page-header">交易信息</h4>
    <json v-if="transaction&&transaction.current_block_number" :json="transaction"></json>
    <p v-else class="null-tip">{{transaction.error || '未查到交易信息'}}</p>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import {fetch_transaction} from '@/services/CommonService'
  import JSON from './partial/JSON.vue'

  export default {
    data() {
      return {
        transaction: {}
      }
    },
    methods: {
      ...mapActions({
        setKeywords: 'setKeywords'
      }),
      fetch_transaction() {
        let self = this;
        fetch_transaction(this.$route.params.tx_id).then(function (resp) {
          self.transaction = resp.body;
        }).catch(ex => {
          self.transaction = {error: '获取交易信息失败'};
        });
      }
    },
    computed: {
      ...mapGetters({
        keywords: 'keywords'
      })
    },
    watch: {
      keywords() {
        this.fetch_transaction()
      }
    },
    components:{
      json:JSON
    },
    mounted() {
      if (this.$route.params.tx_id != this.keywords) {
        this.setKeywords({keywords: this.$route.params.tx_id})
      }
      this.fetch_transaction();
    },
  }
</script>

<style scoped>

</style>
