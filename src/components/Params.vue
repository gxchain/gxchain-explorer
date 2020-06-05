<template> 
<div class="container">
    <Loading v-show="loading" />
    <div class="row" v-show="!loading">
        <div class="col-md-12">
            <div class="alert alert-info" role="alert">
                <button
                    type="button"
                    class="close"
                    data-dismiss="alert"
                    aria-label="Close"
                >
                    <span aria-hidden="true">&times;</span>
                </button>
                <p>
                    <span>{{ $t('params.mark') }}</span>
                </p>
            </div>
            <div class="page-header">{{$t('params.titles.params')}}</div>
            <div class="table-responsive">
                <table class="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>{{$t('params.titles.key')}}</th>
                            <th>{{$t('params.titles.value')}}</th>
                            <th>{{$t('params.titles.desc')}}</th>
                        </tr>
                    </thead>
                    <tbody v-if='params'>
                      <tr v-for="key in params_keys" :key="key">
                        <td>{{key}}</td>
                        <td>{{params[key]}}</td>
                        <td>{{$t(`params.params.${key}`)}}</td>
                      </tr>
                    </tbody>
                </table>
            </div>
            <div class="page-header">{{$t('params.titles.staking_items')}}</div>
            <div class="table-responsive">
                <table class="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>{{$t('params.staking_items.id')}}</th>
                            <th>{{$t('params.staking_items.staking_days')}}</th>
                            <th>{{$t('params.staking_items.weight')}}</th>
                            <th>{{$t('params.staking_items.is_valid')}}</th>
                        </tr>
                    </thead>
                    <tbody v-if='staking_items'>
                      <tr v-for='item in staking_items' :key="item[0]">
                        <td>{{item[0]}}</td>
                        <td>{{item[1].staking_days}}</td>
                        <td>{{item[1].weight}}</td>
                        <td>{{item[1].is_valid}}</td>
                      </tr>
                    </tbody>
                </table>
            </div>
            <div class="page-header">{{$t('params.titles.staking_params')}}</div>
            <div class="table-responsive">
                <table class="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>{{$t('params.titles.key')}}</th>
                            <th>{{$t('params.titles.value')}}</th>
                            <th>{{$t('params.titles.desc')}}</th>
                        </tr>
                    </thead>
                    <tbody v-if='params'>
                      <tr v-for="key in staking_params_keys" :key="key">
                        <td>{{key}}</td>
                        <td>{{staking_params[key]}}</td>
                        <td>{{$t(`params.staking_params.${key}`)}}</td>
                      </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div> 
</template>

<script>
import { Apis } from 'gxbjs-ws';
import locale from '../locales/zh'
export default {
  data() {
    return {
      loading: true,
      params: {}
    };
  },
  computed: {
    params_keys() {
      return Object.keys(locale.params.params)
    },
    staking_items() {
      if (!this.params) {
        return []
      }
      let items = this.params.extensions.find(item => {
        return item[0] === 11;
      });
      return items ? items[1].params : [];
    },
    staking_params() {
      if (!this.params) {
        return null;
      }
      let params = this.params.extensions.find(item => {
        return item[0] === 12;
      });
      return params ? params[1] : null;
    },
    staking_params_keys() {
      return Object.keys(locale.params.staking_params)
    }
  },
  mounted() {
    Apis.instance().db_api().exec('get_objects', [['2.0.0']]).then(resp => {
      console.log(JSON.stringify(resp[0].parameters, null, '  '));
      this.params = resp[0].parameters;
      this.loading = false;
    }).catch(ex => {
      console.error('error loading 2.0.0', ex);
      this.loading = false;
    })
  }
};
</script>
