<template>
  <div class="modal fade" tabindex="-1" role="dialog" id="modal-api">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">API说明</h4>
        </div>
        <div class="modal-body">
          <div v-for="(api,i) in apis">
            <h4>{{i + 1}}. {{api.name}}&nbsp;&nbsp;{{api.api}}</h4>
            <pre>{{api.example}}<a class="try" :href="api.example" target="_blance">Try</a></pre>
          </div>
        </div>
      </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
  </div><!-- /.modal -->
</template>
<script>
  export default {
    data() {
      return {
        apis: [
          {
            name: '供应量查询',
            api: '/api/supply',
            example: `http://${location.host}/api/supply`
          },
          {
            name: '区块查询',
            api: '/api/block/:block_height',
            example: `http://${location.host}/api/block/1407251`
          },
          {
            name: '交易查询',
            api: '/api/transaction/:tx_id',
            example: `http://${location.host}/api/transaction/69ce90cdb52189dee863d2bcf6ce153d89657295`
          },
          {
            name: '账户查询',
            api: '/api/account/:id_or_name',
            example: `http://${location.host}/api/account/paul`
          },
          {
            name: '余额查询',
            api: '/api/account_balance/:id_or_name',
            example: `http://${location.host}/api/account_balance/paul`
          },
        ]
      }
    }
  }
</script>
<style scoped>
  .try {
    float: right;
  }
</style>
