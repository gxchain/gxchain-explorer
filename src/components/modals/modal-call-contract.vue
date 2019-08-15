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
                    <code>{{contract}}.{{method}}</code>
                    <hr>
                    <form @submit="checkForm">
                        <div :class="{'form-group':f.type != 'bool','checkbox':f.type == 'bool'}" v-for="f in fields">
                            <label v-if="f.type != 'bool'">{{f.name}}</label>
                            <input v-if="f.type != 'bool'" type="text" class="form-control" v-model="f.value">
                            <label v-if="f.type == 'bool'">
                                <input type="checkbox"/> {{f.name}}
                            </label>
                        </div>
                        <button type="submit" :class="{disabled: submitting}" class="btn btn-default">
                            {{submitting?'Submitting...':'Submit'}}
                        </button>
                    </form>
                    <hr/>
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
                submitting: false,
                result: ''
            };
        },
        computed: {
            ...mapGetters({
                gxc: 'gxc'
            })
        },
        methods: {
            checkForm (e) {
                e.preventDefault();
                this.submitting = true;
                let params = {};
                this.fields.forEach(f => {
                    params[f.name] = f.value;
                });
                this.gxc.callContract(this.contract, this.method, params, this.payable ? '10 GXC' : '', true).then((resp) => {
                    this.result = JSON.stringify(resp, null, '  ');
                    this.submitting = false;
                }).catch(ex => {
                    this.result = JSON.stringify(ex, null, '  ');
                    this.submitting = false;
                });
            }
        }
    };
</script>
