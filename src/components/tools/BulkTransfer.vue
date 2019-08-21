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
                            <button type="button" class="btn btn-info">导入</button>
                            <input 
                                type="file"
                                ref="uploadFile"
                                id="uploadFile"
                                :value="csvFiles"
                                v-on:change="handleChangeFile($event)">
                        </span>
                        <button type="button" class="btn btn-primary">执行</button>
                        <button type="button" class="btn btn-warning" @click="handleClearData">清空</button>
                        <button type="button" class="btn btn-success" @click="handleExport">导出</button>
                        <button type="button" class="btn btn-primary " @click="handleRefresh">刷新</button>
                    </div>
                    <div class="table-wrap panel-body no-padding table-responsive">
                        <table class="table table-striped table-bordered no-margin">
                            <tbody>
                                <tr>
                                    <th class="text-center">Account</th>
                                    <th class="text-right">Amount</th>
                                    <th class="text-right">Memo</th>
                                    <th class="text-right">Txid</th>
                                </tr>
                                <template v-for="(item, index) in renderTransferData">
                                    <tr>
                                        <td class="text-center">{{item['Account']}}</td>
                                        <td class="text-right">{{item['Amount']}}</td>
                                        <td class="text-right">{{item['Memo']}}</td>
                                        <td class="text-right">{{item['Txid']}}</td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                        <div class="no-data-tip" v-if="renderTransferData.length == 0">   
                            <span>暂无数据</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import BreadBox from './components/BreadBox';
import Papa from 'papaparse';
const BULK_TRANSFER_TEMPLATE_NAME = 'Bulk_Transfer_Template.csv';
export default {
    components: {
        BreadBox
    },
    data () {
        return {
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
            fields: ['Account', 'Amount', 'Memo', 'Txid'],
            createTransferData: [
                {
                    'Account': '',
                    'Amount': '',
                    'Memo': '',
                    'Txid': ''
                }
            ],
            createCsvFile: '',
            csvFiles: '',
            renderTransferData: []
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
        handleExport () {
            if (!this.isSupportDownloadFuc()) return;
            let exportData;
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
        handleClearData () {
            this.renderTransferData = [];
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
