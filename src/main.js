// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '@/common/global'
import Vue from 'vue'
import App from './App'
import router from '@/router'
import VueResource from 'vue-resource'
import store from '@/vuex/store'
import locales from '@/locales'
import VueTimeago from 'vue-timeago'

Vue.use(VueTimeago, {
  name: 'timeago',
  locale: 'zh-CN',
  locales: {
    'zh-CN': require('vue-timeago/locales/zh-CN.json'),
    'en-US': require('vue-timeago/locales/en-US.json')
  }
})
Vue.use(VueResource)

Vue.config.productionTip = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n:locales,
  router,
  store,
  template: '<App/>',
  components: { App }
})
