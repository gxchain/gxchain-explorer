<template>
    <div class="modal fade" tabindex="-1" role="dialog" id="modal-call">
        <div class="modal-dialog modal-md" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">{{$t('contract.title')}}</h4>
                </div>
                <div class="modal-body">
                    <h3 class="page-header">{{$t('contract.method')}}</h3>
                    <code>{{contract}}.{{method}}</code>
                    <h3 v-if="payable" class="page-header">{{$t('contract.payable_asset')}}</h3>
                    <amount-asset v-if="payable" :assets="assets" @assetChanged="assetChanged"></amount-asset>
                    <h3 class="page-header" v-if="fields.length>0">{{$t('contract.params')}}</h3>
                    <form @submit="submit">
                        <div :class="{'form-group':f.type != 'bool','checkbox':f.type == 'bool'}"
                             v-for="(f,index) in fields">
                            <label v-if="f.type != 'bool'">{{f.name}}</label>
                            <input v-if="f.type != 'bool' && f.type !='contract_asset'" type="text" class="form-control"
                                   v-model="f.value">
                            <label v-if="f.type == 'bool'">
                                <input type="checkbox"/> {{f.name}}
                            </label>
                            <amount-asset v-if="f.type =='contract_asset'"
                                          :assets="assets"
                                          @assetChanged="(a)=>fieldAssetChanged(f,a)">
                            </amount-asset>
                        </div>
                        <hr/>
                        <button type="submit" :class="{disabled: submitting}" class="btn btn-default">
                            {{submitting?'Submitting...':'Submit'}}
                        </button>
                    </form>
                    <h3 v-if="result" class="page-header">{{$t('contract.output')}}</h3>
                    <div class="row" v-if="result">
                        <div class="col-md-12">
                            <pre>{{result}}</pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import AmountAsset from '../partial/AssetAmount';
    import { mapGetters } from 'vuex';

    export default {
        props: {
            contract: String,
            method: String,
            payable: Boolean,
            fields: Array
        },
        data () {
            return {
                asset: {
                    amount: 0,
                    symbol: 'GXC'
                },
                assets: [],
                submitting: false,
                result: ''
            };
        },
        mounted () {
            this.$http.get('/api/assets').then(resp => {
                this.assets = resp.body;
            });
        },
        computed: {
            ...mapGetters({
                gxc: 'gxc'
            })
        },
        methods: {
            submit (e) {
                e.preventDefault();
                this.submitting = true;
                let params = {};
                this.fields.forEach(f => {
                    params[f.name] = f.value;
                });
                let assetAmount = '';
                if (this.payable) {
                    assetAmount = `${this.asset.amount} ${this.asset.symbol}`;
                }
                this.gxc.callContract(this.contract, this.method, params, this.payable ? assetAmount : '', true).then((resp) => {
                    this.result = JSON.stringify(resp, null, '  ');
                    this.submitting = false;
                }).catch(ex => {
                    this.result = JSON.stringify(ex, null, '  ');
                    this.submitting = false;
                });
            },
            assetChanged (asset) {
                this.asset.amount = asset.amount;
                this.asset.symbol = asset.symbol;
            },
            fieldAssetChanged (filed, asset) {
                filed.value = {
                    asset_id: Number(asset.id.split('.')[2]),
                    amount: Math.floor(Math.pow(10, asset.precision) * asset.amount)
                };
            }
        },
        components: {
            AmountAsset
        }
    };
</script>
<style scoped>
    .page-header {
        margin-top: 10px;
    }
</style>
