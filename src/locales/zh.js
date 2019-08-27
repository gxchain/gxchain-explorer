const locale = {
    // header
    header: {
        block: '区块',
        transaction: '交易',
        account: '账户',
        asset: '资产',
        about: '关于',
        language: '语言: 中文',
        flag: 'zh',
        search: '在此输入区块id、交易id(txid)、账户id或者账户名进行查询',
        trustnode_election: '公信节点竞选',
        home: '首页',
        login: 'GXC Wallet登录',
        tools: '工具',
        fee: '网络费率',
        node_members: '节点成员',
        profile: '账户资料',
        download: '你还没有安装gscatter，是否前往安装？',
        logout: '退出'
    },
    // index
    index: {
        latest_status: '最新状态',
        last_updated_at: '上次更新时间: {seconds}秒前',
        voting: {
            title: '公信节点投票进度',
            participants: '投票账户数: {accounts}'
        },
        summary: {
            title: '区块信息',
            head_block_number: '最新区块',
            last_irreversible_block_num: '最新不可逆区块',
            block_interval: '出块时间(秒)',
            recently_missed_count: '最近缺失'
        },
        witness: {
            title: '活跃公信节点',
            witness: '公信节点',
            last_confirmed_block: '最近确认',
            votes: '得票数'
        },
        committee: {
            title: '活跃理事会成员',
            account: '账户',
            votes: '得票数'
        },
        candidate: {
            title: '公信节点候选人',
            account: '账号',
            comments: '备注',
            votes: '得票数',
            pre: '备注信息来源',
            margin: '保证金余额'
        },
        transactions: {
            title: '最近交易记录',
            type: '类型',
            content: '内容',
            time: '时间'
        },
        asset: {
            title: 'GXChain资产',
            symbol: '资产',
            issuer: '发行人',
            supply: '当前供给'
        },
        ranking: {
            title: '持仓排名',
            number: '序号',
            account: '账户',
            locked_balance: '锁仓资产',
            balance: '流通资产',
            total_balance: '总资产',
            percent: '流通占比'
        },
        statistics: {
            title: '10日交易统计',
            blockchain_run_duration: '{days}天 {hours}时 {minutes}分 {seconds}秒'
        },
        overview: {
            transactions: '总交易数',
            accounts: '账户数',
            duration: '运行时间'
        }
    },
    // block
    block: {
        id: '区块ID',
        title: '区块信息',
        more: '更多',
        timestamp: '区块生成时间',
        witness: '公信节点',
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
            'asset_reserve': {
                name: '销毁资产',
                fee: '手续费',
                account: '账户名',
                amount_to_reserve: '保留（销毁）数量'
            },
            'asset_fund_fee_pool': '积存资产费用池',
            'asset_settle': '资产结算',
            'asset_global_settle': '全局资产清算',
            'asset_publish_feed': '发布资产喂价',
            'committee_member_create': {
                name: '创建理事会成员',
                account: '理事会成员',
                url: '网址',
                fee: '手续费'
            },
            'committee_member_update': {
                name: '更新理事会成员信息',
                account: '理事会成员',
                url: '网址',
                fee: '手续费'
            },
            'witness_create': {
                name: '创建公信节点候选人',
                witness_account: '公信节点候选人',
                witness_url: '网址',
                signing_key: 'Signing Key',
                fee: '手续费'
            },
            'witness_update': {
                name: '更新公信节点候选人信息',
                witness_account: '公信节点候选人',
                witness_url: '网址',
                signing_key: 'Signing Key',
                fee: '手续费'
            },
            'witness_withdraw_pay': '公信节点取回报酬',
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
            'custom': {
                name: '自定义',
                payer: '付费人',
                fee: '手续费',
                data: '数据',
                toHex: '字符转16进制',
                toString: '16进制转字符'
            },
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
            'committee_member_update_global_parameters': '全局参数更新',
            'transfer_to_blind': '向隐私账户转账',
            'blind_transfer': '隐私转账',
            'transfer_from_blind': '从隐私账户转出',
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
            'proxy_transfer': {
                name: '代理转账',
                from: '来自',
                to: '发往',
                amount: '金额',
                memo: '备注(memo)',
                proxy_memo: '代理备注(proxy memo)',
                proxy_account: '代理转账人',
                fee: '手续费'
            },
            'create_contract': {
                name: '创建合约',
                account: '账户',
                contract_name: '合约名称',
                fee: '手续费'
            },
            'call_contract': {
                name: '调用合约',
                account: '账户',
                contract_name: '合约名称',
                method_name: '合约方法',
                params: '参数',
                fee: '手续费',
                amount: '发送资产'
            },
            'update_contract': {
                name: '更新合约',
                owner: '权限账户',
                new_owner: '新权限账户',
                contract_name: '合约名称',
                fee: '手续费'
            },
            'trust_node_pledge_withdraw': {
                name: '公信节点保证金赎回',
                witness_account: '账户',
                fee: '手续费'
            },
            'inline_transfer': {
                name: '合约内转账',
                from: '来自',
                amount: '金额',
                to: '发往',
                memo: '备注(Memo/Tag)',
                fee: '手续费'
            },
            'inter_contract_call': {
                name: '跨合约调用',
                account: '发起合约',
                contract_name: '接受合约',
                method_name: '方法名',
                data: '参数',
                fee: '手续费',
                amount: '发送资产'
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
            'asset_reserve': '{account} 保留（销毁）了 {amount}',
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
            'witness_create': '{account} 升级到公信节点候选人',
            'witness_update': '{account} 更新了公信节点候选人信息',
            'witness_pay': '提取候选人收入到账户',
            'witness_receive': 'Received witness from witness',
            'worker_create': '{account} 创建了预算提案，请求每日支付 {pay}',
            'committee_member_update_global_parameters': '{account} 更新了全局理事会参数',
            'committee_member_create': '{account} 升级到理事会成员',
            'committee_member_update': '{account} 更新了理事会成员信息',
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
            'balance_unlock': '{account} 完成一笔忠诚计划余额解冻操作',
            'proxy_transfer': '{account} 发起了一笔代理转账交易: {from} 发送 {amount} 到 {to}',
            'create_contract': '{account} 创建了智能合约 {contract_name}',
            'call_contract': '{account} 调用了智能合约 {contract_name} 的 {method_name} 方法',
            'call_contract_and_transfer': '{account} 调用了智能合约 {contract_name} 的 {method_name} 方法, 并发送 {amount} 到合约账户',
            'update_contract': '{account} 更新了智能合约 {contract_name}',
            'custom': '{account} 创建了一笔自定义操作',
            'trust_node_pledge_withdraw': '{account} 取回公信节点保证金',
            'inline_transfer': '合约账户 {from} 发送 {amount} 到 {to}, 备注: {memo}',
            'inter_contract_call': '合约账户 {sender_contract} 跨合约调用了合约账户 {contract_name} 的 {method_name} 方法',
            'inter_contract_call_and_transfer': '合约账户 {sender_contract} 跨合约调用了合约账户 {contract_name} 的 {method_name} 方法, 并发送 {amount} 到合约账户'
        }
    },
    // account
    account: {
        title: '账户信息',
        empty: '未查询到账户信息',
        membership: {
            lifetime: '终身会员',
            normal: '普通账户',
            contract: '合约账户',
            trustnode: '候选公信节点'
        },
        basic: {
            title: '基本信息',
            more: '更多',
            no_more: '没有更多了',
            account_name: '账户名',
            account_id: '账户ID',
            membership: '账户类型',
            referrer_name: '推荐人',
            contract_info: '合约信息',
            commit: '提交',
            pending_claim: '合约待认领'
        },
        contract: {
            abi: {
                title: '合约ABI'
            },
            code: {
                title: '合约代码'
            },
            database: {
                title: '数据表',
                no_record: '没有更多数据'
            }
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
            balance: '余额',
            empty: '无资产'
        },
        locked_balance: '锁仓余额(GXC)',
        pledge_balance: '保证金余额(GXC)'
    },
    // asset
    asset: {
        issuer: '发行人',
        precision: '精度',
        max_supply: '发行总量',
        current_supply: '流通量',
        gxc: 'GXC的实际流通量 = 流通量 - 基金会管理的GXC'
    },
    // about
    about: {
        title: '关于GXChain区块浏览器',
        version: '版本号',
        version_intro_title: '版本介绍',
        version_intro: '本版本实现了区块、交易记录和账户信息的功能,同时提供了网页和API两个两种方式进行查询, 不同的用户可以根据不同的需求进行选择',
        project_intro_title: '项目介绍',
        project_intro: '本项目是公信链（GXChain）的浏览器，GXChain基于Graphene底层进行开发，因此本项目也可支持所有基于Graphene的链，任何的项目可以无偿使用和任意修改，并且欢迎对此项目有兴趣的小伙伴来提交Pull Request，你的贡献将有可能获得GXC作为奖励',
        github: '开源地址',
        about_company: '关于GXChain',
        company_intro1: '公信链（GXChain）是一条为全球数据经济服务的基础链，旨在打造可信数据的价值网络。',
        company_intro2: '公信链具有基于DPoS共识机制的石墨烯底层架构的性能优势，同时具备G-ID、GVM、BaaS、Blockcity pay等链上配套功能，方便各类应用开发。',
        company_intro3: '基于公信链的Dapp布洛克城已经拥有百万级实名用户，为链上应用和合作伙伴提供丰富的数据资源；面向企业服务的公信宝数据交易所也已上线，服务企业数量超过数百家。公信链基于区块链的分布式特性、密码学等技术手段和通证设计，为数据经济的发展提供了全新的区块链解决思路，引领了数据服务的新变革。公信链开发了丰富的可信数据组件，逐渐打通数据上链、数据储存、数据计算、数据交换的各个环节，并且已经有了众多落地的应用和实践。'
    },
    // api
    api: {
        title: 'API说明',
        query_supply: '供应量查询',
        query_block: '区块查询',
        query_transaction: '交易查询',
        query_account: '账户查询',
        query_account_history: '账户历史查询',
        query_account_balance: '余额查询',
        get_account_header: '账户头像',
        assets: '资产列表:',
        asset_info: '资产信息:',
        candidates: '候选公信节点:'
    },
    fee: {
        mark: '在GXChain系统中，每一种操作都将花费相应手续费。手续费率可能发生变化。然而，手续费的调整需要获得股东的授权。所以每一位持有GXChain核心资产的股东对费率的构成都有话语权。如果股东确信某种手续费的降低将带来好处，并且达成共识，那么该种手续费则由区块链自动进行调低。区块链参数的改变由理事会成员提出动议。这些成员由全体股东投票选举产生，以提高系统灵活性和响应率。',
        feeGroups: {
            general_row: '一般费率',
            asset_row: '资产相关',
            market: '市场相关',
            account_row: '账户相关',
            business_row: '业务管理'
        },
        title: {
            action: '操作',
            type: '手续费类型',
            fee: '标准手续费',
            feeltm: '终身会员手续费'
        },
        trxTypes: {
            all: '显示全部',
            transfer: '转账',
            limit_order_create: '限价单',
            limit_order_cancel: '取消限价单',
            call_order_update: '更新订单',
            account_create: '创建账户',
            account_update: '更新账户',
            account_whitelist: '账户白名单',
            account_upgrade: '升级账户',
            account_transfer: '账户转移',
            asset_create: '创建资产',
            asset_update: '更新资产',
            asset_update_bitasset: '更新智能币',
            asset_update_feed_producers: '更新资产喂价者',
            asset_issue: '资产发行',
            asset_reserve: '销毁资产',
            asset_fund_fee_pool: '积存资产费用池',
            asset_settle: '资产结算',
            asset_global_settle: '全局资产清算',
            asset_publish_feed: '发布资产喂价',
            committee_member_create: '创建理事会成员',
            witness_create: '创建公信节点候选人',
            witness_withdraw_pay: '公信节点取回报酬',
            proposal_create: '创建提案',
            proposal_update: '更新提案',
            proposal_delete: '删除提案',
            withdraw_permission_create: '创建提取权限',
            withdraw_permission_update: '更新提取权限',
            withdraw_permission_claim: '主张提取权限',
            withdraw_permission_delete: '删除提取权限',
            fill_order: '订单撮合',
            delegate_update_global_parameters: '全局参数更新',
            vesting_balance_create: '创建冻结账目余额',
            vesting_balance_withdraw: '提取解冻账户余额',
            worker_create: '创建雇员',
            custom: '自定义',
            assert: '断言操作',
            balance_claim: '领取余额',
            override_transfer: '优先覆盖转账',
            witness_update: '更新公信节点候选人信息',
            committee_member_update_global_parameters: '全局参数更新',
            transfer_to_blind: '向隐私账户转账',
            blind_transfer: '隐私转账',
            transfer_from_blind: '从隐私账户转出',
            committee_member_update: '更新理事会成员信息',
            asset_claim_fees: '领取资产手续费',
            account_upgrade_merchant: '商户认证',
            account_upgrade_datasource: '数据源认证',
            data_market_category_create: '创建类目',
            data_market_category_update: '更新类目',
            free_data_product_create: '创建自由市场数据产品',
            free_data_product_update: '更新自由市场数据产品',
            league_data_product_create: '创建联盟数据产品',
            league_data_product_update: '更新联盟数据产品',
            league_create: '创建联盟',
            league_update: '更新联盟',
            data_transaction_create: '发起数据交易',
            data_transaction_update: '更新数据交易',
            data_transaction_pay: '数据支付',
            account_upgrade_data_transaction_member: '交易节点认证',
            data_transaction_datasource_upload: '数据存证',
            data_transaction_datasource_validate_error: '数据交易失败',
            balance_lock: '冻结余额',
            balance_unlock: '解冻余额',
            proxy_transfer: '代理转账',
            create_contract: '创建合约',
            call_contract: '调用合约',
            update_contract: '更新合约',
            trust_node_pledge_withdraw: '公信节点保证金赎回',
            inline_transfer: '合约内转账',
            inter_contract_call: '跨合约调用'
        },
        feeTypes: {
            _none: '免费',
            fee: '普通转账手续费',
            price_per_kbyte: '交易字节数，每千字节手续费',
            basic_fee: '普通用户名手续费',
            premium_fee: '高级用户名手续费',
            membership_annual_fee: '年度会籍',
            membership_lifetime_fee: '终身会籍',
            symbol3: '资产符号长度3位',
            symbol4: '资产符号长度4位',
            long_symbol: '更长的资产符号',
            price_per_output: ''
        }
    },
    // contract
    contract: {
        title: '合约调用',
        method: '方法',
        payable_asset: '附带资产',
        params: '参数',
        output: '输出结果'
    },
    // tools
    tools: {
        title: '工具',
        no_data: '暂无数据',
        logo: '请先登录',
        browser_not_support: '浏览器不支持',
        bulk_transfer: {
            title: ' 批量转账',
            des: '支持公信链上资产批量转账，适用于社区空投、批量奖励发放',
            download_template: '下载模版',
            import: '导入',
            execute: '执行',
            clear: '清空',
            refresh: '刷新',
            export: '导出',
            filter: '筛选',
            import_all: '本次导入',
            article: '条',
            all: '全部',
            success: '成功',
            fail: '失败',
            processing: '进行中',
            transfer_processing: '转账进行中',
            transfer_success: '转账成功',
            transfer_fail: '转账失败'
        }
    }
};

export default locale;
