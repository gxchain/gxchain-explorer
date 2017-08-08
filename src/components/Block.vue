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
            <router-link :to="{path:'/account/'+getWitnessAccountName(block.witness)}">
              {{getWitnessAccountName(block.witness)}}
            </router-link>
          </li>
          <li>{{$t('block.previous')}}：{{block.previous}}</li>
          <li>{{$t('block.transactions')}}：{{block.transactions.length}}</li>
        </ul>
        <div class="table-responsive">
          <table class="table table-hover table-bordered no-margin">
            <tbody>
            <tr v-for="(transaction,i) in block.transaction_ids">
              <td>{{i + 1}}</td>
              <td align="right">
                <router-link :to="{path:'/transaction/'+transaction}">{{transaction}}</router-link>
              </td>
            </tr>
            </tbody>
          </table>
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
  import {mapGetters, mapActions} from 'vuex'
  import {fetch_block} from '@/services/CommonService'
  import JSON from './partial/JSON.vue'
  import {ChainStore} from 'gxbjs/es'

  export default {
    data() {
      return {
        block: null
      }
    },
    methods: {

      ...mapActions({
        setKeywords: 'setKeywords'
      }),

      fetch_block() {
        let self = this;
        fetch_block(this.$route.params.block_height).then(function (resp) {
          self.block = resp.body;
        }, function () {
          self.block = {error: this.$t('block.error')};
        })
      },

      getWitnessAccountName(witness) {
        if (ChainStore.getObject(witness) && ChainStore.getObject(ChainStore.getObject(witness).get('witness_account'))) {
          return ChainStore.getObject(ChainStore.getObject(witness).get('witness_account')).get('name');
        }
        return null;
      },

      goNext() {
        this.setKeywords({keywords: parseInt(this.$route.params.block_height) + 1});
      },

      goPrev() {
        this.setKeywords({keywords: parseInt(this.$route.params.block_height) - 1});
      },

      onUpdate() {

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
      json: JSON
    },
    destroyed() {
      ChainStore.unsubscribe(this.onUpdate);
    },
    mounted() {
      if (this.$route.params.block_height != this.keywords) {
        this.setKeywords({keywords: this.$route.params.block_height})
      }
      this.fetch_block();
      ChainStore.subscribe(this.onUpdate);
    }
  }
</script>

<style scoped>

  .block-summary {
    margin-top: 15px;
  }
</style>
