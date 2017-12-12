import { Apis } from 'gxbjs-ws';
import fs from 'fs';
import os from 'os';
import cron from 'cron';
import _ from 'lodash';
import path from 'path';

let all_lock = 0;
let date_lock_str = '';
let base_path = process.cwd() + '/.tmp/holdrank'; // 存放路径
let date_path = base_path + '/txt_date.txt'; // 记录的日期以及冻结总量
let info_path = ''; // 全部会员数据
let all_path = ''; // 总量排名
let active_path = ''; // 激活排名
let lock_path = ''; // 冻结排名
let nowdate = '';
let account_count = 0;

export default {
    init () {
        try {
            info_path = getPath('txt_accountinfo.txt');
            all_path = getPath('txt_all.txt');
            active_path = getPath('txt_active.txt');
            lock_path = getPath('txt_lock.txt');
            if (fs.existsSync(info_path) && fs.existsSync(date_path) && fs.existsSync(all_path) && fs.existsSync(active_path) && fs.existsSync(lock_path)) {} else {
                // 记录日期的文件也没有的时候，即全站首次
                if (!fs.existsSync(date_path)) {
                    cronfuc();
                }
                docron();
            }
        } catch (err) {
            console.log('cron init error');
        };
    }
};

function docron () {
    new cron.CronJob('00 02 * * *', function () {
        cronfuc();
    }, null, true, 'UTC');
}

function cronfuc () {
    info_path = getPath('txt_accountinfo.txt');
    all_path = getPath('txt_all.txt');
    active_path = getPath('txt_active.txt');
    lock_path = getPath('txt_lock.txt');

    if (fs.existsSync(info_path) && fs.existsSync(date_path) && fs.existsSync(all_path) && fs.existsSync(active_path) && fs.existsSync(lock_path)) {

    } else {
        if (!fs.existsSync(base_path)) {
            mkdir(base_path);
        }
        if (fs.existsSync(info_path)) {
            fs.unlinkSync(info_path);
        }

        Apis.instance().db_api().exec('get_account_count', [false]).then(function (resp) {
            account_count = resp;
            accountinfo(resp - 1);
        }).catch(function () {});
    }
}

function accountinfo (accountNum) {
    for (var i = accountNum; i >= 0; i--) {
        Apis.instance().db_api().exec('get_full_accounts', [
            ['1.2.' + i], false
        ]).then(function (resp) {
            let active = 0;
            let lock = 0;
            let all = 0;
            let userid = 0;
            let info = [];
            let str = '';
            info = resp[0][1];
            info['balances'].forEach(function (value, index, array) {
                if (value['asset_type'] === '1.3.1') {
                    active += parseInt(value['balance']);
                }
            });
            info['locked_balances'].forEach(function (value, index, array) {
                if (value['amount']['asset_id'] === '1.3.1') {
                    lock += parseInt(value['amount']['amount']);
                }
            });

            all = active + lock;
            all_lock += lock;
            userid = resp[0][0].replace('1.2.', '');
            str = userid + ':' + info['account']['name'] + ':' + active + ':' + lock + ':' + all + os.EOL;
            fs.appendFile(info_path, str, function (errr) {
                account_count--;
                if (account_count <= 0) {
                    date_lock_str = nowdate + ':' + all_lock;
                    fs.writeFile(date_path, date_lock_str, function (errr) {});
                    runsort();
                };
            });
        }).catch(function () {});
    }
}

function runsort () {
    let info = [];
    fs.readFileSync(info_path, 'utf-8').split(os.EOL).forEach(function (value, index, array) {
        if (value !== '') {
            info[index] = value.split(':');
        }
    });
    fs.writeFile(active_path, arrFtt(info, 2), function (errr) {});
    fs.writeFile(lock_path, arrFtt(info, 3), function (errr) {});
    fs.writeFile(all_path, arrFtt(info, 4), function (errr) {});
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function dateFtt (fmt, date) {
    var o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S"': date.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        }
    }
    return fmt;
}

function mkdir (dirpath, dirname) {
    // 判断是否是第一次调用
    if (typeof dirname === 'undefined') {
        if (fs.existsSync(dirpath)) {
            return;
        } else {
            mkdir(dirpath, path.dirname(dirpath));
        }
    } else {
        // 判断第二个参数是否正常，避免调用时传入错误参数
        if (dirname !== path.dirname(dirpath)) {
            mkdir(dirpath);
            return;
        }
        if (fs.existsSync(dirname)) {
            fs.mkdirSync(dirpath);
        } else {
            mkdir(dirname, path.dirname(dirname));
            fs.mkdirSync(dirpath);
        }
    }
}

function arrFtt (info, index) {
    let tempArr = [];
    tempArr = _.sortBy(info, function (item) {
        return -item[index];
    });
    tempArr = _.take(tempArr, 100);
    tempArr.forEach(function (value, index, array) {
        tempArr[index] = value.join(':');
    });
    return tempArr.join(os.EOL);
}

function getPath (pathname) {
    nowdate = dateFtt('yyyy-MM-dd', new Date());
    return base_path + '/' + nowdate + '-' + pathname;
}
