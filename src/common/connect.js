import { ChainStore } from 'gxbjs';
import { Apis, Manager } from 'gxbjs-ws';
/* global __witnesses__:true */
let witnesses = __witnesses__;
let connectionManager = null;
let connected = false;

let connect = function (callback) {
    if (!callback) {
        callback = function () {};
    }
    if (connected) {
        return callback(connected);
    }
    if (!connectionManager) {
        connectionManager = new Manager({url: witnesses[0], urls: witnesses});
    }
    connectionManager.connectWithFallback(true).then(() => {
        ChainStore.subscribed = false;
        ChainStore.subError = null;
        ChainStore.clearCache();
        ChainStore.head_block_time_string = null;
        ChainStore.init().then(() => {
            callback(connected);
        }).catch(ex => {
            console.error(ex);
            callback(connected);
        });
    });
};

// websocket 状态处理
Apis.setRpcConnectionStatusCallback(function (status) {
    var statusMap = {
        open: '开启',
        closed: '关闭',
        error: '错误',
        reconnect: '重新连接'
    };
    console.log('witness当前状态:', statusMap[status] || status);
    if (!connected && status === 'open') {
        connected = true;
    }

    if (status === 'reconnect') {
        console.log('断开重连');
        ChainStore.resetCache();
    } else if (connected && (status === 'closed' || status === 'error')) { // 出错重连
        console.log('重新连接其他witness');
        connected = false;
        connect();
    }
});

export default connect;
