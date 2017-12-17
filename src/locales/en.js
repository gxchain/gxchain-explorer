const locale = {
    // header
    header: {
        block: 'Block',
        transaction: 'Transaction',
        account: 'Account',
        about: 'About',
        language: 'Language: English',
        flag: 'en',
        title: 'GXS Block Explorer',
        subtitle: 'Find Block, Transaction and Account',
        search: 'Enter block number, txid, account name or id here'
    },
    // index
    index: {
        latest_status: 'Latest Status',
        last_updated_at: 'Updated at: {seconds}s ago',
        summary: {
            title: 'Summary',
            head_block_number: 'Head Block',
            last_irreversible_block_num: 'Latest Irreversible Block',
            block_interval: 'Block Interval(s)',
            recently_missed_count: 'Recently Missed',
            total_supply: 'Total Supply',
            circulating_supply: 'Circulating Supply'
        },
        witness: {
            title: 'Active Witnesses',
            witness: 'Witness',
            last_confirmed_block: 'Confirmed',
            votes: 'Votes'
        },
        committee: {
            title: 'Active Committees',
            account: 'Account',
            votes: 'Votes'
        },
        transactions: {
            title: 'Recent Transaction Records',
            type: 'Type',
            content: 'Content',
            time: 'Time'
        }
    },
    // block
    block: {
        title: 'Block Info',
        more: 'More',
        timestamp: 'Timestamp',
        witness: 'Witness',
        previous: 'Previous Block',
        transactions: 'Transactions',
        empty: 'No record',
        error: 'Fetch error'
    },
    // transaction
    transaction: {
        title: 'Transaction Info',
        empty: 'No record, Possible reason: The transaction information has not yet been recorded to the irreversible block',
        error: 'Fetch error',
        current_block_number: 'Current Block',
        trx_op: 'Operation Info',
        trx_type: 'Type',
        trxTypes: {
            'all': 'Show all',
            'transfer': {
                name: 'Transfer',
                from: 'From',
                amount: 'Amount',
                to: 'To',
                fee: 'Fee'
            },
            'limit_order_create': 'Place order',
            'limit_order_cancel': 'Cancel order',
            'call_order_update': 'Update margin',
            'account_create': {
                name: 'Create account',
                fee: 'Fee',
                registrar: 'Registrar',
                referrer: 'Referrer',
                account: 'Account'
            },
            'account_update': {
                name: 'Update account',
                fee: 'Fee',
                account: 'Account'
            },
            'account_whitelist': {
                name: 'Account whitelist',
                fee: 'Fee',
                authorizing_account: 'Authorizing account',
                account_to_list: 'Listed account',
                new_listing: 'New listing',
                whitelist_states: {
                    no_listing: 'Unlisted',
                    white_listed: 'Whitelisted',
                    black_listed: 'Blacklisted',
                    white_and_black_listed: 'Whitelisted and blacklisted'
                }
            },
            'account_upgrade': {
                name: 'Upgrade Account',
                account_to_upgrade: 'Upgrade account',
                fee: 'Fee',
                upgrade_to_lifetime_member: 'Upgrade to lifetime member'
            },
            'account_transfer': {
                name: 'Transfer Account',
                account_id: 'Account id',
                new_owner: 'New Owner',
                fee: 'Fee'
            },
            'asset_create': {
                name: 'Create asset',
                fee: 'Fee',
                issuer: 'Issuer',
                symbol: 'Symbol',
                precision: 'Precision',
                max_supply: 'Maximum supply',
                description: 'Description',
                market_fee: 'Market fee',
                maximum_market_fee: 'Maximum market fee'
            },
            'asset_update': 'Update asset',
            'asset_update_bitasset': 'Update SmartCoin',
            'asset_update_feed_producers': 'Update asset feed producers',
            'asset_issue': {
                name: 'Issue asset',
                fee: 'Fee',
                issuer: 'Issuer',
                asset_to_issue: 'Amount to issue',
                issue_to_account: 'To'
            },
            'asset_reserve': 'Reserve asset',
            'asset_fund_fee_pool': 'Fund asset fee pool',
            'asset_settle': 'Asset settlement',
            'asset_global_settle': 'Global asset settlement',
            'asset_publish_feed': 'Publish feed',
            'committee_member_create': 'Create committee member',
            'committee_member_update': 'Update committee member',
            'witness_create': 'Create witness',
            'witness_update': 'Update witness',
            'witness_withdraw_pay': 'Witness pay withdrawal',
            'proposal': {
                proposal_create: 'Create proposal',
                proposal_update: 'Update proposal',
                proposal_delete: 'Delete proposal',
                review_period: 'Review period begin',
                expiration_time: 'Expiration time',
                proposed_ops: 'Proposed operations',
                fee_paying_account: 'Fee paying account',
                fee: 'Fee',
                update: {
                    active_approvals_to_add: 'Active approvals to add',
                    active_approvals_to_remove: 'Active approvals to remove',
                    owner_approvals_to_add: 'Owner approvals to add',
                    owner_approvals_to_remove: 'Owner approvals to remove',
                    key_approvals_to_add: 'Key approvals to add',
                    key_approvals_to_remove: 'Key approvals to remove'
                }
            },
            'withdraw_permission_create': 'Create withdrawal permission',
            'withdraw_permission_update': 'Update withdrawal permission',
            'withdraw_permission_claim': 'Claim withdrawal permission',
            'withdraw_permission_delete': 'Delete withdrawal permission',
            'fill_order': 'Fill order',
            'committee_member_update_global_parameters': 'Global parameters update',
            'vesting_balance_create': 'Create vesting balance',
            'vesting_balance_withdraw': {
                name: 'Withdraw vesting balance',
                owner: 'To',
                amount: 'Amount',
                fee: 'Fee'
            },
            'worker_create': 'Create budget item',
            'custom': 'Custom',
            'assert': 'Assert operation',
            'balance_claim': 'Claim balance',
            'override_transfer': {
                name: 'Override transfer',
                fee: 'Fee',
                issuer: 'Issuer',
                from: 'From',
                to: 'To',
                amount: 'Amount'
            },
            'transfer_to_blind': 'Transfer to blinded account',
            'blind_transfer': 'Blinded transfer',
            'transfer_from_blind': 'Transfer from blinded account',
            'asset_claim_fees': 'Claim asset fees',
            'account_upgrade_merchant': {
                name: 'Merchant verify',
                account_to_upgrade: 'Upgrade account',
                auth_referrer: 'Auth referrer',
                upgrade_to_merchant_member: 'Upgrade to merchant member',
                fee: 'Fee'
            },
            'account_upgrade_datasource': {
                name: 'DataSource verify',
                account_to_upgrade: 'Upgrade account',
                auth_referrer: 'Auth referrer',
                upgrade_to_datasource_member: 'Upgrade to datasource member',
                fee: 'Fee'
            },
            'data_market_category_create': {
                name: 'Market category created',
                category_name: 'Category name',
                issuer: 'Issuer',
                fee: 'Fee',
                create_date_time: 'Create datetime'
            },
            'data_market_category_update': {
                name: 'Market category updated',
                category: 'Category id',
                new_category_name: 'New category name',
                new_status: 'New status',
                fee: 'Fee'
            },
            'free_data_product_create': {
                name: 'Data item for free marked created',
                product_name: 'Product name',
                issuer: 'Issuer',
                fee: 'Fee',
                create_date_time: 'Create datetime'
            },
            'free_data_product_update': {
                name: 'Data item form free market updated',
                free_data_product: 'Product id',
                new_product_name: 'New product name',
                new_status: 'New status',
                fee: 'Fee'
            },
            'league_data_product_create': {
                name: 'Data item for alliance created',
                product_name: 'Product name',
                issuer: 'Issuer',
                fee: 'Fee',
                create_date_time: 'Create datetime'
            },
            'league_data_product_update': {
                name: 'Data item for alliance updated',
                free_data_product: 'Product id',
                new_product_name: 'New product name',
                new_status: 'New status',
                fee: 'Fee'
            },
            'league_create': {
                name: 'Alliance created',
                legue_name: 'Legue name',
                fee: 'Fee',
                create_date_time: 'Create datetime'
            },
            'league_update': {
                name: 'Alliance updated',
                legue: 'Legue id',
                new_legue_name: 'New legue name',
                new_status: 'New status',
                fee: 'Fee'
            },
            'data_transaction_create': {
                name: 'Data transaction created',
                request_id: 'Request id',
                product_id: 'Product name',
                version: 'Version',
                fee: 'Fee',
                requester: 'Requester',
                create_date_time: 'Create datetime'
            },
            'data_transaction_update': {
                name: 'Data transaction updated',
                request_id: 'Request id',
                new_status: 'New status',
                fee: 'Fee',
                new_requester: 'New requester'
            },
            'data_transaction_pay': {
                name: 'Data transaction pay',
                fee: 'Fee',
                from: 'From',
                to: 'To',
                amount: 'Amount',
                request_id: 'Request id'
            },
            'account_upgrade_data_transaction_member': {
                name: 'Upgrade to DE witness',
                fee: 'Fee',
                account_to_upgrade: 'Upgrade account',
                upgrade_to_data_transaction_member: 'Upgrade to data transaction member'
            },
            'data_transaction_datasource_upload': {
                name: 'Copyright stored',
                request_id: 'Request id',
                requester: 'Requester',
                datasource: 'Datasource',
                fee: 'Fee'
            },
            'data_transaction_datasource_validate_error': {
                name: 'Data transaction fail',
                request_id: 'Request id',
                datasource: 'Datasource',
                fee: 'Fee'
            },
            'balance_lock': {
                name: 'Banlance Lock',
                create_date_time: 'Start Date',
                amount: 'Lockup Amount',
                program_id: 'Lockup Term',
                term: ' Months',
                interest_rate: 'Annualized Bonus'
            },
            'balance_unlock': {
                name: 'Balance Unlock',
                account: 'Unlock Account',
                lock_id: 'Lock ID'
            },
            'status_states': {
                0: 'Unpublished',
                1: 'Published',
                2: 'Deleted'
            }
        },
        operation: {
            'pending': 'pending %(blocks)s blocks',
            'no_recent': 'No recent transactions',
            'reg_account': '{registrar} registered the account {new_account}',
            'transfer': '{from} sent {amount} to {to}',
            'proposal_create': '{account} created a proposed transaction',
            'proposal_update': '{account} updated a proposed transaction',
            'proposal_delete': '{account} deleted a proposed transaction',
            'account_create': '{registrar} created a account {account}',
            'account_transfer': '{account} transfer to {new_account}',
            'fill_order': '{account} bought {received} at {price}',
            'vesting_balance_withdraw': '{account} withdrew vesting balance of {amount}',
            'balance_claim': '{account} claimed a balance of {amount}',
            'publish_feed': '{account} published feed price of {price}',
            'set_proxy': '{account} set {proxy} as their voting proxy',
            'update_account': '{account} updated their account data',
            'limit_order_sell': '{account} placed an order to sell {amount} at {price}',
            'limit_order_buy': '{account} placed an order to buy {amount} at {price}',
            'limit_order_cancel': '{account} cancelled order #%(order)s',
            'call_order_update': '{account} changed {debtSymbol} debt by {debt} and collateral by {collateral}',
            'asset_reserve': '{account} reserved (burnt) {amount}',
            'asset_issue': '{account} issued {amount} to {to}',
            'asset_fund_fee_pool': '{account} funded {asset} fee pool with {amount}',
            'asset_create': '{account} created the asset {asset}',
            'asset_update': '{account} updated the asset {asset}',
            'lifetime_upgrade_account': '{account} was upgraded to lifetime member',
            'annual_upgrade_account': '{account} was upgraded to annual member',
            'unlisted_by': '{lister} unlisted the account {listee}',
            'whitelisted_by': '{lister} whitelisted the account {listee}',
            'blacklisted_by': '{lister} blacklisted the account {listee}',
            'transfer_account': '{account} ownership transferred to {to}',
            'asset_update_feed_producers': '{account} updated the feed producers for the asset {asset}',
            'asset_settle': '{account} requested settlement of {amount}',
            'asset_global_settle': '{account} requested global settlement of {asset} at {price}',
            'witness_create': '{account} was upgraded to become a witness',
            'witness_update': '{account} update its witness info',
            'witness_pay': 'Withdrew witness pay to account',
            'witness_receive': 'Received witness from witness',
            'committee_member_update_global_parameters': '{account} updated the global committee parameters',
            'worker_create': '{account} created a worker proposal with daily pay of {pay}',
            'override_transfer': '{issuer} transferred {amount} from {from} to {to}',
            'account_upgrade_merchant': '{account} was upgraded to merchant',
            'account_upgrade_datasource': '{account} was upgraded to datasource',
            'data_market_category_create': '{issuer} created the market category {category}',
            'data_market_category_update': '{issuer} passed the proposal and updated the market category {category}',
            'free_data_product_create': '{issuer} created the free market product {product}',
            'free_data_product_update': '{issuer} passed the proposal and updated the free market product {product}',
            'league_data_product_create': '{issuer} created the alliance market product {product}',
            'league_data_product_update': '{issuer} passed the proposal and updated the alliance market product named  {product}',
            'league_create': '{issuer} created the league {league}',
            'league_update': '{issuer} passed the proposal and updated the league {league}',
            'data_transaction_create': '{account} created a data transaction',
            'data_transaction_update': '{account} updated a data transaction',
            'data_transaction_pay': '{from} payed {amount} for data transaction to {to}',
            'account_upgrade_data_transaction_member': '{account} was upgraded to data transaction confirm node',
            'data_transaction_datasource_upload': '{account} confirmed an data upload from {datasource}',
            'data_transaction_datasource_validate_error': '{account} returned an error when processing the data upload',
            'balance_lock': '{account} locked {amount} for loyalty program',
            'balance_unlock': '{account} complete a loyalty program'
        }
    },
    // account
    account: {
        title: 'Account Information',
        empty: 'No record',
        membership: {
            lifetime: 'Lifetime',
            normal: 'Basic',
            merchant: 'Merchant',
            datasource: 'Datasource',
            data_transaction_member: 'Data Transaction Witness'
        },
        basic: {
            title: 'Basic Information',
            more: 'More',
            account_name: 'Account Name',
            account_id: 'Account ID',
            membership: 'Membership',
            referrer_name: 'Register Referrer'
        },
        permissions: {
            title: 'Account Permissions',
            active: 'Active Permissions',
            owner: 'Owner Permissions',
            threshold: 'Threshold'
        },
        balances: {
            title: 'Account Balances',
            asset: 'Asset',
            balance: 'Balance'
        }
    },
    // about
    about: {
        title: 'About GXS Blockchain Explorer',
        version: 'Version',
        version_intro_title: 'About this version',
        version_intro: 'Providing search function for Block, Transaction and Account for both API and UI. Choose one that match your requirements',
        project_intro_title: 'About this project',
        project_intro: 'GXChain is a Graphene technology based Blockchain, so GXS Explorer can also work with any Graphene based chain, anyone can fork and modify this project for free, and it\'s very welcome to commit your pull request, you\'ll probably be rewarded of some GXS for your good job.',
        github: 'Github',
        about_company: 'About GXB',
        company_intro1: 'GXB was founded in 2016, working on a blockchain based decentralized data transaction project.',
        company_intro2: 'With blockchain technology, GXB brings a sort of great features such like: No data caching, Privacy protection, Copyright protection, High freshness of data, Anonymous transactions etc.',
        company_intro3: 'GXB data exchange serves for FinTech Companies, Governments, Insurance, Medical, Logistics and any other industries which require data exchange.'
    },
    // api
    api: {
        title: 'APIs',
        query_supply: 'Query Supply:',
        query_block: 'Query Block:',
        query_transaction: 'Query Transaction:',
        query_account: 'Query Account:',
        query_account_balance: 'Query Account Balance:',
        get_account_header: 'Get Account Header:'
    },
    holdrank: {
        locknum: 'Total Frozen',
        last_updated_at: 'Updated at: {datetime}',
        rank: {
            active: 'Holding Rank',
            lock: 'Frozen Rank',
            all: 'Total Rank'
        },
        table: {
            userid: 'Account ID',
            username: 'Account Name',
            activegxs: 'Holding GXS',
            peractive: 'Holding Percent',
            lockgxs: 'Frozen GXS',
            perlock: 'Frozen Percent',
            allgxs: 'Total GXS',
            perall: 'Total Percent'
        }
    }
};

export default locale;
