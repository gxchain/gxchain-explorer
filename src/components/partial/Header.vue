<template>
  <header class="site-header">
    <nav class="navbar navbar-static-top main-navbar" id="top">
      <div class="container">
        <div class="navbar-header">
          <button
            class="navbar-toggle collapsed"
            type="button"
            data-toggle="collapse"
            data-target="#bs-navbar"
            aria-controls="bs-navbar"
            aria-expanded="false"
          >
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <!--<router-link :to="{path:'/'}" class="navbar-brand">-->
          <!--<img height="28.5px" src="/static/exploer-logo.png" v-on:click="clearInput"/>-->
          <!--</router-link>-->
        </div>
        <nav id="bs-navbar" class="collapse navbar-collapse">
          <ul class="nav navbar-nav navbar-right">
            <li>
              <a href="/#/">{{ $t('header.home') }}</a>
            </li>
            <li class="dropdown" v-if="account && account.name">
              <a
                href="#"
                class="dropdown-toggle"
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <account-image :size="8" :account="account.name"></account-image
                >&nbsp;{{ account.name }}
                <span class="caret"></span>
              </a>
              <ul class="dropdown-menu">
                <li>
                  <router-link :to="{ path: '/account/' + account.name }">
                    <i class="fa fa-user"></i>&nbsp;{{ $t('header.profile') }}
                  </router-link>
                </li>
                <li @click="logout">
                  <a href="#">
                    <i class="fa fa-sign-out-alt"></i>&nbsp;{{
                      $t('header.logout')
                    }}
                  </a>
                </li>
              </ul>
            </li>
            <li v-if="!(account && account.name)">
              <a href="javascript:;" @click="login">{{ $t('header.login') }}</a>
            </li>
            <li><a href="#modal-api" data-toggle="modal">API</a></li>
            <li>
              <router-link :to="{ path: '/tools/index' }">{{
                $t('header.tools')
              }}</router-link>
            </li>
            <li>
              <a href="/#/fee">{{ $t('header.fee') }}</a>
            </li>
            <li>
              <a href="/#/node_members">{{ $t('header.node_members') }}</a>
            </li>
            <li>
              <a href="#modal-about" data-toggle="modal">{{
                $t('header.about')
              }}</a>
            </li>
            <li class="dropdown">
              <a
                href="#"
                class="dropdown-toggle"
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img class="flagimg" :src="flagImg[$t('header.flag')]" />
                <span class="caret"></span>
              </a>
              <ul class="dropdown-menu">
                <li @click="switchLanguage('zh')">
                  <a href="javascript:;">
                    <img class="flagimg" :src="flagImg['zh']" />中文</a
                  >
                </li>
                <li role="separator" class="divider"></li>
                <li @click="switchLanguage('en')">
                  <a href="javascript:;">
                    <img class="flagimg" :src="flagImg['en']" />English</a
                  >
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </nav>
    <div class="container jumbotron">
      <div class="row">
        <div class="col-xs-12">
          <p class="text-center">
            <router-link :to="{ path: '/' }">
              <img
                height="40px"
                alt="logo-gxchain"
                src="/static/exploer-logo.png"
                v-on:click="clearInput"
              />
            </router-link>
          </p>
          <div class="search-wraper" role="search">
            <div class="form-group">
              <input
                @change="eventChanged"
                v-model="search"
                class="form-control search clearable"
                :placeholder="$t('header.search')"
                autocomplete="off"
                autofocus=""
                tabindex="0"
                autocorrect="off"
                autocapitalize="off"
                spellcheck="false"
              />
              <i class="gxicon gxicon-search"></i>
            </div>
          </div>
        </div>
      </div>
      <!--<p class="news">-->
      <!--<a href="https://mp.weixin.qq.com/s/GS2EdzEjLBDZQ0O92Vewbw" target="_blank">-->
      <!--<span class="fa fa-fire"></span>{{$t('header.trustnode_election')}}-->
      <!--</a>-->
      <!--</p>-->
    </div>
  </header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { set_item } from '@/services/CommonService';
import AccountImage from './AccountImage';
import GScatterJS from 'gscatterjs-core';

