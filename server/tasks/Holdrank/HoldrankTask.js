import {Apis} from "gxbjs-ws";
import fs from "fs";
import os from "os";
import child_process from "child_process";
import cron from "cron"; 

let wintness = "wss://node5.gxb.io",
all_lock = 0,
date_lock_str = '',
path = "./server/tasks/Holdrank/txt_accountinfo.txt",
datepath = "./server/tasks/Holdrank/txt_date.txt",
allpath = "./server/tasks/Holdrank/txt_all.txt",
activepath = "./server/tasks/Holdrank/txt_active.txt",
lockpath = "./server/tasks/Holdrank/txt_lock.txt",
account_count = 0;


new cron.CronJob('* */6 * * *', function () {  
    console.log('start');
    console.log(dateFtt('yyyy-MM-dd hh:mm:ss',new Date()));

    Apis.instance(wintness, true).init_promise.then((res) => {
        all_lock = account_count = 0;
        if(fs.existsSync(path)){
            fs.unlinkSync(path);
        }
        Apis.instance().db_api().exec('get_account_count', [false]).then(function (resp) {
            account_count = resp;
            accountinfo(resp-1);
        }).catch(function(){});
    }).catch(function(){});

}, null, true, 'UTC');  


function accountinfo(accountNum){
    for (var i = accountNum; i >= 0; i--) {
        Apis.instance().db_api().exec('get_full_accounts', [['1.2.'+i],false]).then(function (resp) {
                let active = 0,lock = 0,all = 0,userid = 0,info = [],str = '';
                info = resp[0][1];
                info['balances'].forEach(function(value, index, array) {
                    if (value['asset_type'] == '1.3.1') {
                        active += parseInt(value['balance'] / 100000);
                    }
                });
                info['locked_balances'].forEach(function(value, index, array) {
                    if (value['amount']['asset_id'] == '1.3.1') {
                        lock += parseInt(value['amount']['amount'] / 100000);
                    }
                });

                all = active + lock;
                all_lock += lock;
                userid = resp[0][0].replace('1.2.','');
                str = userid +':'+ info['account']['name'] + ':' + active + ':' + lock + ':' + all + os.EOL;
                fs.appendFile(path, str,  function(err) {
                    account_count --;
                    if (account_count <= 0) {
                        console.log('文件记录完毕');
                        console.log(dateFtt('yyyy-MM-dd hh:mm:ss',new Date()));

                        date_lock_str = dateFtt('yyyy-MM-dd',new Date()) + ':' + all_lock;
                        fs.writeFile(datepath, date_lock_str,  function(err) {
                        });
                        runsort();
                    };
                });
            }).catch(function(){});
    }
    
}

function runsort(){
    let cmd = '';
    cmd += 'sort -n -r -k 3 -t : '+ path +' -o '+ path +' && head -n 100 '+ path +' > ' + activepath;
    cmd += ' && sort -n -r -k 5 -t : '+ path +' -o '+ path +' && head -n 100 '+ path +' > '+ allpath;
    cmd += ' && sort -n -r -k 4 -t : '+ path +' -o '+ path +' && head -n 100 '+ path +' >  '+ lockpath;

    child_process.exec(cmd, function(err,stdout,stderr){
        if(err) {
            console.log('cmd error:'+stderr);
        } else {    
        }
    });
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function dateFtt(fmt,date)   
{ 
    var o = {   
    "M+" : date.getMonth()+1,                 //月份   
    "d+" : date.getDate(),                    //日   
    "h+" : date.getHours(),                   //小时   
    "m+" : date.getMinutes(),                 //分   
    "s+" : date.getSeconds(),                 //秒   
    "q+" : Math.floor((date.getMonth()+3)/3), //季度   
    "S"  : date.getMilliseconds()             //毫秒   
    };   
    if(/(y+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
    }
    for(var k in o){
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
        }
    }
    return fmt;   
} 