import fs from 'fs';
import os from 'os';

let base_path = process.cwd() + '/.tmp/holdrank';// 存放路径
let date_path = base_path + '/txt_date.txt';// 记录的日期以及冻结总量
let all_path = '';// 总量排名
let active_path = ''; // 激活排名
let lock_path = ''; // 冻结排名
let nowdate = '';

const get_rank = (typeid) => {
    try {
        let fileRankData = '';
        let holdrankArr = [];
        let dateLockData = '';
        let dataLock = [];
        let activeNum = 0;
        let allNum = 10000000000000;
        let lockNum = 0;
        let result = {};

        if (!fs.existsSync(date_path)) {
            return {};
        }
        dateLockData = fs.readFileSync(date_path, 'utf-8');
        dataLock = dateLockData.split(':');

        nowdate = dataLock[0];

        all_path = getPath(nowdate, 'txt_all.txt');
        active_path = getPath(nowdate, 'txt_active.txt');
        lock_path = getPath(nowdate, 'txt_lock.txt');

        switch (parseInt(typeid)) {
            case 1:
                fileRankData = readFile(active_path);
                break;
            case 2:

                fileRankData = readFile(lock_path);
                break;
            case 3:
                fileRankData = readFile(all_path);
                break;
            default:
                fileRankData = readFile(active_path);
                break;
        }

        if (!fileRankData) {
            return {};
        };

        fileRankData.split(os.EOL).forEach(function (value, index, array) {
            if (value) {
                holdrankArr[index] = value.split(':');
            }
        });
        lockNum = dataLock[1];
        activeNum = allNum - lockNum;
        holdrankArr.forEach(function (value, index, array) {
            if (value) {
                holdrankArr[index] = {'userid': value[0], 'username': value[1], 'activegxs': value[2], 'lockgxs': value[3], 'allgxs': value[4], 'ranknum': index + 1, 'accountlink': 'https://block.gxb.io/#/account/1.2.' + value[0], 'peractive': (value[2] / activeNum * 100).toFixed(4), 'perlock': (value[3] / lockNum * 100).toFixed(4), 'perall': (value[4] / allNum * 100).toFixed(4)};
            }
        });
        result = {'hold': holdrankArr, 'locknum': lockNum, 'uptime': dataLock[0]};
        return result;
    } catch (err) {
        return {};
    }
};

function getPath (date, pathname) {
    return base_path + '/' + date + '-' + pathname;
}

function readFile (pathstr) {
    if (!fs.existsSync(pathstr)) {
        return false;
    } else {
        return fs.readFileSync(pathstr, 'utf-8');
    }
}
export default {
    get_rank
};
