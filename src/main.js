import '@/common/global';
import Vue from 'vue';
import App from './App';
import router from '@/router';
import VueResource from 'vue-resource';
import store from '@/vuex/store';
import locales from '@/locales';
import VueTimeago from 'vue-timeago';
import Loading from './components/partial/Loading.vue';
import ECharts from 'vue-echarts/components/ECharts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';

Vue.use(VueTimeago, {
  name: 'timeago',
  locale: 'zh',
  locales: {
    zh: require('vue-timeago/locales/zh-CN.json'),
    en: require('vue-timeago/locales/en-US.json')
  }
});
Vue.use(VueResource);
Vue.component('Loading', Loading);
Vue.component('Chart', ECharts);

Vue.config.productionTip = true;

new Vue({
  el: '#app',
  i18n: locales,
  router,
  store,
  template: '<App/>',
  components: { App }
});
