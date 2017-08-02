<template>
  <div class="modal fade" tabindex="-1" role="dialog" id="modal-api">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">API说明</h4>
        </div>
        <div class="modal-body">
          <div v-for="(api,i) in apis">
            <h4>{{i+1}}. {{api.name}}&nbsp;&nbsp;{{api.api}}</h4>
            <pre>{{api.example}}<a class="try" :href="api.example" target="_blance">Try</a></pre>
          </div>
        </div>
        </div>
      </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
  </div><!-- /.modal -->
</template>
<script>
  export default{
    data(){
      return {
        apis:[
          {name:'区块查询',api:'/api/block/:block_height',example:`http://${location.host}/api/block/1050`},
          {name:'交易查询',api:'/api/transaction/:tx_id',example:`http://${location.host}/api/transaction/b2b475aebc61e2b7247f3aae9d3ed55c07ca4533`},
          {name:'账户查询',api:'/api/account/:id_or_name',example:`http://${location.host}/api/account/gxb123`},
          {name:'余额查询',api:'/api/account_balance/:id_or_name',example:`http://${location.host}/api/account_balance/gxb123`},
        ]
      }
    }
  }
</script>
<style scoped>
  .try{
    float: right;
  }
</style>
