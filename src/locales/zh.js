const locale = {
  // header
  header: {
    block: '区块',
    transaction: '交易',
    account: '账户',
    about: '关于',
    language: '语言: 中文',
    title: '公信宝区块链浏览器',
    subtitle: '提供区块、交易、账户等查询功能',
    search: '在此输入区块id、交易id、账户id或者账户名进行查询'
  },
  // index
  index: {
    latest_status: '最新状态',
    last_updated_at: '上次更新时间: {seconds}秒前',
    summary: {
      title: '区块信息',
      head_block_number: '最新区块',
      last_irreversible_block_num: '最新不可逆区块',
      block_interval: '出块时间(秒)',
      recently_missed_count: '最近缺失',
      total_supply: '总发行',
      circulating_supply: '当前供给'
    },
    witness: {
      title: '活跃见证人',
      witness: '见证人',
      last_confirmed_block: '最近确认区块',
      votes: '总票数'
    },
    committee: {
      title: '活跃理事会成员',
      account: '账户',
      votes: '总票数'
    }
  },
  // block
  block: {
    title: '区块信息',
    more: '更多',
    timestamp: '区块生成时间',
    witness: '见证人',
    previous: '上一区块',
    transactions: '交易数量',
    empty: '未查到区块信息',
    error:'发生错误, 获取区块信息失败',
  },
  // transaction
  transaction: {
    title: '交易信息',
    error:'发生错误, 获取交易信息失败',
    empty: '未查到交易信息'
  },
  // account
  account: {
    title: '账户信息',
    empty: '未查询到账户信息',
    membership: {
      lifetime: '终身会员',
      normal: '普通会员',
      merchant: '认证商户',
      datasource: '认证数据源',
      data_transaction_member: '交易认证节点'
    },
    basic: {
      title: '基本信息',
      more: '更多',
      account_name: '账户名',
      account_id: '账户ID',
      membership: '账户类型',
      referrer_name: '推荐人'
    },
    permissions: {
      title: '权限',
      active: "活跃权限",
      owner: "账户权限",
      threshold: '阈值'
    },
    balances: {
      title: '账户余额',
      asset: '资产',
      balance: '余额'
    }
  },
  // about
  about: {
    title: '关于公信宝区块链浏览器',
    version: '版本号',
    version_intro_title: '版本介绍',
    version_intro: '本版本实现了区块、交易记录和账户信息的功能,同时提供了网页和API两个两种方式进行查询, 不同的用户可以根据不同的需求进行选择',
    project_intro_title: '项目介绍',
    project_intro: '本项目是公信链（GXChain）的浏览器，GXChain基于Graphene底层进行开发，因此本项目也可支持所有基于Graphene的链，任何的项目可以无偿使用和任意修改，并且欢迎对此项目有兴趣的小伙伴来提交Pull Request，你的贡献将有可能获得GXS(公信股)作为奖励',
    github: '开源地址',
    about_company: '关于公信宝',
    company_intro1: '公信宝（杭州存信数据科技有限公司）成立于2016年，是一家基于区块链技术的去中心化数据交易所，适用于各行各业的数据交换。',
    company_intro2: '公信宝数据交易所具有不缓存数据、保护个人隐私、数据版权保护、数据新鲜度高、打击造假以及可以设置匿名交易等特点。',
    company_intro3: '面向的典型客户为互联网金融领域的网络贷款、汽车金融、消费金融、银行等企业以及有数据交换需求的政府部门、保险、医疗、物流等政企部门，以去中心化思维解决了各个行业的共享数据交换问题, 并可以为全社会所用，广泛使用于公民的学习、工作、生活等各种应用场景，最终实现公民的个人数据由公民自己来管理。'
  },
  // api
  api: {
    title: 'API说明',
    query_supply: '供应量查询',
    query_block: '区块查询',
    query_transaction: '交易查询',
    query_account: '账户查询',
    query_account_balance: '余额查询',
    get_account_header: '账户头像'
  }
}

export default locale
