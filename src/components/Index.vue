<template>
  <div class="container">
    <h4 class="page-header">最新状态:
      <small>上次更新时间:{{delta}}秒前</small>
    </h4>
    <pre v-if="block_status">{{JSON.stringify(block_status, null, '\t')}}</pre>
    <pre v-else>加载中...</pre>
  </div>
</template>

<script>

  import {ChainStore} from 'gxbjs'
  import {Apis, Manager} from 'gxbjs-ws'

  export default {
    data() {
      return {
        timer: 0,
        last_updated_at: 0,
        block_status: null
      }
    },
    computed: {
      delta() {
        return parseInt((this.timer - this.last_updated_at) / 1000);
      }
    },
    mounted() {
      let self = this;
      this.connect();
      // websocket 状态处理
      Apis.setRpcConnectionStatusCallback(function (status) {
        var statusMap = {
          open: '开启',
          closed: '关闭',
          error: '错误',
          reconnect: '重新连接'
        }
        console.log('witness当前状态:', statusMap[status] || status);
        if (!self.connected && status == 'open') {
          self.connected = true;
        }

        if (status === "reconnect") {
          console.log('断开重连');
          ChainStore.resetCache();
        }
        else if (self.connected && (status == 'closed' || status == 'error')) { // 出错重连
          console.log('重新连接其他witness');
          self.connect();
        }
      })
    },
    destroyed() {
      clearInterval(this.intervalHandler);
      ChainStore.unsubscribe(this.onUpdate);
      self.connected=false;
      Apis.close();
    },
    methods: {
      runTimer: function () {
        let self = this;
        this.intervalHandler = setInterval(function () {
          self.timer = new Date();
        }, 300)
      },
      connect: function () {
        let self = this;
        let witnesses = __witnesses__;
        if (!self.connectionManager) {
          self.connectionManager = new Manager({url: witnesses[0], urls: witnesses});
        }
        self.connectionManager.connectWithFallback(true).then(() => {

          ChainStore.subscribed = false;
          ChainStore.subError = null;
          ChainStore.clearCache();
          ChainStore.head_block_time_string = null;

          ChainStore.init().then(() => {
            ChainStore.subscribe(self.onUpdate);
            Apis.instance().db_api().exec("get_objects", [['2.0.0', "2.1.0"]]);
          });
        });
      },
      onUpdate() {
        if (this.timer == 0) {
          this.runTimer();
        }
        this.last_updated_at = new Date();
        if (!ChainStore.getObject("2.0.0") || !ChainStore.getObject("2.1.0")) {
          return;
        }
        let globalParams = ChainStore.getObject("2.0.0").toJS();
        let dynamicGlobal = ChainStore.getObject("2.1.0").toJS();
        this.block_status = this.translateBlockInfo(dynamicGlobal, globalParams);
      },
      translateBlockInfo(dynamicGlobal, globalParams) {
        return {
          '参与度': dynamicGlobal.participation + '%',
          '最近缺失': dynamicGlobal.recently_missed_count,
          '最新区块': dynamicGlobal.head_block_number,
          '最新不可逆区块': dynamicGlobal.last_irreversible_block_num,
          '出块时间': globalParams.parameters.block_interval + '秒',
          '活跃理事会成员': globalParams.active_committee_members.length,
          '活跃见证人节点': globalParams.active_witnesses.length
        }
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
