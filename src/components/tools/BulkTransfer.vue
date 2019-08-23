<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <bread-box :breadList="breadList"></bread-box>
                <hr>
                <div class="alert alert-info" role="alert">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <p>
                        <span>这里是适用说明，这里是适用说明这里是适用说明这里是适用说明这里是适用说明这里是适用说明这里是适用说明这里是适用说明这里是适用说明这里是适用说明这里是适用说明这里是适用说明这里是适用说明这里是适用说明这里是适用说明这里是适用说明这里是适用说明这里是适用说明这里是适用说明</span>
                    </p>
                </div>
                <div class="bulk-transfer">
                    <div class="control-wrap">
                        <div class="statistics-wrap">
                            本次导入多少<span class="s-num s-primary">100</span>条数据 ；成功<span class="s-num s-success">10</span>条；失败<span class="s-num s-warn">12</span>条；
                        </div>
                        <div class="btn-wrap"> 
                            <button type="button" class="btn btn-link" @click="handleDownload">下载模版</button>
                            <span class="upload-file-wrap">
                                <button type="button" class="btn btn-info" :disabled="running">导入</button>
                                <input 
                                    type="file"
                                    ref="uploadFile"
                                    id="uploadFile"
                                    :value="csvFiles"
                                    :disabled="running"
                                    v-on:change="handleChangeFile($event)">
                            </span>
                            <button type="button" class="btn btn-primary btc-execute" :disabled="running" @click="handleExecute">执行
                                <!-- <i class="fas fa-spinner"></i> -->
                            </button>
                            <button type="button" class="btn btn-warning" :disabled="refreshBtn" @click="handleClearData">清空</button>
                            <button type="button" class="btn btn-primary " :disabled="refreshBtn" @click="handleRefresh">
                                刷新 <span v-if="refreshBtn">{{refreshWait}}s</span>
                            </button>
                            <div class="btn-group">
                                <button type="button" class="btn btn-success dropdown-toggle" 
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        导出<span class="caret"></span>
                                </button>
                                <ul class="dropdown-menu export-type">
                                    <li><a @click="handleExport">全部</a></li>
                                    <li><a @click="handleExport('success')">成功记录</a></li>
                                    <li><a @click="handleExport('fail')">失败记录</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="table-wrap panel-body no-padding table-responsive">
                        <table class="table table-bordered no-margin">
                            <tbody>
                                <tr>
                                    <th class="text-center">Account</th>
                                    <th class="text-center">Amount</th>
                                    <th class="text-center">Asset</th>
                                    <th class="text-center">Memo</th>
                                    <th class="text-right" v-show="running">Result</th>
                                </tr>
                                <transfer-item 
                                    v-for="(item, index) in renderTransferData" 
                                    :ref="'transfer-item-' + index"
                                    :index="index"
                                    :data="item"
                                    :running="running"
                                    :key="index"
                                    @onSuccess="onTransferSuccess"
                                ></transfer-item>
                            </tbody>
                        </table>
                        <div class="no-data-tip" v-if="renderTransferData.length == 0">   
                            <span>暂无数据</span>
                        </div>
                        <!-- <Loading v-show="loading"/> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import BreadBox from './components/BreadBox';
