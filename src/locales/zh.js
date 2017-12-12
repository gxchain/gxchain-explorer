const locale = {
    // header
    header: {
        block: '区块',
        transaction: '交易',
        account: '账户',
        about: '关于',
        language: '语言: 中文',
        flag: 'zh',
        title: '公信宝区块链浏览器',
        subtitle: '提供区块、交易、账户等查询功能',
        search: '在此输入区块id、交易id(txid)、账户id或者账户名进行查询'
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
            last_confirmed_block: '最近确认',
            votes: '总票数'
        },
        committee: {
            title: '活跃理事会成员',
            account: '账户',
            votes: '总票数'
        },
        transactions: {
            title: '最近交易记录',
            type: '类型',
            content: '内容',
            time: '时间'
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
        error: '发生错误, 获取区块信息失败'
    },
    // transaction
    transaction: {
        title: '交易信息',
        error: '发生错误, 获取交易信息失败',
        empty: '未查到交易信息，可能原因：交易信息尚未记录到不可逆区块',
        current_block_number: '当前区块',
        trx_type: '类型',
        trx_op: '操作信息',
        trxTypes: {
            'all': '显示全部',
            'transfer': {
                name: '转账',
                from: '来自',
                amount: '金额',
                to: '发往',
                fee: '手续费'
            },
            'limit_order_create': '限价单',
            'limit_order_cancel': '取消限价单',
            'call_order_update': '更新订单',
            'account_create': {
                name: '创建账户',
                fee: '手续费',
                registrar: '注册人',
                referrer: '推荐人',
                account: '账户名'
            },
            'account_update': {
                name: '更新账户',
                fee: '手续费',
                account: '账户名'
            },
            'account_whitelist': {
                name: '账户白名单',
                fee: '手续费',
                authorizing_account: '授权账户',
                account_to_list: '被操作账户',
                new_listing: '操作',
                whitelist_states: {
                    no_listing: '从列表移除',
                    white_listed: '加入白名单',
                    black_listed: '加入黑名单',
                    white_and_black_listed: '加入白/黑名单'
                }
            },
            'account_upgrade': {
                name: '升级账户',
                account_to_upgrade: '升级账户',
                fee: '手续费',
                upgrade_to_lifetime_member: '认证为终身会员'
            },
            'account_transfer': {
                name: '账户转移',
                account_id: '原账户',
                new_owner: '新账户',
                fee: '手续费'
            },
            'asset_create': {
                name: '创建资产',
                fee: '手续费',
                issuer: '发行人',
                symbol: '代码',
                precision: '精度',
                max_supply: '最大供给量',
                description: '描述',
                market_fee: '市场手续费',
                maximum_market_fee: '最大市场手续费'
            },
            'asset_update': '更新资产',
            'asset_update_bitasset': '更新智能币',
            'asset_update_feed_producers': '更新资产喂价者',
            'asset_issue': {
                name: '资产发行',
                fee: '手续费',
                issuer: '发行人',
                asset_to_issue: '发行数量',
                issue_to_account: '发往'
            },
            'asset_reserve': '销毁资产',
            'asset_fund_fee_pool': '积存资产费用池',
            'asset_settle': '资产结算',
            'asset_global_settle': '全局资产清算',
            'asset_publish_feed': '发布资产喂价',
            'committee_member_create': '创建理事会成员',
            'witness_create': '创建见证人',
            'witness_withdraw_pay': '见证人取回报酬',
            'proposal': {
                proposal_create: '创建提案',
                proposal_update: '更新提案',
                proposal_delete: '删除提案',
                review_period: '复审期开始',
                expiration_time: '过期时间',
                proposed_ops: '提议操作',
                fee_paying_account: '付费账户',
                fee: '手续费',
                update: {
                    active_approvals_to_add: '要添加的活跃权限许可',
                    active_approvals_to_remove: '要移除的活跃权限许可',
                    owner_approvals_to_add: '要添加的账户权限许可',
                    owner_approvals_to_remove: '要移除的账户权限许可',
                    key_approvals_to_add: '要添加的公钥许可',
                    key_approvals_to_remove: '要移除的公钥许可'
                }
            },
            'withdraw_permission_create': '创建提取权限',
            'withdraw_permission_update': '更新提取权限',
            'withdraw_permission_claim': '主张提取权限',
            'withdraw_permission_delete': '删除提取权限',
            'fill_order': '订单撮合',
            'delegate_update_global_parameters': '全局参数更新',
            'vesting_balance_create': '创建冻结账目余额',
            'vesting_balance_withdraw': {
                name: '提取解冻账户余额',
                owner: '发往',
                amount: '金额',
                fee: '手续费'
            },
            'worker_create': '创建雇员',
            'custom': '自定义',
            'assert': '断言操作',
            'balance_claim': '领取余额',
            'override_transfer': {
                name: '优先覆盖转账',
                fee: '手续费',
                issuer: '发行人',
                from: '来自',
                to: '发往',
                amount: '金额'
            },
            'witness_update': '更新见证人',
            'committee_member_update_global_parameters': '全局参数更新',
            'transfer_to_blind': '向隐私账户转账',
            'blind_transfer': '隐私转账',
            'transfer_from_blind': '从隐私账户转出',
            'committee_member_update': '更新理事会成员账户',
            'asset_claim_fees': '领取资产手续费',
            'account_upgrade_merchant': {
                name: '商户认证',
                account_to_upgrade: '升级账户',
                auth_referrer: '授权账户',
                upgrade_to_merchant_member: '认证为认证商户',
                fee: '手续费'
            },
            'account_upgrade_datasource': {
                name: '数据源认证',
                account_to_upgrade: '升级账户',
                auth_referrer: '授权账户',
                upgrade_to_datasource_member: '认证为数据源',
                fee: '手续费'
            },
            'data_market_category_create': {
                name: '创建类目',
                category_name: '类目名称',
                issuer: '发行人',
                fee: '手续费',
                create_date_time: '创建时间'
            },
            'data_market_category_update': {
                name: '更新类目',
                category: '类目ID',
                new_category_name: '类目名称',
                new_status: '新状态',
                fee: '手续费'
            },
            'free_data_product_create': {
                name: '创建自由市场数据产品',
                product_name: '产品名称',
                issuer: '发行人',
                fee: '手续费',
                create_date_time: '创建时间'
            },
            'free_data_product_update': {
                name: '更新自由市场数据产品',
                free_data_product: '产品ID',
                new_product_name: '新产品名称',
                new_status: '新状态',
                fee: '手续费'
            },
            'league_data_product_create': {
                name: '创建联盟数据产品',
                product_name: '产品名称',
                issuer: '发行人',
                fee: '手续费',
                create_date_time: '创建时间'
            },
            'league_data_product_update': {
                name: '更新联盟数据产品',
                free_data_product: '产品ID',
                new_product_name: '新产品名称',
                new_status: '新状态',
                fee: '手续费'
            },
            'league_create': {
                name: '创建联盟',
                league_name: '联盟名称',
                fee: '手续费',
                create_date_time: '创建时间'
            },
            'league_update': {
                name: '更新联盟',
                league: '联盟ID',
                new_league_name: '新联盟名称',
                new_status: '新状态',
                fee: '手续费'
            },
            'data_transaction_create': {
                name: '发起数据交易',
                request_id: '请求ID',
                product_id: '产品名称',
                version: '版本',
                fee: '手续费',
                requester: '发起人',
                create_date_time: '创建时间'
            },
            'data_transaction_update': {
                name: '更新数据交易',
                request_id: '请求ID',
                fee: '手续费',
                new_requester: '新发起人',
                new_status: '新状态'
            },
            'data_transaction_pay': {
                name: '数据支付',
                fee: '手续费',
                from: '来自',
                to: '发往',
                amount: '金额',
                request_id: '请求ID'
            },
            'account_upgrade_data_transaction_member': {
                name: '交易节点认证',
                fee: '手续费',
                account_to_upgrade: '升级账户',
                upgrade_to_data_transaction_member: '认证为交易确认节点'
            },
            'data_transaction_datasource_upload': {
                name: '数据存证',
                request_id: '请求ID',
                requester: '发起人',
                datasource: '数据源',
                fee: '手续费'
            },
            'data_transaction_datasource_validate_error': {
                name: '数据交易失败',
                request_id: '请求ID',
                datasource: '数据源',
                fee: '手续费'
            },
            'balance_lock': {
                name: '冻结余额',
                create_date_time: '开始时间',
                amount: '锁定金额',
                program_id: '锁仓期限',
                term: '个月',
                interest_rate: '奖励年化'
            },
            'balance_unlock': {
                name: '解冻余额',
                account: '解锁账户',
                lock_id: '锁定ID'
            },
            'status_states': {
                0: '未发布',
                1: '已发布',
                2: '已删除'
            }
        },
        operation: {
            'pending': ' %(blocks)s 个区块待定',
            'no_recent': '近期无交易',
            'reg_account': '{registrar} 注册了账户 {new_account}',
            'transfer': '{from} 发送 {amount} 到 {to}',
            'account_create': '{registrar} 注册了账户 {account}',
            'account_transfer': '{account} 转移了账户 {new_account}',
            'proposal_create': '{account} 创建了拟议交易',
            'proposal_update': '{account} 更新了拟议交易',
            'proposal_delete': '{account} 删除了拟议交易',
            'fill_order': '{account} 以 {price} 的价格购买了 {received}',
            'vesting_balance_withdraw': '{account} 提取了解冻金额 {amount}',
            'balance_claim': '{account} 领取了余额 {amount}',
            'publish_feed': '{account} 发布了喂价 {price}',
            'set_proxy': '{account} 设置 {proxy} 为他的投票代理',
            'update_account': '{account} 更新了它的账户信息',
            'limit_order_sell': '{account} 提交卖单，以 {price} 的价格卖出 {amount} ',
            'limit_order_buy': '{account} 提交买单，以 {price} 的价格买入 {amount} ',
            'call_order_update': '{account} 调整了 {debtSymbol} 债务 {debt} ，以及抵押 {collateral}',
            'asset_reserve': '{account} 保留了 {amount}',
            'asset_issue': '{account} 发行了 {amount} 到 {to}',
            'asset_create': '{account} 创建了资产 {asset}',
            'asset_update': '{account} 更新了资产 {asset}',
            'lifetime_upgrade_account': '{account} 升级到终身会员',
            'annual_upgrade_account': '{account} 升级到年度会员',
            'unlisted_by': '{lister} 将 {listee} 移出清单',
            'whitelisted_by': '{lister} 将 {listee} 加入白名单',
            'blacklisted_by': '{lister} 将 {listee} 加入黑名单',
            'limit_order_cancel': '{account} 取消了订单 #%(order)s',
            'transfer_account': '{account} 所有权转移到 {to}',
            'asset_update_feed_producers': '{account} 更新了资产 {asset} 的喂价者',
            'asset_fund_fee_pool': '{account} 向 {asset} 手续费池注入 {amount}',
            'asset_settle': '{account} 请求清算 {amount}',
            'asset_global_settle': '{account} 请求以 {price} 的价格进行全局清算 {asset}',
            'witness_create': '{account} 升级到见证人',
            'witness_update': '{account} 更新了见证人信息',
            'witness_pay': '提取见证人收入到账户',
            'witness_receive': 'Received witness from witness',
            'worker_create': '{account} 创建了预算提案，请求每日支付 {pay}',
            'committee_member_update_global_parameters': '{account} 更新了全局理事会参数',
            'override_transfer': '{issuer} 从 {from} 到 {to} 发送 {amount} ',
            'account_upgrade_merchant': '{account} 认证为商户',
            'account_upgrade_datasource': '{account} 认证为数据源',
            'data_market_category_create': '{issuer} 创建了类目 {category}',
            'data_market_category_update': '{issuer} 决议通过并更新了类目 {category}',
            'free_data_product_create': '{issuer} 创建了自由市场数据产品 {product}',
            'free_data_product_update': '{issuer} 决议通过并更新了自由市场数据产品 {product}',
            'league_data_product_create': '{issuer} 创建了联盟数据产品 {product}',
            'league_data_product_update': '{issuer} 决议通过并更新了联盟数据产品 {product}',
            'league_create': '{issuer} 创建了联盟 {league}',
            'league_update': '{issuer} 决议通过并更新了联盟 {league}',
            'data_transaction_create': '{account} 发起了一笔数据交易请求',
            'data_transaction_update': '{account} 更新了一笔数据交易请求状态',
            'data_transaction_pay': '{from} 支付金额为 {amount} 的数据购买费用到 {to}',
            'account_upgrade_data_transaction_member': '{account} 升级为交易确认节点',
            'data_transaction_datasource_upload': '{account} 验证了数据源 {datasource} 的数据上传',
            'data_transaction_datasource_validate_error': '{account} 数据返回验证失败',
            'balance_lock': '{account} 参与忠诚计划，冻结了 {amount}',
            'balance_unlock': '{account} 完成一笔忠诚计划余额解冻操作'
        }
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
            active: '活跃权限',
            owner: '账户权限',
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
    },
    holdrank: {
        locknum: '目前冻结的GXS总量',
        last_updated_at: '本次更新日期: {datetime}',
        rank: {
            active: '激活排行',
            lock: '冻结排行',
            all: '总量排行'
        },
        table: {
            userid: '账户id',
            username: '账户名',
            activegxs: '激活中的GXS',
            peractive: '占激活百分比',
            lockgxs: '冻结中的GXS',
            perlock: '占冻结百分比',
            allgxs: '总量GXS(激活+冻结)',
            perall: '占总量百分比'
        }
    }

};

export default locale;
