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
    import modalApi from './components/modals/modal-api.vue';
    import modalAbout from './components/modals/modal-about.vue';
    import header from './components/partial/Header.vue';
    import footer from './components/partial/Footer.vue';
    import { mapGetters } from 'vuex';

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
        methods: {
            keywordsChanged () {
                if (!this.keywords) {
                    if (this.$route.name !== 'Holdrank') {
                        this.$router.push('/');
                    }
                } else if (/^\d+$/.test(this.keywords)) { // block
                    this.$router.push(`/block/${this.keywords}`);
                } else if (this.keywords.length === 40) { // transaction
                    this.$router.push(`/transaction/${this.keywords}`);
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
        border-color: #008fcd !important;
        background: #008fcd !important;;
        color: #fff !important;;
    }
</style>

<style>
    .no-padding {
        padding: 0 !important;
    }

    .no-margin {
        margin: 0 !important;
    }
</style>
