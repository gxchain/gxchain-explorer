// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path');

let isTest = process.env.test;
let isDev = process.env.dev;
let witnesses = [
  // 'ws://172.19.19.148:28090',
  // 'ws://172.19.19.149:28090'
  'wss://node1.gxb.io',
  'wss://node5.gxb.io',
  'wss://node8.gxb.io',
  'wss://node11.gxb.io',
  'wss://node15.gxb.io',
  'wss://node16.gxb.io',
  'wss://node17.gxb.io'
];
if (isTest) {
  witnesses = ['wss://testnet.gxchain.org'];
}
if (isDev) {
  witnesses = ['ws://47.96.164.78:28090'];
}

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: false,
    witnesses: witnesses,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    witnesses: [
      'wss://testnet.gxchain.org'
      // 'wss://node5.gxb.io',
      // 'wss://node8.gxb.io',
      // 'wss://node11.gxb.io',
      // 'wss://node15.gxb.io',
      // 'wss://node16.gxb.io',
      // 'wss://node17.gxb.io'
    ],
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
};
