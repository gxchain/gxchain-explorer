<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <bread-box :breadList="breadList"></bread-box>
                <hr>
                <pre>{{key}}<a class="pull-right" @click='generate'>{{$t("tools.key_gen.gen")}}</a></pre>
            </div>
        </div>
    </div>
</template>
<script>
import BreadBox from './components/BreadBox';
import { mapGetters } from 'vuex';
export default {
    components: {
        BreadBox
    },
    data () {
        return {
            loading: true,
            key: '',
            breadList: [
                {
                    key: 'tools.title',
                    path: '/tools/index'
                },
                {
                    key: 'tools.key_gen.title',
                    path: '/tools/key-gen'
                }
            ]
        };
    },
    computed: {
        ...mapGetters({
            gxc: 'gxc',
            account: 'account'
        }),
        'processingNum': function () {
            return this.running ? this.recordNum - this.executeNum.success - this.executeNum.fail : 0;
        }
    },
    methods: {
        generate () {
            this.gxc.generateKey().then(resp => {
                this.key = JSON.stringify(resp, null, ' ');
            });
        }
    }
};
</script>
<style scoped lang="less">
</style>
