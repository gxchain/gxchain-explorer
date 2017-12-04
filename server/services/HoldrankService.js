import fs from 'fs';
import os from 'os';
const get_rank = (typeid) => {
	let fileRankData = '', 
    holdrankArr = [],
    dateLockData = '',
    dataLock = [],
    activeNum = 0,
    allNum = 100000000,
    lockNum = 0,
    result = {};
    switch(typeid)
    {
        case 1:
            fileRankData = fs.readFileSync("./server/tasks/Holdrank/txt_active.txt",'utf-8');
            break;
        case 2:
            fileRankData = fs.readFileSync("./server/tasks/Holdrank/txt_lock.txt",'utf-8');
            break;
        case 3:
            fileRankData = fs.readFileSync("./server/tasks/Holdrank/txt_all.txt",'utf-8');
            break;
        default:
            fileRankData = fs.readFileSync("./server/tasks/Holdrank/txt_active.txt",'utf-8');
            break; 
    }
    fileRankData.split(os.EOL).forEach(function(value, index, array) {
        if(value){
            holdrankArr[index] = value.split(':');
        }
    });
    dateLockData = fs.readFileSync("./server/tasks/Holdrank/txt_date.txt",'utf-8');
    dataLock = dateLockData.split(':');
    lockNum = dataLock[1];
    activeNum = allNum - lockNum;
    holdrankArr.forEach(function(value, index, array) {
        if(value){
            holdrankArr[index] = {'userid':value[0],'username':value[1],'activegxs':value[2],'lockgxs':value[3],'allgxs':value[4],'ranknum':index+1,'accountlink':'https://block.gxb.io/#/account/1.2.' +value[0],'peractive':parseFloat((value[2] / activeNum * 100).toFixed(4)),'perlock':parseFloat((value[3] / lockNum * 100).toFixed(4)),'perall':parseFloat((value[4] / allNum * 100).toFixed(4))};
        }
    });
    result = {'hold':holdrankArr,'locknum':lockNum,'uptime':dataLock[0]};
    return result;
}

export default {
  get_rank
};