import TransferItem from './components/TransferItem';
import Papa from 'papaparse';
import { mapGetters } from 'vuex';
import { setTimeout } from 'timers';
const BULK_TRANSFER_TEMPLATE_NAME = 'Bulk_Transfer_Template.csv';
export default {
    components: {
        BreadBox,
        TransferItem
    },
    data () {
        return {
            loading: true,
            breadList: [
                {
                    name: '工具',
                    path: '/tools/index'
                },
                {
                    name: '批量转账',
                    path: '/tools/bulk-transfer'
                }
            ],
            fields: ['Account', 'Amount', 'Asset', 'Memo'],
            exportFields: ['Account', 'Amount', 'Asset', 'Memo', 'Result'],
            createTransferData: [
                {
                    'Account': '',
                    'Amount': '',
                    'Asset': '',
                    'Memo': ''
                }
            ],
            createCsvFile: '',
            csvFiles: '',
            renderTransferData: [],
            running: false,
            executeNum: {
                all: 0,
                success: 0,
                fail: 0
            },
            refreshWait: 10,
            refreshBtn: false
        };
    },
    mounted () {
        try {
            this.createCsvFile = Papa.unparse({
                'fields': this.fields,
                'data': this.createTransferData
            });
        } catch (err) {
            console.error(err);
        }
    },
    computed: {
        ...mapGetters({
            gxc: 'gxc',
            account: 'account'
        })
    },
    methods: {
        handleDownload () {
            if (!this.isSupportDownloadFuc()) return;
            this.funDownload(this.createCsvFile, BULK_TRANSFER_TEMPLATE_NAME);
        },
        handleChangeFile (e) {
            let that = this;
            that.csvFiles = '';
            const file = e.target.files[0] || e.dataTransfer.files[0];
            try {
                Papa.parse(file, {
                    header: true,
                    complete: function (results) {
                        if (results.data && results.data.length > 0) {
                            that.renderTransferData = [...that.renderTransferData, ...results.data];
                        }
                    }
                });
            } catch (err) {
                console.error(err);
            }
        },
        async handleExecute () {
            if (this.account.authority !== 'active') {
                alert('请先登录');
                return;
            }

            this.executeNum.all = this.renderTransferData.length;
            if (this.renderTransferData.length > 0) {
                this.running = true;
            }
            // TODO:异步执行转账
            for (const item of this.renderTransferData) {
                await this.gxc.transfer(item.Account, item.Memo, `${item.Amount} ${item.Asset}`, true).then(res => {
                    this.executeNum.success++;
                    this.$set(item, 'Txid', res[0].id);
                    this.$set(item, 'status', 'pending');
                    this.$set(item, 'Result', '转账进行中');
                }).catch(ex => {
                    this.executeNum.fail++;
                    console.log(ex);
                    this.$set(item, 'Mssage', ex.message);
                    this.$set(item, 'status', 'fail');
                    this.$set(item, 'Result', '转账失败');
                });
            }
            // this.renderTransferData.forEach(item => {
            //     setTimeout(() => {
            //         if (Math.random() > 0.5) {
            //             // 进行中
            //             this.$set(item, 'Txid', '5d0885190319a2acca2db7576a6d67e6048a708e');
            //             this.$set(item, 'status', 'pending');
            //             this.$set(item, 'Result', '转账进行中');
            //         } else {
            //             // 失败
            //             this.$set(item, 'Mssage', '这是报错信息');
            //             this.$set(item, 'status', 'fail');
            //             this.$set(item, 'Result', '转账失败');
            //         }
            //     }, 2000);
            // });
        },
        handleClearData () {
            this.renderTransferData = [];
            this.running = false;
        },
        handleRefresh () {
            if (this.renderTransferData.length === 0) return;
            if (this.refreshBtn) return;
            this.refreshBtn = true;
            this.setRefreshStatus();

            this.renderTransferData.forEach((item, index) => {
                let child_get_transaction = this.$refs[`transfer-item-${index}`][0].get_transaction;
                if (typeof child_get_transaction === 'function') {
                    child_get_transaction();
                }
            });
        },
        handleExport (type) {
            if (!this.isSupportDownloadFuc()) return;
            if (this.renderTransferData.length === 0) return;
            let exportData;
            let cloneRenderTransferData = [...this.renderTransferData];

            if (type === 'success' || type === 'fail') {
                cloneRenderTransferData = cloneRenderTransferData.filter(item => item.status === type);
            }

            try {
                exportData = Papa.unparse({
                    'fields': this.exportFields,
                    'data': cloneRenderTransferData
                });
            } catch (err) {
                console.error(err);
            }
            let timename = new Date().format('yyyy-MM-dd hh:mm:ss');
            this.funDownload(exportData, `导出转账记录${timename}.csv`);
        },
        isSupportDownloadFuc () {
            if ('download' in document.createElement('a')) {
                return true;
            } else {
                alert('浏览器不支持');
                return false;
            }
        },
        setRefreshStatus () {
            this.refreshWait--;
            if (this.refreshWait === 0) {
                this.refreshBtn = false;
                this.refreshWait = 10;
                return;
            }
            setTimeout(() => {
                this.setRefreshStatus();
            }, 1000);
        },
        onTransferSuccess (index) {
            this.$set(this.renderTransferData[index], 'status', 'success');
            this.$set(this.renderTransferData[index], 'Result', '转账成功');
        },
        funDownload (content, filename) {
            let eleLink = document.createElement('a');
            eleLink.download = filename;
            eleLink.style.display = 'none';
            // The character content is converted to a blob address.
            let blob = new Blob([content]);
            eleLink.href = URL.createObjectURL(blob);
            // trigger click
            document.body.appendChild(eleLink);
            eleLink.click();
            // remove
            document.body.removeChild(eleLink);
        }
    }
};
</script>
<style scoped lang="less">
.bulk-transfer {
  .control-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    .s-num {
      font-size: 16px;
      font-weight: 600;
    }
    .s-primary {
      color: #337ab7;
    }
    .s-success {
      color: #5cb85c;
    }
    .s-warn {
      color: #d9534f;
    }
  }
  .btn-wrap {
    .btc-execute {
      i {
        margin-left: 3px;
      }
    }
    .btn {
      margin-bottom: 5px;
    }
    .export-type {
      min-width: 0;
      a {
        cursor: pointer;
      }
    }
  }
  .upload-file-wrap {
    position: relative;
    display: inline-block;
    #uploadFile {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      opacity: 0;
      width: 100%;
      overflow: hidden;
    }
  }
  .table-wrap {
    max-height: 600px;
    overflow-y: auto;
  }
  .no-data-tip {
    text-align: center;
    background-color: #fff;
    transition: background-color 0.2s ease-in-out;
    color: #515a6e;
    font-size: 12px;
    height: 48px;
    line-height: 48px;
    border-right: 1px solid rgb(221, 221, 221);
    border-bottom: 1px solid rgb(221, 221, 221);
    border-left: 1px solid rgb(221, 221, 221);
  }
  @media (max-width: 768px) {
    .control-wrap {
      display: block;
      text-align: right;
      .statistics-wrap {
        text-align: center;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
