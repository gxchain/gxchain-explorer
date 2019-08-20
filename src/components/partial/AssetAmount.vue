<template>
    <div class="input-group">
        <input class="form-control" @change="assetChanged" type="text" v-model="amount"/>
        <div class="input-group-btn">
            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true"
                    aria-expanded="false">{{symbol}} <span class="caret"></span></button>
            <select v-model="symbol" @change="assetChanged" class="transparent">
                <option v-for="asset in assets" :key="asset.symbol" :value="asset.symbol">{{asset.symbol}}</option>
            </select>
        </div>
    </div>

</template>

<script>
    export default {
        props: {
            assets: Array
        },
        data () {
            return {
                symbol: 'GXC',
                amount: 0
            };
        },
        methods: {
            assetChanged (e) {
                let selected_asset = this.assets.find(a => a.symbol === this.symbol);
                this.$emit('assetChanged', {
                    symbol: this.symbol,
                    amount: this.amount,
                    id: selected_asset.id,
                    precision: selected_asset.precision
                });
            }
        }
    };
</script>

<style scoped>
    .transparent {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 2;
        opacity: 0;
    }
</style>
