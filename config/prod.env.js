let isTest = process.env.test;
let isDev = process.env.dev;

var sta_service = '"https://wallet.gxb.io/statistics/gxchain"';
var es_plugin = '"https://block.gxb.io/search/gxchain*/data/_search?pretty=true"';
var network = JSON.stringify({
    blockchain: 'gxc',
    protocol: 'https',
    host: 'node1.gxb.io',
    port: 443,
    chainId: '4f7d07969c446f8342033acb3ab2ae5044cbe0fde93db02de75bd17fa8fd84b8'
});
if(isTest){
    sta_service = '"https://testnet.wallet.gxchain.org/statistics/gxchain"';
    es_plugin = '"https://testnet.gxchain.org/search/gxchain*/data/_search?pretty=true"';
    network = JSON.stringify({
        blockchain: 'gxc',
        protocol: 'https',
        host: 'testnet.gxchain.org',
        port: 443,
        chainId: 'c2af30ef9340ff81fd61654295e98a1ff04b23189748f86727d0b26b40bb0ff4'
    });
}
if(isDev){
    sta_service = '"http://47.96.164.78:8218/gxchain"';
    es_plugin = '"http://47.96.164.78:28090/search/gxchain*/data/_search?pretty=true"';
    JSON.stringify({
        blockchain: 'gxc',
        protocol: 'http',
        host: '47.96.164.78',
        port: 28090,
        chainId: 'bc59e6e7f500fa56504ce7101f7df8eb74151398f62167567adcf18a026928d1'
    })
}

module.exports = {
    NODE_ENV: '"production"',
    STA_SERVICE: sta_service,
    ES_PLUGIN: es_plugin,
    network: network
};
