let isTest = process.env.test;

module.exports = {
    NODE_ENV: '"production"',
    STA_SERVICE: isTest ? '"http://47.96.164.78:8218/gxchain/"' : '"https://wallet.gxb.io/statistics/gxchain/"',
};
