# GXChain区块浏览器(GXChain Explorer)

GXChain区块浏览器是构建在公信链(GXChain)上的一个查询工具,提供区块(Block)查询,交易(Transaction)查询和账户(Account)查询功能

GXChain Explorer is a search tool build on GXChain, supporting block search, transaction search, and account search.

> 任何一方可以无偿使用此浏览器或进行二次开发, 但请注明项目来源:Powered by GXChain

> Please keep our copyright "Powered by GXChain" if you want use it for free

Thanks [shuang-guo](https://github.com/shuang-guo) for providing english translation

## 功能 Function
- [x] 区块同步 Block synchronization
- [x] 区块查询 Block search
- [x] 账户查询 Account search
- [x] 交易查询 Transaction search
- [x] 可视化 Visualization
- [x] 多语言（已添加中文、英文）Multi-language supported（Chinese and English）

## 环境依赖 System requirement

必要环境(Required): Node 6+

建议系统(Operation system): OSX、Linux

## Node环境安装 Install under Node environment

建议使用NVM([Node Version Manager](https://github.com/creationix/nvm))进行安装:
Recommend to use NVM([Node Version Manager](https://github.com/creationix/nvm))for installation:

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.30.2/install.sh | bash
. ~/.nvm/nvm.sh
nvm install v6
nvm use v6
```

## 克隆项目 Clone project

```
git clone https://github.com/gxchain/gxbox.git
```

## 依赖安装 Install dependencies

调试模式依赖于babel-node, 在克隆的工程下执行以下命令安装依赖:
Test mode depends on babel-node, execute the following commands to install dependencies under cloned engineering mode:


```
npm install -g babel-node
npm install
```

## 开发模式启动 Development mode start

```
npm start
```

## 生产环境启动 Production environment start

```
NODE_ENV=production node server-dist/index.js
```

或者使用pm2启动(else use pm2 to start)

```
NODE_ENV=production pm2 start server-dist/index.js --name gxb-explorer
```

## API说明 API description

### 1. 根据区块高度获取区块信息 Acquire block information from block_height

```
/api/block/:block_height
```

### 2. 根据tx_id获取交易信息 Acquire transaction information from tx_id

```
/api/transaction/:tx_id
```

### 3. 根据账户id或账户名获取账户信息 Acquire account information from id or username

```
/api/account/:name_or_id
```

### 4. 根据账户id或账户名获取账户余额 Acquire balance information from id or username

```
/api/account_balance/:name_or_id
```

## 常见问题 FAQ

### 1. 提示GC Alert GC
区块太大可能导致内存不足, 可以修改BlocksyncTask.js中的sync_block_length,默认值为100(每次同步100个区块)

Block too big may cause insufficient memory, modify sync_block_length in BlocksyncTask.js,default is 100(synchronize 100 blocks everytime)

