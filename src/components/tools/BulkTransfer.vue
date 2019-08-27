<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <bread-box :breadList="breadList"></bread-box>
                <hr>
                <div class="alert alert-info" role="alert">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <p>
                        <span>{{$t('tools.bulk_transfer.download_template')}} > {{$t('tools.bulk_transfer.import')}} > {{$t('tools.bulk_transfer.execute')}}</span>
                    </p>
                </div>
                <div class="bulk-transfer">
                    <div class="control-wrap">
                        <div class="statistics-wrap">
                            {{$t('tools.bulk_transfer.import_all')}}<span class="s-num s-primary"> {{recordNum}} </span> {{$t('tools.bulk_transfer.article')}};
                            {{$t('tools.bulk_transfer.processing')}}<span class="s-num s-processing"> {{processingNum}} </span>;
                            {{$t('tools.bulk_transfer.success')}}<span class="s-num s-success"> {{executeNum.success}} </span>;
                            {{$t('tools.bulk_transfer.fail')}}<span class="s-num s-warn"> {{executeNum.fail}} </span>
                            <div class="btn-group" style="top:-1.4px;">
                                <button type="button" class="btn dropdown-toggle" 
                                        v-if="executeEnd"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {{$t('tools.bulk_transfer.'+filterType)}}<span class="caret"></span>
                                </button>
                                <ul class="dropdown-menu export-type">
                                    <li><a @click="handleFilter('all')">{{$t('tools.bulk_transfer.all')}}</a></li>
                                    <li v-if="processingNum>0"><a @click="handleFilter('processing')">{{$t('tools.bulk_transfer.processing')}}</a></li>
                                    <li v-if="executeNum.success>0"><a @click="handleFilter('success')">{{$t('tools.bulk_transfer.success')}}</a></li>
                                    <li v-if="executeNum.fail"><a @click="handleFilter('fail')">{{$t('tools.bulk_transfer.fail')}}</a></li>
                                </ul>
                        </div>
                        </div>
                        <div class="btn-wrap"> 
                            <button type="button" class="btn btn-link" @click="handleDownload">{{$t('tools.bulk_transfer.download_template')}}</button>
                            <span class="upload-file-wrap">
                                <button type="button" class="btn btn-info" :disabled="running">{{$t('tools.bulk_transfer.import')}} </button>
                                <input 
                                    type="file"
                                    ref="uploadFile"
                                    id="uploadFile"
                                    :value="csvFiles"
                                    :disabled="running"
                                    v-on:change="handleChangeFile($event)">
                            </span>
                            <!--btn execute-->         
                            <button type="button" class="btn btn-primary btc-execute" :disabled="running" @click="handleExecute">{{$t('tools.bulk_transfer.execute')}}
                                <i class="fas fa-spinner loading-animate" v-show="running && !executeEnd"></i>
                            </button>
                            <!--btn clear-->    
                            <button type="button" class="btn btn-warning" :disabled="refreshBtn" @click="handleClearData">{{$t('tools.bulk_transfer.clear')}}</button>
                            <!--btn refresh-->    
                            <button type="button" class="btn btn-primary " :disabled="refreshBtn" @click="handleRefresh">
                                {{$t('tools.bulk_transfer.refresh')}} 
                                <span v-if="refreshBtn">{{refreshWait}}s</span>
                            </button>
                            <!--btn export-->    
                            <div class="btn-group">
                                <button type="button" class="btn btn-success dropdown-toggle" 
                                        :disabled="!executeEnd"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {{$t('tools.bulk_transfer.export')}}<span class="caret"></span>
                                </button>
                                <ul class="dropdown-menu export-type">
                                    <li><a @click="handleExport('all')">{{$t('tools.bulk_transfer.all')}}</a></li>
                                    <li><a @click="handleExport('success')">{{$t('tools.bulk_transfer.success')}}</a></li>
                                    <li><a @click="handleExport('fail')">{{$t('tools.bulk_transfer.fail')}}</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="table-wrap panel-body no-padding">
                        <table class="table table-bordered no-margin">
                            <tbody>
                                <tr>
                                    <th class="text-center">Account</th>
                                    <th class="text-center">Amount</th>
                                    <th class="text-center">Asset</th>
                                    <th class="text-center">Memo</th>
                                    <th class="text-center" v-show="running">Result</th>
                                </tr>
                                <transfer-item 
                                    v-for="(item, index) in renderTransferData" 
                                    :ref="'transfer-item-' + index"
                                    :index="index"
                                    :data="item"
                                    :running="running"
                                    :key="index"
                                    @onExecuteEnd="onExecuteEnd"
                                    @onSuccess="onTransferSuccess"
                                ></transfer-item>
                            </tbody>
                        </table>
                        <div class="no-data-tip" v-if="recordNum == 0">   
                            <span>{{$t('tools.no_data')}}</span>
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
                    key: 'tools.title',
                    path: '/tools/index'
                },
                {
                    name: '批量转账',
                    key: 'tools.bulk_transfer.title',
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
                success: 0,
                fail: 0,
                end: 0
            },
            executeEnd: false,
            recordNum: 0,
            refreshWait: 10,
            refreshBtn: false,
            filterType: 'all'
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
        }),
        'processingNum': function () {
            return this.running ? this.recordNum - this.executeNum.success - this.executeNum.fail : 0;
        }
    },
    methods: {
        handleDownload () {
            if (!this.isSupportDownload()) return;
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
                            that.recordNum = that.renderTransferData.length;
                        }
                    }
                });
            } catch (err) {
                console.error(err);
            }
        },
        async handleExecute () {
            if (this.account.authority !== 'active') {
                alert(this.$t('tools.logo'));
                return;
            }

            if (this.recordNum > 0) {
                this.running = true;
            }

            for (const item of this.renderTransferData) {
                await this.gxc.transfer(item.Account, item.Memo, `${item.Amount} ${item.Asset}`, true).then(res => {
                    this.$set(item, 'Txid', res[0].id);
                    this.$set(item, 'status', 'processing');
                    this.$set(item, 'Result', 'Processing');
                }).catch(ex => {
                    this.executeNum.fail++;
                    this.$set(item, 'Mssage', ex.message);
                    this.$set(item, 'status', 'fail');
                    this.$set(item, 'Result', 'Fail');
                    console.log(ex);
                });
            }
        },
        handleClearData () {
            this.renderTransferData = [];
            this.running = false;
            this.executeNum.success = 0;
            this.executeNum.fail = 0;
            this.executeNum.processing = 0;
            this.executeNum.end = 0;
            this.recordNum = 0;
            this.executeEnd = false;
        },
        handleRefresh () {
            if (this.recordNum === 0) return;
            if (this.refreshBtn) return;
            this.refreshBtn = true;
            this.executeNum.end = 0;
            this.setRefreshStatus();

            this.renderTransferData.forEach((item, index) => {
                let child_get_transaction = this.$refs[`transfer-item-${index}`][0].get_transaction_outside;
                if (typeof child_get_transaction === 'function') {
                    child_get_transaction();
                }
            });
        },
        handleExport (type) {
            if (!this.isSupportDownload()) return;
            if (this.recordNum === 0) return;
            let exportData;
            let cloneRenderTransferData = [...this.renderTransferData];

            if (type !== 'all') {
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
            this.funDownload(exportData, `Export_transfer_record_${timename}.csv`);
        },
        handleFilter (type) {
            this.filterType = type;
            this.renderTransferData.forEach(item => {
                if (type === 'all') {
                    this.$set(item, 'hide', false);
                } else {
                    if (item['status'] !== type) {
                        this.$set(item, 'hide', true);
                    } else {
                        this.$set(item, 'hide', false);
                    }
                }
            });
        },
        setRefreshStatus () {
            this.refreshWait--;
            if (this.refreshWait <= 0) {
                this.refreshBtn = false;
                this.refreshWait = 10;
                return;
            }
            setTimeout(() => {
                this.setRefreshStatus();
            }, 1000);
        },
        onTransferSuccess (index) {
            this.executeNum.success++;
            this.$set(this.renderTransferData[index], 'status', 'success');
            this.$set(this.renderTransferData[index], 'Result', `Success Txid: ${this.renderTransferData[index]['Txid']}`);
        },
        onExecuteEnd () {
            this.executeNum.end++;
            if (this.executeNum.end >= this.recordNum - this.executeNum.fail) {
                this.executeEnd = true;
            }
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
        },
        isSupportDownload () {
            if ('download' in document.createElement('a')) {
                return true;
            } else {
                alert(this.$t('tools.browser_not_support'));
                return false;
            }
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
    .s-processing {
      color: #f0ad4e;
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
  }
  .export-type {
    min-width: 0;
    a {
      cursor: pointer;
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
.loading-animate {
  -webkit-animation: loadingLoop 1s linear infinite;
  animation: loadingLoop 1s linear infinite;
}
@keyframes loadingLoop {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  50% {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
