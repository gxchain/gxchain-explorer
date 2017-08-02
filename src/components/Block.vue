<template>
  <div class="container">
    <h4 class="page-header">区块信息<small class="pull-right"><a v-if="block&&block.block_id" target="_blank" :href="'https://wallet.gxb.io/#/block/'+keywords">更多</a></small></h4>
    <pre v-if="block&&block.block_id">{{JSON.stringify(block, null, '\t')}}</pre>
    <p v-else class="null-tip">未查到区块信息</p>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import {fetch_block} from '@/services/CommonService'

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
      fetch_block(){
        let self = this;
        fetch_block(this.$route.params.block_height).then(function (resp) {
          self.block = resp.body;
        }, function () {
          self.block = {error:'获取失败'};
        })
      }
    },
    computed: {
      ...mapGetters({
        keywords: 'keywords'
      })
    },
    watch:{
      keywords(){
        this.fetch_block();
      }
    },
    mounted() {
      if (this.$route.params.block_height != this.keywords) {
        this.setKeywords({keywords: this.$route.params.block_height})
      }
      this.fetch_block();
    }
  }
</script>

<style scoped>

</style>
