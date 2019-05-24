<template>
    <div id="app">
        <v-header></v-header>
        <div class="main-container">
            <div class="text-center" v-if="keywords">
                <div id="seg" class="btn-group btn-group-lg" role="group">
                    <router-link :to="{path:'/block/'+keywords}" class="btn btn-default">{{$t('header.block')}}
                    </router-link>
                    <router-link :to="{path:'/transaction/'+keywords}" class="btn btn-default">
                        {{$t('header.transaction')}}
                    </router-link>
                    <router-link :to="{path:'/account/'+keywords}" class="btn btn-default">{{$t('header.account')}}
                    </router-link>
                    <router-link :to="{path:'/asset/'+keywords}" class="btn btn-default">{{$t('header.asset')}}
                    </router-link>
                </div>
            </div>
            <router-view></router-view>
        </div>
        <modal-api></modal-api>
        <modal-about></modal-about>
        <v-footer></v-footer>
    </div>
</template>

<script>
    import 'bootstrap';
    import 'bootstrap/dist/css/bootstrap.css';
    import './global.css';
    import modalApi from './components/modals/modal-api.vue';
    import modalAbout from './components/modals/modal-about.vue';
    import header from './components/partial/Header.vue';
    import footer from './components/partial/Footer.vue';
    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: 'app',
        computed: {
            ...mapGetters({
                keywords: 'keywords'
            })
        },
        watch: {
            keywords () {
                this.keywordsChanged();
            }
        },
        created () {
            this.$http.get('//static.gxb.io/gxs/symbols/maps.json?v=' + new Date().getTime()).then(resp => {
                this.setSymbolsMap({symbolsMap: resp.body || {}});
            }).catch(ex => { console.error(ex) });
        },
        methods: {
            ...mapActions({
                setSymbolsMap: 'setSymbolsMap'
            }),
            keywordsChanged () {
                if (!this.keywords) {
                    if (this.$route.name !== 'Holdrank') {
                        this.$router.push('/');
                    }
                } else if (/^\d+$/.test(this.keywords)) { // block
                    this.$router.push(`/block/${this.keywords}`);
                } else if (this.keywords.length === 40) { // transaction
                    this.$router.push(`/transaction/${this.keywords}`);
                } else if (/^1.3.\d+$/.test(this.keywords) || (this.keywords.charCodeAt(0) <= 'Z'.charCodeAt(0) && this.keywords.charCodeAt(0) >= 'A'.charCodeAt(0))) { // account
                    this.$router.push(`/asset/${this.keywords}`);
                } else { // account
                    this.$router.push(`/account/${this.keywords}`);
                }
            }
        },
        components: {
            vHeader: header,
            vFooter: footer,
            modalApi,
            modalAbout
        }
    };
</script>

<style scoped>
    #seg {
        margin: 20px 10px;
    }

    .router-link-active {
        border-color: #3c4463 !important;
        background: #3c4463 !important;;
        color: #fff !important;;
    }
</style>
