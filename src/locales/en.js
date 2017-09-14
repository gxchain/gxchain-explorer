const locale = {
  // header
  header: {
    block: 'Block',
    transaction: 'Transaction',
    account: 'Account',
    about: 'About',
    language: 'Language: English',
    title: 'GXB Block Explorer',
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
      last_confirmed_block: 'Last Confirmed Block',
      votes: 'Votes'
    },
    committee: {
      title: 'Active Committees',
      account: 'Account',
      votes: 'Votes'
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
    error:'Fetch error'
  },
  // transaction
  transaction: {
    title: 'Transaction Info',
    empty: 'No record',
    error:'Fetch error',
    current_block_number: 'Current Block',
    trx_op: "Operation Info",
    trx_type: "Type",
    trxTypes: {
      "all": "Show all",
      "transfer": {
        "name": "Transfer",
        "from": "From",
        "amount": "Amount",
        "to": "To",
        "fee": "Fee",
      },
      "limit_order_create": "Place order",
      "limit_order_cancel": "Cancel order",
      "call_order_update": "Update margin",
      "account_create": {
        "name": "Create account",
        "fee": "Fee",
        "registrar": "Registrar",
        "referrer": "Referrer",
        "account": "Account",
      },
      "account_update": {
        "name":"Update account",
        "fee": "Fee",
        "account": "Account",
      },
      "account_whitelist": {
        "name":"Account whitelist",
        "fee": "Fee",
        "authorizing_account": "Authorizing account",
        "account_to_list": "Listed account",
        "new_listing": "New listing",
      },
      "account_upgrade": "Upgrade Account",
      "account_transfer": "Transfer Account",
      "asset_create": "Create asset",
      "asset_update": "Update asset",
      "asset_update_bitasset": "Update SmartCoin",
      "asset_update_feed_producers": "Update asset feed producers",
      "asset_issue": "Issue asset",
      "asset_reserve": "Reserve asset",
      "asset_fund_fee_pool": "Fund asset fee pool",
      "asset_settle": "Asset settlement",
      "asset_global_settle": "Global asset settlement",
      "asset_publish_feed": "Publish feed",
      "committee_member_create": "Create committee member",
      "committee_member_update": "Update committee member",
      "witness_create": "Create witness",
      "witness_update": "Update witness",
      "witness_withdraw_pay": "Witness pay withdrawal",
      "proposal_create": "Create proposal",
      "proposal_update": "Update proposal",
      "proposal_delete": "Delete proposal",
      "withdraw_permission_create": "Create withdrawal permission",
      "withdraw_permission_update": "Update withdrawal permission",
      "withdraw_permission_claim": "Claim withdrawal permission",
      "withdraw_permission_delete": "Delete withdrawal permission",
      "fill_order": "Fill order",
      "committee_member_update_global_parameters": "Global parameters update",
      "vesting_balance_create": "Create vesting balance",
      "vesting_balance_withdraw": "Withdraw vesting balance",
      "worker_create": "Create budget item",
      "custom": "Custom",
      "assert": "Assert operation",
      "balance_claim": "Claim balance",
      "override_transfer": "Override transfer",
      "transfer_to_blind": "Transfer to blinded account",
      "blind_transfer": "Blinded transfer",
      "transfer_from_blind": "Transfer from blinded account",
      "asset_claim_fees": "Claim asset fees",
      "account_upgrade_merchant":"Merchant verify",
      "account_upgrade_datasource":"DataSource verify",
      "data_market_category_create":"Market category created",
      "data_market_category_update":"Market category updated",
      "free_data_product_create":"Data item for free marked created",
      "free_data_product_update":"Data item form free market updated",
      "league_data_product_create": "Data item for alliance created",
      "league_data_product_update": "Data item for alliance updated",
      "league_create": "Alliance created",
      "league_update": "Alliance updated",
      "data_transaction_create":"Data transaction created",
      "data_transaction_update":"Data transaction updated",
      "data_transaction_pay":"Data transaction pay",
      "account_upgrade_data_transaction_member":"Upgrade to DE witness",
      "data_transaction_datasource_upload":"Copyright stored",
      "data_transaction_datasource_validate_error":"Data transaction fail"
    },
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
      active: "Active Permissions",
      owner: "Owner Permissions",
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
    title: 'About GXB Blockchain Explorer',
    version: 'Version',
    version_intro_title: 'About this version',
    version_intro: 'Providing search function for Block, Transaction and Account for both API and UI. Choose one that match your requirements',
    project_intro_title: 'About this project',
    project_intro: 'GXChain is a Graphene technology based Blockchain, so GXB Explorer can also work with any Graphene based chain, anyone can fork and modify this project for free, and it\'s very welcome to commit your pull request, you\'ll probably be rewarded of some GXS for your good job.',
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
  }
}

export default locale
