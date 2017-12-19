<template>
    <header class="site-header">
        <nav class="navbar navbar-static-top main-navbar" id="top">
            <div class="container">
                <div class="navbar-header">
                    <button class="navbar-toggle collapsed" type="button" data-toggle="collapse"
                            data-target="#bs-navbar"
                            aria-controls="bs-navbar" aria-expanded="false">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <router-link :to="{path:'/'}" class="navbar-brand">
                        <img height="28px" src="/static/logo-gxs.png" v-on:click="clearInput"/>
                    </router-link>
                </div>
                <nav id="bs-navbar" class="collapse navbar-collapse">
                    <ul class="nav navbar-nav navbar-right">
                        <li><a href="#modal-api" data-toggle="modal">API</a></li>
                        <li><router-link :to="{path:'/holdrank/1'}" @click.native="clearInput">排行</router-link></li>
                        <li><a href="#modal-about" data-toggle="modal">{{$t("header.about")}}</a></li>
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"
                               aria-haspopup="true"
                               aria-expanded="false"><img class="flagimg" :src="flagImg[$t('header.flag')]"><span
                                    class="caret"></span></a>
                            <ul class="dropdown-menu">
                                <li @click="switchLanguage('zh')"><a href="javascript:;"><img class="flagimg"
                                                                                              :src="flagImg['zh']">中文</a>
                                </li>
                                <li role="separator" class="divider"></li>
                                <li @click="switchLanguage('en')"><a href="javascript:;"><img class="flagimg"
                                                                                              :src="flagImg['en']">English</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </nav>
        <div class="container jumbotron">
            <div class="row">
                <div class="col-xs-12"><h1>{{$t('header.title')}}</h1>
                    <p>{{$t('header.subtitle')}}</p>
                    <div class="search-wraper" role="search">
                        <div class="form-group">
                            <input @change="eventChanged" v-model="search" class="form-control search clearable"
                                   :placeholder="$t('header.search')" autocomplete="off" autofocus=""
                                   tabindex="0" autocorrect="off" autocapitalize="off" spellcheck="false">
                            <i class="fa fa-search"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>

</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import { set_item } from '@/services/CommonService';

    export default {
        data () {
            return {
                search: '',
                flagImg: {
                    'zh': require('../../../static/language-dropdown/img/CN.png'),
                    'en': require('../../../static/language-dropdown/img/US.png')
                }
            };
        },
        computed: {
            ...mapGetters({
                keywords: 'keywords'
            })
        },
        watch: {
            'keywords' () {
                if (this.keywords !== this.search) {
                    this.search = this.keywords;
                }
            }
        },
        methods: {
            ...mapActions({
                setKeywords: 'setKeywords'
            }),
            eventChanged () {
                this.search = this.search.replace(/(^\s*)|(\s*$)/g, '');
                this.setKeywords({keywords: this.search});
            },
            switchLanguage (locale) {
                this._i18n.locale = locale;
                set_item('locale', locale);
            },
            clearInput () {
                this.setKeywords({keywords: ''});
            }
        }
    };
</script>

<style scoped>
    .site-header {
        position: relative;
        text-align: center;
        background-color: #1d8fcb;
        color: #fff;
        margin-bottom: 0
    }

    .main-navbar {
        margin-bottom: 0;
        background-color: transparent
    }

    .main-navbar a {
        color: #eee
    }

    .main-navbar a:hover {
        color: #fff
    }

    .main-navbar .nav > li > a:focus, .main-navbar .nav > li > a:hover {
        background-color: transparent
    }

    .main-navbar .nav .open > a,
    .main-navbar .nav .open > a:hover,
    .main-navbar .nav .open > a:focus {
        background: transparent;
    }

    .dropdown-menu > li > a:hover,
    .dropdown-menu > li > a:focus {
        color: #333;
    }

    .main-navbar .navbar-toggle .icon-bar {
        background-color: #fff
    }

    .main-navbar .navbar-brand {
        margin: 0;
        height: 30px;
        position: relative;
        top: -5px;
    }

    .jumbotron {
        background-color: transparent
    }

    .site-header h1 {
        font-size: 20px;
    }

    .site-header p {
        color: #f4f4f4;
        font-size: 15px;
    }

    @media screen and (min-width: 768px) {
        .site-header {
            padding-bottom: 50px;
            padding-top: 20px
        }

        .site-header .jumbotron {
            padding-top: 0
        }

        .site-header h1 {
            font-size: 56px;
            text-shadow: -5px 5px 0 rgba(0, 0, 0, .1)
        }

        .site-header p {
            color: #f4f4f4;
            font-size: 21px;
        }

        .dropdown-menu > li > a {
            color: #666;
        }
    }

    .site-header .fa {
        color: #a3a3a4;
        font-size: 16px
    }

    .site-header .fa-close, .site-header .fa-search {
        position: absolute;
        right: 10px;
        top: 18px
    }

    .site-header .form-group {
        position: relative
    }

    .site-header .search-wraper {
        max-width: 680px;
        margin: 30px auto 20px;
    }

    .site-header .search {
        -webkit-box-shadow: none;
        box-shadow: none;
        font-size: 16px;
        padding: 13px 30px;
        border-radius: 0;
        height: auto;
        text-align: center;
        border-color: transparent
    }

    .site-header .search::-ms-clear {
        display: none
    }

    .site-header .search:focus {
        -webkit-box-shadow: 0 0 6px rgba(0, 0, 0, .6);
        box-shadow: 0 0 6px rgba(0, 0, 0, .6)
    }

    .site-header .search + .fa.onX {
        cursor: pointer
    }

    .site-header span {
        font-size: 14px
    }

    .flagimg {
        width: 20px;
        margin-right: 10px;
    }
</style>
