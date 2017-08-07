<template>
  <div class="container">

    <h4 class="page-header">最新状态:
      <small>上次更新时间:{{delta}}秒前</small>
    </h4>

    <div class="row">

      <!--区块信息-->
      <div class="col-md-12">
        <div v-if="block_info&&global_params&&supply_info" class="panel panel-default">
          <div class="panel-heading">
            <span class="fa fa-chain"></span>&nbsp;区块信息
          </div>
          <div class="panel-body no-padding">
            <table class="table table-striped table-bordered no-margin">
              <tbody>
              <tr>
                <th>最新区块</th>
                <td>
                  <router-link :to="{path:'/block/'+block_info.head_block_number}">{{block_info.head_block_number}}
                  </router-link>
                </td>
                <th>最新不可逆区块</th>
                <td>
                  <router-link :to="{path:'/block/'+block_info.last_irreversible_block_num}">
                    {{block_info.last_irreversible_block_num}}
                  </router-link>
                </td>
              </tr>
              <tr>
                <th>出块时间</th>
                <td>{{global_params.parameters.block_interval}}秒</td>
                <th>最近缺失</th>
                <td>{{block_info.recently_missed_count}}</td>
              </tr>
              <tr>
                <th>总发行</th>
                <td>{{supply_info.current_supply/100000 | number(2)}}&nbsp;GXS</td>
                <th>当前供给</th>
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
            <span class="fa fa-eye"></span>&nbsp;活跃见证人
          </div>
          <div class="panel-body no-padding">
            <div class="table-responsive">
              <table class="table table-striped table-bordered no-margin">
                <thead>
                <tr>
                  <th>见证人</th>
                  <th>最新确认区块</th>
                  <th>总票数</th>
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
            <span class="fa fa-users"></span>&nbsp;活跃理事会成员
          </div>
          <div class="panel-body no-padding">
            <table class="table table-striped table-bordered no-margin">
              <thead>
              <tr>
                <th>账户名</th>
                <th>总得票</th>
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
      /**
       * 获取理事会成员账户名
       */
      getCommitteeAccountName(member) {
        if (ChainStore.getObject(member) && ChainStore.getObject(ChainStore.getObject(member).get('committee_member_account'))) {
          return ChainStore.getObject(ChainStore.getObject(member).get('committee_member_account')).get('name');
        }
        return null
      },
      /**
       * 获取见证人账户名
       */
      getWitnessAccountName(witness) {
        if (ChainStore.getObject(witness) && ChainStore.getObject(ChainStore.getObject(witness).get('witness_account'))) {
          return ChainStore.getObject(ChainStore.getObject(witness).get('witness_account')).get('name');
        }
        return null
      },
      /**
       * 获取最近确认区块
       * @param witness 见证人id
       * @returns {*}
       */
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