export default {
  components: { AccountImage },
  data() {
    return {
      account: null,
      connected: false,
      search: '',
      flagImg: {
        zh: require('../../../static/language-dropdown/img/CN.png'),
        en: require('../../../static/language-dropdown/img/US.png')
      }
    };
  },
  mounted() {
    GScatterJS.gscatter.connect(location.host).then(connected => {
      if (!connected) return false;
      this.connected = connected;
      this.setPlugin({
        gscatter: GScatterJS.gscatter,
        gxc: GScatterJS.gscatter.gxc(process.env.network)
      });
      // if identity exist, means user has authorize the website and already unlock, you could display user info then
      if (this.gscatter.identity) {
        this.account = this.gscatter.identity.accounts.find(
          x => x.blockchain === 'gxc'
        );
        this.setAccount({
          account: this.account
        });
      }
    });
  },
  computed: {
    ...mapGetters({
      keywords: 'keywords',
      gscatter: 'gscatter',
      gxc: 'gxc'
    })
  },
  watch: {
    keywords() {
      if (this.keywords !== this.search) {
        this.search = this.keywords;
      }
    }
  },
  methods: {
    ...mapActions({
      setKeywords: 'setKeywords',
      setPlugin: 'setPlugin',
      setAccount: 'setAccount'
    }),
    eventChanged() {
      this.search = this.search.replace(/(^\s*)|(\s*$)/g, '');
      this.setKeywords({ keywords: this.search });
    },
    switchLanguage(locale) {
      this._i18n.locale = locale;
      set_item('locale', locale);
    },
    clearInput() {
      this.setKeywords({ keywords: '' });
    },
    login() {
      if (!GScatterJS.gscatter.isExtension) {
        var flag = confirm(this.$t('header.download'));
        if (flag) {
          window.open('https://gxchain.github.io/GScatter/arch/guide/');
        }
      } else {
        this.gscatter
          .suggestNetwork(process.env.network)
          .then(() => {
            this.gscatter
              .getIdentity({ accounts: [process.env.network] })
              .then(() => {
                this.account = this.gscatter.identity.accounts.find(
                  x => x.blockchain === 'gxc'
                );
                this.setAccount({
                  account: this.account
                });
              });
          })
          .catch(ex => {
            console.error('login failed:', ex);
          });
      }
    },
    logout() {
      this.gscatter.forgetIdentity().then(() => {
        this.account = null;
        this.setAccount({
          account: {}
        });
      });
    }
  }
};
</script>

<style scoped>
.site-header {
  position: relative;
  text-align: center;
  background-color: #3c4463;
  background-image: url('../../../static/banner.png');
  background-position: 0 0;
  background-size: 100%;
  color: #fff;
  margin-bottom: 0;
}

.main-navbar {
  margin-bottom: 0;
  background-color: transparent;
}

.main-navbar a {
  color: #eee;
}

.main-navbar a:hover {
  color: #fff;
}

.main-navbar .nav > li > a:focus,
.main-navbar .nav > li > a:hover {
  background-color: transparent;
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
  background-color: #fff;
}

.main-navbar .navbar-brand {
  margin: 0;
  height: 30px;
  position: relative;
  top: -5px;
}

.jumbotron {
  background-color: transparent;
  padding-bottom: 25px;
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
  }

  .site-header .jumbotron {
    padding-top: 0;
  }

  .site-header h1 {
    font-size: 56px;
    text-shadow: -5px 5px 0 rgba(0, 0, 0, 0.1);
  }

  .site-header p {
    color: #f4f4f4;
    font-size: 21px;
  }

  .dropdown-menu > li > a {
    color: #666;
  }
}

.site-header .fa,
.site-header .gxicon {
  color: #a3a3a4;
  font-size: 16px;
}

.site-header .fa-close,
.site-header .gxicon-search {
  position: absolute;
  right: 14px;
  top: 14px;
}

.site-header .form-group {
  position: relative;
  margin: 0;
}

.site-header .search-wraper {
  max-width: 680px;
  margin: 25px auto 0;
}

.site-header .search {
  -webkit-box-shadow: none;
  box-shadow: none;
  font-size: 14px;
  padding: 10px 30px;
  border-radius: 0;
  height: auto;
  text-align: center;
  border-color: transparent;
  border-radius: 25px;
}

.site-header .search::-ms-clear {
  display: none;
}

.site-header .search:focus {
  -webkit-box-shadow: 0 0 6px rgba(0, 0, 0, 0.6);
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.6);
}

.site-header .search + .fa.onX {
  cursor: pointer;
}

.site-header span {
  font-size: 14px;
}

.flagimg {
  width: 20px;
  margin-right: 10px;
}

.news {
  margin-top: 15px;
  margin-bottom: 0;
}

.news a {
  color: #fff;
  font-size: 15px;
}

.news .fa-fire {
  color: #ff4519;
  margin-right: 5px;
}
</style>
