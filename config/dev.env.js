var merge = require('webpack-merge');
var prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    // STA_SERVICE: '"https://testnet.wallet.gxchain.org/statistics/gxchain"',
    STA_SERVICE: '"https://wallet.gxb.io/statistics/gxchain"',
    network: JSON.stringify({
        blockchain: 'gxc',
        protocol: 'https',
        host: 'node1.gxb.io',
        port: 443,
        chainId: '4f7d07969c446f8342033acb3ab2ae5044cbe0fde93db02de75bd17fa8fd84b8'
    })
});
