<template>
     <tr :class="transferColor[data.status]">
        <td class="text-center">{{data['Account']}}</td>
        <td class="text-center">{{data['Amount']}}</td>
        <td class="text-center">{{data['Asset']}}</td>
        <td class="text-center">{{data['Memo']}}</td>
        <td class="text-right" style="width:30%;"v-if="running">
            <span class="txid-status" v-if="data.status == 'pending' && data.Txid">
                <button type="button" class="btn btn-primary btn-xs"><i class="far fa-clock"></i> {{countDown}}s </button>
                <span>Txid:{{data.Txid}}</span>
            </span>
            <span v-else-if="data.status == 'fail'" 
                @mouseover="funPopover(index,'show')" 
                @mouseleave="funPopover(index,'hide')">
                <a tabindex="0" class="btn btn-xs btn-danger" :class="'popover-toggle-'+index" role="button" data-toggle="popover" data-trigger="focus" data-placement="left"  :data-content="data.Mssage">转账失败 <i class="fas fa-question-circle"></i></a>
            </span>
            <span v-else-if="data.status == 'success'" class="txid-status" >
                <button type="button" class="btn btn-success btn-xs">转账成功</button>
                <span>
                    Txid:<router-link :to="{path : '/transaction/'+data.Txid}">{{data.Txid}}</router-link>
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
                pending: 'warning',
                fail: 'danger'
            },
            countDown: 45,
            timer: null,
            transaction: {},
            transferNum: 0
        };
    },
    watch: {
        'running': function (val) {
            if (val) {
                this.funCountDown();
            } else {
                this.removeTimer();
            }
        }
    },
    methods: {
        funPopover (index, type) {
            $('.popover-toggle-' + index).popover(type);
        },
        funCountDown () {
            this.countDown--;
            if (this.countDown === 0) {
                this.get_transaction();
                return;
            }
            this.timer = setTimeout(() => {
                this.funCountDown();
            }, 1000);
        },
        get_transaction () {
            if (!this.data.Txid || this.data.status !== 'pending') return;
            this.transferNum++;
            fetch_transaction(this.data.Txid).then(res => {
                this.transaction = res.body;
                if (this.transaction) {
                    // setTimeout(() => {
                    //     this.$emit('onSuccess', this.index);
                    // }, 5000);
                    if (this.transaction.current_block_number) {
                        this.$emit('onSuccess', this.index);
                    } else if (this.transferNum < TRANSFER_MAX_NUM) {
                        setTimeout(() => {
                            this.get_transaction();
                        }, 3000);
                    }
                }
            }).catch(ex => {
                console.log(ex);
            });
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
