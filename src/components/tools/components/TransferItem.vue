<template>
     <tr :class="transferColor[data.status]" v-show="!data.hide">
        <td class="text-center">{{data['Account']}}</td>
        <td class="text-center">{{data['Amount']}}</td>
        <td class="text-center">{{data['Asset']}}</td>
        <td class="text-center">{{data['Memo']}}</td>
        <td class="text-left" style="width:38%;"v-if="running">
            <span class="txid-status" v-if="data.status == 'processing' && data.Txid">
                <button type="button" class="btn btn-primary btn-xs" v-if="countDown<=0"><i class="fas fa-spinner" :class="{'loading-animate':transferLoading}"></i></button>
                <button type="button" class="btn btn-primary btn-xs" v-else><i class="far fa-clock"></i> {{countDown}}s </button>
                <span>Txid: {{data.Txid}}</span>
            </span>
            <span v-else-if="data.status == 'fail'" 
                @mouseover="funPopover(index,'show')" 
                @mouseleave="funPopover(index,'hide')">
                <a tabindex="0" class="btn btn-xs btn-danger" :class="'popover-toggle-'+index" role="button" data-toggle="popover" data-trigger="focus" data-placement="left"  :data-content="data.Mssage">{{$t('tools.bulk_transfer.fail')}} <i class="fas fa-question-circle"></i></a>
            </span>
            <span v-else-if="data.status == 'success'" class="txid-status" >
                <button type="button" class="btn btn-success btn-xs">{{$t('tools.bulk_transfer.success')}}</button>
                <span>
                    Txid: <a target="_blank" :href="'#/transaction/'+data.Txid">{{data.Txid}}</a>
                </span>
            </span>
            <span v-else>
                <div class="text-center loading-animate"><i class="fas fa-spinner"></i></div>
            </span>
        </td>
    </tr>
</template>
<script>
import { fetch_transaction } from '@/services/CommonService';
const TRANSFER_MAX_NUM = 3;
export default {
    props: {
        running: {
            type: Boolean,
            default: false
        },
        index: '',
        data: {}
    },
    data () {
        return {
            transferColor: {
                success: 'success',
                processing: 'warning',
                fail: 'danger'
            },
            countDown: 5,
            timer: null,
            transaction: {},
            transferNum: 0,
            transferLoading: false
        };
    },
    watch: {
        'data.status': {
            handler (val) {
                if (val === 'processing') {
                    this.funCountDown();
                }
            },
            deep: true
        }
    },
    methods: {
        get_transaction () {
            if (!this.data.Txid || this.data.status !== 'processing') return;
            this.transferNum++;
            this.transferLoading = true;
            fetch_transaction(this.data.Txid).then(res => {
                this.transaction = res.body;
                if (this.transaction) {
                    if (this.transaction.current_block_number) {
                        this.$emit('onSuccess', this.index);
                        this.$emit('onExecuteEnd');
                    } else if (this.transferNum < TRANSFER_MAX_NUM) {
                        setTimeout(() => {
                            this.get_transaction();
                        }, 3000);
                    } else {
                        this.$emit('onExecuteEnd');
                        this.transferLoading = false;
                    }
                }
            }).catch(ex => {
                if (this.transferNum < TRANSFER_MAX_NUM) {
                    setTimeout(() => {
                        this.get_transaction();
                    }, 3000);
                } else {
                    this.$emit('onExecuteEnd');
                }
                console.log(ex);
            });
        },
        get_transaction_outside () {
            this.transferNum = 0;
            this.get_transaction();
        },
        funPopover (index, type) {
            $('.popover-toggle-' + index).popover(type);
        },
        funCountDown () {
            this.countDown--;
            if (this.countDown <= 0) {
                this.get_transaction();
                this.removeTimer();
                return;
            }
            this.timer = setTimeout(() => {
                this.funCountDown();
            }, 1000);
        },
        removeTimer () {
            clearTimeout(this.timer);
            this.timer = null;
        }
    },
    beforeDestroy () {
        this.removeTimer();
    }
};
</script>
<style lang="less" scoped>
.txid-status {
  display: flex;
  align-self: center;
  span {
    margin-left: 5px;
  }
}
.loading-animate {
  -webkit-animation: loadingLoop 1s linear infinite;
  animation: loadingLoop 1s linear infinite;
}
@keyframes loadingLoop {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  50% {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
