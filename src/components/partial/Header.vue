<template>
  <header class="site-header">
    <nav class="navbar navbar-static-top main-navbar" id="top">
      <div class="container">
        <div class="navbar-header">
          <button class="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target="#bs-navbar"
                  aria-controls="bs-navbar" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <router-link :to="{path:'/'}" class="navbar-brand"><img height="28px" src="/static/logo-gxb.png"/></router-link>
        </div>
        <nav id="bs-navbar" class="collapse navbar-collapse">
          <ul class="nav navbar-nav navbar-right">
            <li><a href="#modal-api" data-toggle="modal">API</a></li>
            <li><a href="#modal-about" data-toggle="modal">关于</a></li>
          </ul>
        </nav>
      </div>
    </nav>
    <div class="container jumbotron">
      <div class="row">
        <div class="col-xs-12"><h1>公信宝区块链浏览器(Beta)</h1>
          <p>提供区块、交易、账户等查询功能</p>
          <div class="search-wraper" role="search">
            <div class="form-group">
              <input @change="eventChanged" v-model="search" class="form-control search clearable"
                     placeholder="在此输入区块id、交易id、账户id或者账户名进行查询" autocomplete="off" autofocus=""
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
  import {mapGetters, mapActions} from 'vuex'

  export default {
    data() {
      return {
        search: ''
      }
    },
    computed: {
      ...mapGetters({
        keywords: 'keywords'
      })
    },
    watch: {
      'keywords'() {
        if (this.keywords != this.search) {
          this.search = this.keywords;
        }
      }
    },
    methods: {
      ...mapActions({
        setKeywords: 'setKeywords'
      }),
      eventChanged() {
        this.setKeywords({keywords: this.search})
      }
    }
  }
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

  .main-navbar .navbar-toggle .icon-bar {
    background-color: #fff
  }

  .main-navbar .navbar-brand {
    marign:0;
    height: 30px;
    position: relative;
    top:-5px;
  }

  .jumbotron {
    background-color: transparent
  }

  .site-header h1{
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
    margin-left: auto;
    margin-right: auto;
    max-width: 680px;
    margin-top: 30px;
    margin-bottom: 20px
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
</style>
