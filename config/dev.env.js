var merge = require('webpack-merge');
var prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    STA_SERVICE: '"http://47.96.164.78:8218/gxchain/"'
});
