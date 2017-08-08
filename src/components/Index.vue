<template>
  <div class="container">

    <h4 class="page-header">{{$t('index.latest_status')}}:
      <small>{{$t('index.last_updated_at',{seconds:delta})}}</small>
    </h4>

    <div class="row">

      <!--区块信息-->
      <div class="col-md-12">
        <div v-if="block_info&&global_params&&supply_info" class="panel panel-default">
          <div class="panel-heading">
            <span class="fa fa-chain"></span>&nbsp;{{$t('index.summary.title')}}
          </div>
          <div class="panel-body no-padding">
            <table class="table table-striped table-bordered no-margin">
              <tbody>
              <tr>
                <th>{{$t('index.summary.head_block_number')}}</th>
                <td>
                  <router-link :to="{path:'/block/'+block_info.head_block_number}">{{block_info.head_block_number}}
                  </router-link>
                </td>
                <th>{{$t('index.summary.last_irreversible_block_num')}}</th>
                <td>
                  <router-link :to="{path:'/block/'+block_info.last_irreversible_block_num}">
                    {{block_info.last_irreversible_block_num}}
                  </router-link>
                </td>
              </tr>
              <tr>
                <th>{{$t('index.summary.block_interval')}}</th>
                <td>{{global_params.parameters.block_interval}}</td>
                <th>{{$t('index.summary.recently_missed_count')}}</th>
                <td>{{block_info.recently_missed_count}}</td>
              </tr>
              <tr>
                <th>{{$t('index.summary.total_supply')}}</th>
                <td>{{supply_info.current_supply/100000 | number(2)}}&nbsp;GXS</td>
                <th>{{$t('index.summary.circulating_supply')}}</th>
                <td>{{40510000 | number(2)}}&nbsp;GXS</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!--见证人-->
      <div class="col-md-6">
        <div v-if="global_params" class="panel panel-default">
          <div class="panel-heading">
            <span class="fa fa-eye"></span>&nbsp;{{$t('index.witness.title')}}
          </div>
          <div class="panel-body no-padding">
            <div class="table-responsive">
              <table class="table table-striped table-bordered no-margin">
                <thead>
                <tr>
                  <th>{{$t('index.witness.witness')}}</th>
                  <th>{{$t('index.witness.last_confirmed_block')}}</th>
                  <th>{{$t('index.witness.votes')}}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="witness in global_params.active_witnesses" :class="{info:getLastConfirmedBlock(witness)==block_info.head_block_number}">
                  <td>
                    <router-link :to="{path:'/account/'+getWitnessAccountName(witness)}">{{getWitnessAccountName(witness)}}</router-link>
                  </td>
                  <td>
                    <router-link :to="{path:'/block/'+getLastConfirmedBlock(witness)}">{{getLastConfirmedBlock(witness)}}</router-link>
                  </td>
                  <td>
                    {{ChainStore.getObject(witness)&&ChainStore.getObject(witness).get('total_votes')/100000 | number(2)}}&nbsp;GXC
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
       <!--理事会成员-->
      <div class="col-md-6">
        <div v-if="global_params" class="panel panel-default">
          <div class="panel-heading">
            <span class="fa fa-users"></span>&nbsp;{{$t('index.committee.title')}}
          </div>
          <div class="panel-body no-padding">
            <table class="table table-striped table-bordered no-margin">
              <thead>
              <tr>
                <th>{{$t('index.committee.account')}}</th>
                <th>{{$t('index.committee.votes')}}</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="member in global_params.active_committee_members">
                <td>
                  <router-link :to="{path:'/account/'+getCommitteeAccountName(member)}">{{getCommitteeAccountName(member)}}</router-link>
                </td>
                <td>
                  {{ChainStore.getObject(member)&&ChainStore.getObject(member).get('total_votes')/100000 | number(2)}}&nbsp;GXC
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>

  import {ChainStore} from 'gxbjs'
  import {Apis, Manager} from 'gxbjs-ws'
  import filters from '../filters'

  export default {
    data() {
      return {
        timer: 0,
        last_updated_at: 0,
        block_info: null,
        global_params: null,
        supply_info: null,
        ChainStore
      }
    },
    filters,
    computed: {
      delta() {
        return parseInt((this.timer - this.last_updated_at) / 1000);
      }
    },

    mounted() {
      ChainStore.subscribe(this.onUpdate);
      Apis.instance().db_api().exec("get_objects", [['2.0.0', "2.1.0","2.3.1"]]).then(()=>{
        this.onUpdate()
      });
    },

    destroyed() {
      clearInterval(this.intervalHandler);
      ChainStore.unsubscribe(this.onUpdate);
    },

    methods: {

      getCommitteeAccountName(member) {
        if (ChainStore.getObject(member) && ChainStore.getObject(ChainStore.getObject(member).get('committee_member_account'))) {
          return ChainStore.getObject(ChainStore.getObject(member).get('committee_member_account')).get('name');
        }
        return null
      },

      getWitnessAccountName(witness) {
        if (ChainStore.getObject(witness) && ChainStore.getObject(ChainStore.getObject(witness).get('witness_account'))) {
          return ChainStore.getObject(ChainStore.getObject(witness).get('witness_account')).get('name');
        }
        return null
      },

      getLastConfirmedBlock(witness) {
        return ChainStore.getObject(witness) && ChainStore.getObject(witness).get('last_confirmed_block_num');
      },

      runTimer: function () {
        let self = this;
        this.intervalHandler = setInterval(function () {
          self.timer = new Date();
        }, 300)
      },

      onUpdate() {
        if (this.timer == 0) {
          this.runTimer();
        }
        this.last_updated_at = new Date();
        if (!ChainStore.getObject("2.0.0") || !ChainStore.getObject("2.1.0") || !ChainStore.getObject("2.3.1")) {
          return;
        }
        this.global_params = ChainStore.getObject("2.0.0").toJS();
        this.block_info = ChainStore.getObject("2.1.0").toJS();
        this.supply_info = ChainStore.getObject('2.3.1').toJS();
      }
    }
  }
</script>

<style scoped>

  #search-result .btn-group {
    margin: 20px;
  }

  #search-result .btn-group .btn.active {
    background-color: #1d8eca;
    border-color: #1d8eca;
    color: #fff;
  }

  #search-result .null-tip {
    color: #999;
  }
</style>
