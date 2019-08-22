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
                    <div class="btn-wrap text-right">
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
                        <button type="button" class="btn btn-warning" @click="handleClearData">清空</button>
                        <button type="button" class="btn btn-primary " @click="handleRefresh">刷新</button>
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
                    <div class="table-wrap panel-body no-padding table-responsive">
                        <table class="table table-bordered no-margin">
                            <tbody>
                                <tr>
                                    <th class="text-center">Account</th>
                                    <th class="text-center">Amount</th>
                                    <th class="text-center">Asset</th>
                                    <th class="text-center">Memo</th>
                                    <th class="text-right" v-show="running">Resullt</th>
                                </tr>
                                <template v-for="(item, index) in renderTransferData">
                                    <tr :class="transferColor[item.status]">
                                        <td class="text-center">{{item['Account']}}</td>
                                        <td class="text-center">{{item['Amount']}}</td>
                                        <td class="text-center">{{item['Asset']}}</td>
                                        <td class="text-center">{{item['Memo']}}</td>
                                        <td class="text-right" style="width:30%;"v-show="running">{{item['Result']}}</td>
                                    </tr>
                                </template>
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
import Papa from 'papaparse';
import { mapGetters } from 'vuex';
const BULK_TRANSFER_TEMPLATE_NAME = 'Bulk_Transfer_Template.csv';
export default {
    components: {
        BreadBox
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
            transferColor: {
                success: 'success',
                padding: 'warning',
                fail: 'danger'
            }
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
            gxc: 'gxc'
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
        handleExport (type) {
            if (!this.isSupportDownloadFuc()) return;
            let exportData;
            // TODO: 需要对数据分类再导出 this.renderTransferData

            if (type === 'sucess' || type === 'fail') {
                this.renderTransferData = this.renderTransferData.filter(item => item.status === type);
            }

            try {
                exportData = Papa.unparse({
                    'fields': this.fields,
                    'data': this.renderTransferData
                });
            } catch (err) {
                console.error(err);
            }
            let timename = new Date().format('yyyy-MM-dd hh:mm:ss');
            this.funDownload(exportData, `导出记录${timename}.csv`);
        },
        isSupportDownloadFuc () {
            if ('download' in document.createElement('a')) {
                return true;
            } else {
                alert('浏览器不支持');
                return false;
            }
        },
        async handleExecute () {
            this.executeNum.all = this.renderTransferData.length;

            if (this.renderTransferData.length > 0) {
                this.running = true;
            }

            // TODO:异步执行转账
            // for (const item of this.renderTransferData) {
            //     await this.gxc.transfer(item.Account, item.Memo, `${item.Amount} ${item.Asset}`, true).then(res => {
            //         this.executeNum.success++;
            //         console.log(this.executeNum.success);
            //         console.log(res);
            //     }).catch(ex => {
            //         this.executeNum.fail++;
            //         console.log(ex);
            //     });
            // }
            this.renderTransferData.forEach(item => {
                setInterval(() => {
                    // 成功
                    if (Math.random() > 0.5) {
                        this.$set(item, 'Result', 'Txid的值为：' + Math.random() * 100);
                        this.$set(item, 'status', 'success');
                    } else {
                        // 失败
                        this.$set(item, 'Result', 'Txid的值为：' + Math.random() * 100);
                        this.$set(item, 'status', 'fail');
                    }
                }, 1000);
            });
        },
        handleClearData () {
            this.renderTransferData = [];
            this.running = false;
        },
        handleRefresh () {
            alert('shuaixn');
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
  .btn-wrap {
    margin-bottom: 15px;
    .btn {
      margin-bottom: 5px;
    }
    .btc-execute {
      i {
        margin-left: 3px;
      }
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
}
</style>
