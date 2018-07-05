<template>
    <div class="container">
        <Loading v-show="loading"></Loading>
        <div class="row" v-if="asset&&asset.id" v-show="!loading">
            <h3 class="page-header">{{asset.symbol}}-{{asset.id}}</h3>
            <p>{{asset.options.description&&JSON.parse(asset.options.description).main}}</p>

            <div class="table-responsive">
                <table class="table table-striped table-bordered no-margin">
                    <tbody>
                    <tr>
                        <th>
                            {{$t('asset.issuer')}}
                        </th>
                        <td>
                            <router-link :to="{path:'/account/'+asset.issuer.name}">
                                {{asset.issuer.name}}
                            </router-link>
                        </td>
                        <th>{{$t('asset.precision')}}</th>
                        <td>{{asset.precision}}</td>
                    </tr>
                    <tr>
                        <th>{{$t('asset.max_supply')}}</th>
                        <td>
                            {{asset.options.max_supply/Math.pow(10,asset.precision)|number(2)}}
                        </td>
                        <th>{{$t('asset.current_supply')}}</th>
                        <td>{{asset.detail.current_supply/Math.pow(10,asset.precision)|number(2)}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import filters from '../filters';

    export default {
        filters,
        data () {
            return {
                loading: true,
                asset: null
            };
        },
        methods: {
            ...mapActions({
                setKeywords: 'setKeywords'
            }),
            loadData () {
                this.$http.get(`/api/asset/${this.keywords.toUpperCase()}`).then(resp => {
                    let asset = resp.body;
                    this.asset = asset;
                    this.loading = false;
                });
            }
        },
        mounted () {
            if (this.$route.params.asset_name !== this.keywords) {
                this.setKeywords({keywords: this.$route.params.asset_name});
            }
            this.loadData();
        },
        watch: {
            keywords () {
                this.loading = true;
                this.asset = null;
                this.loadData();
            },
            '$route' () {
                if (this.$route.params.asset_name !== this.keywords) {
                    this.loading = true;
                    this.asset = null;
                    this.setKeywords({keywords: this.$route.params.asset_name});
                }
            }
        },
        computed: {

            ...mapGetters({
                keywords: 'keywords'
            })
        }
    };
</script>
