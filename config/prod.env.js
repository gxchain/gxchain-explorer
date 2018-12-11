let isTest = process.env.test;

module.exports = {
    NODE_ENV: '"production"',
    STA_SERVICE: isTest ? '"https://testnet.wallet.gxchain.org/statistics/gxchain"' : '"https://wallet.gxb.io/statistics/gxchain"',
    network: isTest ? JSON.stringify({
        blockchain: 'gxc',
        protocol: 'https',
        host: 'testnet.gxchain.org',
        port: 443,
        chainId: 'c2af30ef9340ff81fd61654295e98a1ff04b23189748f86727d0b26b40bb0ff4'
    }) : JSON.stringify({
        blockchain: 'gxc',
        protocol: 'https',
        host: 'node1.gxb.io',
        port: 443,
        chainId: '4f7d07969c446f8342033acb3ab2ae5044cbe0fde93db02de75bd17fa8fd84b8'
    })
};
