<template>
  <div class="container">

    <div class="panel panel-default" v-if="block&&block.block_id">
      <div class="panel-heading">
        <span class="fa fa-chain"></span>&nbsp;{{$t('block.title')}}
        <a class="pull-right" target="_blank" :href="'https://wallet.gxb.io/#/block/'+keywords">{{$t('block.more')}}</a>
      </div>
      <div class="panel-body no-padding">
        <ul class="block-summary">
          <li>{{$t('block.timestamp')}}：{{new Date(block.timestamp).format('yyyy-MM-dd hh:mm:ss')}}</li>
          <li>{{$t('block.witness')}}：
            <router-link :to="{path:'/account/'+account_name}">
              {{account_name}}
            </router-link>
          </li>
          <li>{{$t('block.previous')}}：{{block.previous}}</li>
          <li>{{$t('block.transactions')}}：{{block.transactions.length}}</li>
        </ul>
        <div class="table-responsive" v-for="(transaction,i) in block.transactions">
          <Operation v-if="block" v-for="(operation,index) in transaction.operations" :key="index" :id="index" :operation="operation" :txid="block.transaction_ids[i]"></Operation>
        </div>
      </div>
    </div>

    <!--翻页-->
    <div class="pager" v-if="block&&block.block_id">
      <button @click="goPrev" class="btn btn-default pull-left">
        <span class="fa fa-angle-left"></span>
      </button>
      <button @click="goNext" class="btn btn-default pull-right">
        <span class="fa fa-angle-right"></span>
      </button>
    </div>

    <!--区块json-->
    <json v-if="block&&block.block_id" :json="block"></json>
    <div v-else>
      <h4 class="page-header">{{$t('block.title')}}</h4>
      <p class="null-tip">{{$t('block.empty')}}</p>
    </div>


  </div>
</template>

<script>
  import {Apis} from 'gxbjs-ws'
  import {mapGetters, mapActions} from 'vuex'
  import {fetch_block,fetch_account} from '@/services/CommonService'
  import JSON from './partial/JSON.vue'
  import Operation from './partial/Operation.vue'

  export default {
    data() {
      return {
        block: null,
        account_name: null,
      }
    },
    methods: {
      ...mapActions({
        setKeywords: 'setKeywords'
      }),

      fetch_block() {
        let self = this;
        this.block = null;
        fetch_block(this.$route.params.block_height).then(function (resp) {
          self.block = resp.body;
          Apis.instance().db_api().exec("get_objects", [[self.block.witness]]).then((res)=>{
            fetch_account(res[0].witness_account).then(function (res) {
              self.account_name = res.body.name;
            }).catch(ex => {
              console.error(ex);
            })
          })
        }, function () {
          self.block = {error: this.$t('block.error')};
        })
      },

      goNext() {
        this.setKeywords({keywords: parseInt(this.$route.params.block_height) + 1});
      },

      goPrev() {
        this.setKeywords({keywords: parseInt(this.$route.params.block_height) - 1});
      }

    },
    computed: {
      ...mapGetters({
        keywords: 'keywords'
      })
    },
    watch: {
      keywords() {
        this.fetch_block();
      }
    },
    components: {
      json: JSON,
      Operation: Operation
    },
    mounted() {
      if (this.$route.params.block_height != this.keywords) {
        this.setKeywords({keywords: this.$route.params.block_height})
      }
      this.fetch_block()
    }
  }
</script>

<style scoped>
  .block-summary {
    margin-top: 15px;
  }
</style>
