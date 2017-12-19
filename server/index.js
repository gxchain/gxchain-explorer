import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import http from 'http';

import path from 'path';
import Promise from 'bluebird';
import { Apis, Manager } from 'gxbjs-ws';
import { ChainStore } from 'gxbjs';
import BlockSyncTask from './tasks/BlockSyncTask';
import HoldrankTask from './tasks/HoldrankTask';
import LevelDBService from './services/LevelDBService';
import figlet from 'figlet';
import colors from 'colors/safe';

import opn from 'opn';
import webpackConfig from '../build/webpack.dev.conf';
import webpack from 'webpack';
import config from '../config';

require('debug')('gxb-explorer:server');

let autoOpenBrowser = !!config.dev.autoOpenBrowser;
let app = express();
let compiler = webpack(webpackConfig);

let devMiddleware = null;

let hotMiddleware = null;

if (app.get('env') === 'development') {
    devMiddleware = require('webpack-dev-middleware')(compiler, {
        publicPath: webpackConfig.output.publicPath,
        quiet: true
    });

    hotMiddleware = require('webpack-hot-middleware')(compiler, {
        log: console.log,
        heartbeat: 2000
    });

    compiler.plugin('compilation', function (compilation) {
        compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
            hotMiddleware.publish({action: 'reload'});
            cb();
        });
    });
    app.use(logger('dev'));
    app.use(devMiddleware);
    app.use(hotMiddleware);

    var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
    app.use(staticPath, express.static('./static'));
} else {
    app.use(logger('combined'));
    app.use(express.static('./dist'));
}

app.use(require('connect-history-api-fallback')({
    index: '/',
    rewrites: [
        {
            from: '/api/*',
            to: function (options) {
                return options.parsedUrl.href;
            }
        }
    ]
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

let connected = false;
const connectedCheck = function (req, res, next) {
    if (connected) {
        next();
    } else {
        res.status(500).send({
            message: '正在初始化数据,请稍后再试'
        });
    }
};

app.use('/api', connectedCheck, require('./routes/api'));

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function (err, req, res) {
        res.status(err.status || 500);
        res.send({
            message: err.message,
            error: err
        });
    });
}

app.use(function (err, req, res) {
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: {}
    });
});

/**
 * 过滤可连接的节点
 * @param latencies
 * @param witnesses
 * @returns {Array.<T>|*}
 */
const filterAndSortURLs = (latencies, witnesses) => {
    let us = witnesses
        .filter(a => {
            /* Only keep the nodes we were able to connect to */
            return !!latencies[a];
        })
        .sort((a, b) => {
            return latencies[a] - latencies[b];
        });
    return us;
};

let witnesses = app.get('env') === 'development' ? config.dev.witnesses : config.build.witnesses;

if (witnesses.length === 0) {
    console.error('未配置启动节点,请先在config.json文件中配置common.witnesses');
    process.exit(1);
}
/**
 * 连接witness
 * @param callback
 */
let connect = function (callback) {
    let connectionManager = new Manager({url: witnesses[0], urls: witnesses});
    connectionManager.checkConnections().then((resp) => {
        let urls = filterAndSortURLs(resp, witnesses);
        console.log(urls);
        if (urls.length === 0) {
            console.error('无可用连接,3秒后重试');
            setTimeout(function () {
                connect(callback);
            }, 3000);
        } else {
            connectionManager.urls = urls;
            connectionManager.connectWithFallback(true).then(() => {
                console.log('已连接');
                connected = true;
                callback && callback();
            }).catch((ex) => {
                console.error('连接失败,3秒后重试', ex.message);
                setTimeout(function () {
                    connect(callback);
                }, 3000);
            });
        }
    }).catch((ex) => {
        console.error('检查连接失败,3秒后重试', ex.message);
        setTimeout(function () {
            connect(callback);
        }, 3000);
    });
};

/**
 * 启动web服务
 */
let serverStarted = false;
let port = parseInt(process.env.port || '3030');
let startServer = function () {
    if (serverStarted) {
        return;
    }
    serverStarted = true;
    app.set('port', port);
    let server = http.createServer(app);
    server.listen(port);
    server.on('error', onError);
    server.on('listening', () => {
        devMiddleware && devMiddleware.waitUntilValid(() => {
            var uri = `http://localhost:${port}`;
            console.log('> Listening at ' + uri + '\n');
            if (app.get('env') === 'development' && autoOpenBrowser) {
                opn(uri);
            }
        });
    });
    figlet('GXB-EXPLORER', 'Standard', function (err, text) {
        if (err) {
            console.error(err);
        }
        console.log(colors.rainbow('\n=*=*=*=*=*=*=*=*=*==*=*=公信宝区块链浏览器已启动=*=*=*==*=*=*=*=*=*=*=\n'));
        console.log(colors.cyan(`${(text || '').split('\n').map(function (line) {
            return `${line}`;
        }).join('\n')}`));
        console.log(colors.rainbow('=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=**=*=*=*=*=*=*=\n'));
    });
};

/**
 * 订阅区块变化
 * @type {boolean}
 */
let subscribed = false;
let startSubScribe = function () {
    if (subscribed) {
        return;
    }
    subscribed = true;
    ChainStore.subscribe(function () {
        let dynamicGlobal = ChainStore.getObject('2.1.0').toJS();
        BlockSyncTask.sync_to_block(dynamicGlobal.last_irreversible_block_num);
    });
    Apis.instance().db_api().exec('get_objects', [['2.1.0']]);
};

/**
 * 初始化连接
 */
let initConnection = function () {
    console.log('初始化数据缓存');
    let promises = [
        ChainStore.init(),
        BlockSyncTask.init(),
        HoldrankTask.init()
    ];
    Promise.all(promises).then(function () {
        startSubScribe();
        startServer();
    }).catch((ex) => {
        console.error('获取初始信息失败,请检查:\n1. 节点数据是否同步 \n2. 系统时钟是否正确\n', ex);
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

    if (status === 'reconnect') {
        console.log('断开重连');
        ChainStore.resetCache();
    } else if (connected && (status === 'closed' || status === 'error')) { // 出错重连
        connected = false;
        console.log('重新连接其他witness');
        connect(function () {
            ChainStore.subscribed = false;
            ChainStore.subError = null;
            ChainStore.clearCache();
            ChainStore.head_block_time_string = null;
            initConnection();
        });
    }
});
// 首次连接
connect(function () {
    initConnection();
});

/**
 * Event listener for HTTP server "error" event.
 */
function onError (error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

process.stdin.resume();

function exitHandler (reason, err) {
    if (err) console.log(err.stack);
    console.log('程序退出:', reason);
    Promise.all([BlockSyncTask.store(), LevelDBService.put('last-close', new Date().getTime())]).then(function () {
        process.exit();
    }).catch(() => {
        process.exit();
    });
}

// do something when app is closing
process.on('exit', exitHandler.bind(null, 'exit'));

// catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, 'SIGINT'));

// catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, 'uncaughtException'));
