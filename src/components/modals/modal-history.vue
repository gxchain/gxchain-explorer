<template>
    <div class="modal fade" tabindex="-1" role="dialog" id="modal-history">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">{{$t('index.transactions.title')}}</h4>
                </div>
                <div class="modal-body">
                    <Loading v-show="history_loading"></Loading>
                        <div class="table-responsive">
                            <table class="table table-striped table-bordered no-margin" v-show="!history_loading">
                                <thead>
                                <tr>
                                    <th>{{$t('index.transactions.type')}}</th>
                                    <th>{{$t('index.transactions.content')}}</th>
                                    <th class="right" width="80">{{$t('index.transactions.time')}}</th>
                                </tr>
                                </thead>
                                <history-op :latestTransactions="latestTransactions" parent="Account"></history-op>
                            </table>
                            <div class="pagination-box">
                                <pagination :pagination="pagination" :callback="loadData" :options="paginationOptions"></pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </div> <!-- /.modal-content -->
        </div> <!-- /.modal-dialog -->
    </div> <!-- /.modal -->
</template>
<script>
import pagination from 'vue-bootstrap-pagination';
import HistoryOp from '@/components/partial/HistoryOp.vue';
import { fetch_account_history } from '@/services/CommonService';

export default {
    props: {
        account: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            history_loading: true,
            latestTransactions: [],
            pagination: {
                per_page: 10, // required
                current_page: 1, // required
                last_page: 0 // required
            },
            paginationOptions: {
                offset: 5,
                previousText: 'Prev',
                nextText: 'Next',
                alwaysShowPrevNext: true
            }
        };
    },
    watch: {
        account (newVal, oldVal) {
            if (!oldVal) return; // 防止页面刷新，触发2次loadData调用
            this.pagination.per_page = 10;
            this.pagination.current_page = 1;
            this.pagination.last_page = 0;
            this.loadData();
        }
    },
    mounted () {
        this.loadData();
    },
    methods: {
        loadData () {
            this.history_loading = true;
            fetch_account_history(this.account, this.pagination.current_page, this.pagination.per_page).then(res => {
                const respList = res.body.list || [];
                const list = [];
                this.pagination.last_page = Math.ceil(res.body.totalCount / this.pagination.per_page);
                for (let i = 0; i < respList.length; i++) {
                    const item = [];
                    item[0] = respList[i].operation_type;
                    item[1] = respList[i].operation_history.op_object;
                    if (item[1].hasOwnProperty('fee')) {
                        item[1].fee.amount = item[1].fee.amount_str;
                    }
                    if (item[1].hasOwnProperty('amount_')) {
                        item[1].amount_.amount = item[1].amount_.amount_str;
                        item[1].amount = item[1].amount_;
                    }
                    if (item[1].hasOwnProperty('memo_')) {
                        item[1].memo = item[1].memo_;
                    }
                    if (item[1].hasOwnProperty('proposed_ops_str')) {
                        item[1].proposed_ops = JSON.parse(item[1].proposed_ops_str);
                    }
                    if (item[1].hasOwnProperty('request_params')) {
                        if (item[1].request_params.hasOwnProperty('amount_')) {
                            item[1].request_params.amount_.amount = item[1].request_params.amount_.amount_str;
                            item[1].request_params.amount = item[1].request_params.amount_;
                        }
                    }
                    item['block_id'] = respList[i].block_data.block_num;
                    item['timestamp'] = new Date(respList[i].block_data.block_time + 'Z').format('yyyy-MM-dd hh:mm:ss');
                    list.push(item);
                }
                this.latestTransactions = list;
                this.history_loading = false;
            }).catch((ex) => {
                console.error(ex);
                this.history_loading = false;
            });
        }
    },
    components: {
        HistoryOp,
        pagination
    }
};
</script>
<style scoped>
.right {
  width: 80px;
}
.pagination-box {
  text-align: center;
}
</style>
