<style scoped>
    #seg {
        margin: 20px 10px;
    }

    .router-link-active {
        border-color: #008fcd !important;
        background: #008fcd !important;;
        color: #fff !important;;
    }

    .close{
        line-height: 13px;
    }

    .title td{
        font-weight: 500;
    }

    tbody tr td{
        vertical-align: middle;
    }
</style>

<template>
    <div class="container">
       <Loading v-show="loading"/>
       <div class="row" v-show="!loading">
            <div class="col-md-12">
                <hr/>
                
                <div class="panel-body no-padding table-responsive">
                    <table class="table table-striped table-bordered no-margin">
                        <tbody>
                            <tr>
                                <td>操作</td>
                                <td>手续费类型</td>
                                <td>标准手续费</td>
                                <td>终身会员手续费</td>
                            </tr>

                            <tr>
                                <td rowspan="3" class="text-center">创建账户</td>
                                <td>普通用户名手续费</td>
                                <td>-*</td>
                                <td>0.0002 GXC</td>
                            </tr>

                            <tr>
                                <td>高级用户名手续费</td>
                                <td>-*</td>
                                <td>0.2 GXC</td>
                            </tr>

                            <tr>
                                <td>交易字节数，每千字节手续费</td>
                                <td>-*</td>
                                <td>0.00004 GXC</td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ChainStore } from 'gxbjs';
import { ChainTypes } from 'gxbjs/es';

let ops = Object.keys(ChainTypes.operations);

let fee_grouping = {
    asset: [10, 11, 14],
    account: [5, 6, 7, 8, 9],
    business: [20, 21, 22, 23, 24, 29, 30, 31, 34, 35, 36]
};

let op_ids = [11, 14, 5, 6, 7, 8, 9, 20, 21, 22, 23, 24, 29, 30, 31, 34, 35, 36];

let ltm_required = [5, 7, 20, 21, 34];

export default {
    data () {
        return {
            loading: true,
            item: {},
            asset: {},
            ChainStore
        };
    },
    computed: {},
    mounted () {
        this.getInfo();
    },
    destroyed () {},
    methods: {
        getInfo: function () {
            let self = this;
            let global_object = ChainStore.getObject('2.0.0').toJS();
            let current_fees = global_object.parameters.current_fees;
            let scale = current_fees.scale;
            let fees_raw = current_fees.parameters;

            let fees = fees_raw.map((fee_struct) => {
                let op_id = fee_struct[0];
                if (op_ids.includes(op_id)) {
                    let operation_name = ops[op_id];
                    let fee_name = self.$t('fee.trxTypes')[operation_name];
                    let fee = fee_struct[1];
                    console.log('hhhh', fee_struct);
                    console.log('fee_name:', fee_name);
                    let rows = [];
                    let headIncluded = false;
                    for (let key in fee) {
                        let amount = fee[key] * scale / 1e4;
                        let feeTypes = self.$t('fee.feeTypes');
                        let assetAmount = amount ? amount / 100000 : feeTypes['_none'];
                        let assetAmountLTM = amount * 0.2 ? amount * 0.2 / 100000 : feeTypes['_none'];
                        console.log(assetAmount);
                        console.log(assetAmountLTM);

                        let title = null;

                        if (!headIncluded) {
                            headIncluded = true;
                            title = '<td rowSpan=' + 6 + '>{fee_name}</td>';
                        }

                        if (ltm_required.indexOf(op_id) < 0) {
                            rows.push('<tr>
                                    {title}
                                    <td>{feeTypes[key]}</td>
                                    <td>{assetAmount}</td>
                                    <td>{assetAmountLTM}</td>
                                </tr>');
                        } else {
                            rows.push('
                                <tr>
                                    {title}
                                    <td>{feeTypes[key]}</td>
                                    <td>-*</td>
                                    <td>{assetAmountLTM}</td>
                                </tr>'
                            );
                        }
                    }
                }
            });
            console.log(fees);
            console.log(ltm_required);
            console.log(fee_grouping);
            self.loading = false;
        }
    }
};
</script>
