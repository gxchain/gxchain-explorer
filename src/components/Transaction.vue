<template>
    <div class="container">
        <Loading v-show="loading"></Loading>
        <div class="row" v-if="transaction&&transaction.current_block_number" v-show="!loading">
            <div class="col-md-12">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <span class="fa fa-exchange">&nbsp;{{$t('transaction.title')}}</span>
                    </div>
                    <div class="panel-body no-padding">
                        <div class="table-responsive">
                            <table class="table table-striped no-margin">
                                <tbody>
                                <tr>
                                    <th>{{$t('transaction.current_block_number')}}</th>
                                    <td align="right">
                                        <router-link :to="{path:'/block/' + transaction.current_block_number}">
                                            {{transaction.current_block_number}}
                                        </router-link>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Operation v-if="transaction&&transaction.current_block_number"
                       v-for="(operation,index) in transaction.operations" :key="index" :id="index"
                       :operation="operation"></Operation>
        </div>

        <json v-if="transaction&&transaction.current_block_number" :json="transaction" v-show="!loading"></json>

        <div v-if="!transaction||!transaction.current_block_number" v-show="!loading">
            <h4 class="page-header">{{$t('transaction.title')}}</h4>
            <p class="null-tip">{{transaction.error || $t('transaction.empty')}}</p>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import { fetch_transaction } from '@/services/CommonService';
    import JSON from './partial/JSON.vue';
    import Operation from './partial/Operation.vue';

    export default {
        data () {
            return {
                loading: true,
                transaction: {}
            };
        },
        methods: {
            ...mapActions({
                setKeywords: 'setKeywords'
            }),
            fetch_transaction () {
                let self = this;
                this.transaction = {};
                fetch_transaction(this.$route.params.tx_id).then(function (resp) {
                    self.transaction = resp.body;
                    self.loading = false;
                }).catch(() => {
                    self.transaction = {error: this.$t('transaction.error')};
                    self.loading = false;
                });
            }
        },
        computed: {
            ...mapGetters({
                keywords: 'keywords'
            })
        },
        watch: {
            keywords () {
                this.loading = true;
                this.fetch_transaction();
            }
        },
        components: {
            json: JSON,
            Operation: Operation
        },
        mounted () {
            if (this.$route.params.tx_id !== this.keywords) {
                this.setKeywords({keywords: this.$route.params.tx_id});
            }
            this.fetch_transaction();
        }
    };
</script>

<style scoped>

</style>
