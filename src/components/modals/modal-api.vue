<template>
    <div class="modal fade" tabindex="-1" role="dialog" id="modal-api">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">{{$t('api.title')}}</h4>
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
        computed: {
            apis () {
                return [
                    {
                        name: this.$t('api.query_supply'),
                        api: '/api/supply',
                        example: `http://${location.host}/api/supply`
                    },
                    {
                        name: this.$t('api.query_block'),
                        api: '/api/block/:block_height',
                        example: `http://${location.host}/api/block/1407251`
                    },
                    {
                        name: this.$t('api.query_transaction'),
                        api: '/api/transaction/:tx_id',
                        example: `http://${location.host}/api/transaction/69ce90cdb52189dee863d2bcf6ce153d89657295`
                    },
                    {
                        name: this.$t('api.query_account'),
                        api: '/api/account/:id_or_name',
                        example: `http://${location.host}/api/account/paul`
                    },
                    {
                        name: this.$t('api.query_account_balance'),
                        api: '/api/account_balance/:id_or_name',
                        example: `http://${location.host}/api/account_balance/paul`
                    },
                    {
                        name: this.$t('api.get_account_header'),
                        api: '/api/header/:account_name',
                        example: `http://${location.host}/api/header/paul`
                    }
                ];
            }
        }
    };
</script>
<style scoped>
    .try {
        float: right;
    }
</style>
