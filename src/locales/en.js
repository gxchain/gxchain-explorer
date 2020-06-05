/* eslint-disable quotes */
const locale = {
  // header
  header: {
    block: 'Block',
    transaction: 'Transaction',
    account: 'Account',
    asset: 'Asset',
    about: 'About',
    language: 'Language: English',
    flag: 'en',
    search: 'Enter block number, txid, account name or id here',
    trustnode_election: 'TrustNode Election',
    home: 'Home',
    login: 'Login',
    fee: 'Network Fees',
    params: 'Global params',
    tools: 'Tools',
    node_members: 'Node Members',
    transactions: 'Recent Transactions',
    profile: 'Profile',
    download: "You haven't download extension, confirm to download",
    logout: 'Logout'
  },
  transactions: {
    total_txs: 'Total Transactions',
    block: 'Block Number',
    timestamp: 'Timestamp',
    witness: 'Witness',
    tips: 'Only show rencent 1,000,000 records'
  },
  pagination: {
    page: 'Page',
    next: 'Next',
    prev: 'Prev'
  },
  // index
  index: {
    latest_status: 'Latest Status',
    last_updated_at: 'Updated at: {seconds}s ago',
    voting: {
      title: 'TrustNodes Voting Progress',
      participants: '{accounts} Participants'
    },
    staking: {
      title: 'TrustNodes Staking Progress',
      participants: '{accounts} Participants',
      tips: 'Tips: After the Staking amount exceeds 5 million, if the votes are distributed evenly, and the all trusted nodes are ready to swith, the committee will vote to switch the vote couting logic'
    },
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
      title: 'Active TrustNodes',
      witness: 'TrustNode',
      last_confirmed_block: 'Confirmed',
      votes: 'Votes',
      new_votes: 'New Votes',
      switch_label: 'Show Original Votes',
      rate: 'Commission Rate'
    },
    committee: {
      title: 'Active Committees',
      account: 'Account',
      votes: 'Votes',
      new_votes: 'New Votes'
    },
    candidate: {
      title: 'TrustNode Candidates',
      account: 'Account',
      comments: 'Comment',
      votes: 'Votes',
      new_votes: 'New Votes',
      pre: 'Comments by',
      margin: 'Margin',
      rate: 'Commission Rate'
    },
    transactions: {
      title: 'Recent Transaction Records',
      type: 'Type',
      content: 'Content',
      time: 'Time',
      more: 'More'
    },
    asset: {
      title: 'Assets on GXChain',
      symbol: 'Symbol',
      issuer: 'Issuer',
      supply: 'Current Supply'
    },
    ranking: {
      title: 'Holder Ranking',
      number: 'No.',
      account: 'Account',
      locked_balance: 'Locked Balance',
      balance: 'Balance',
      total_balance: 'Total Balance',
      percent: 'Percentage'
    },
    statistics: {
      title: '10 day GXChain Transaction History',
      blockchain_run_duration: "{days}D {hours}H {minutes}M {seconds}'"
    },
    overview: {
      transactions: 'Total Transactions',
      accounts: 'Total Accounts',
      duration: 'Running Duration'
    }
  },
  // block
  block: {
    id: 'Block ID',
    title: 'Block Info',
    more: 'More',
    timestamp: 'Timestamp',
    witness: 'TrustNode',
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
      all: 'Show all',
      transfer: {
        name: 'Transfer',
        from: 'From',
        amount: 'Amount',
        to: 'To',
        fee: 'Fee'
      },
      limit_order_create: 'Place order',
      limit_order_cancel: 'Cancel order',
      call_order_update: 'Update margin',
      account_create: {
        name: 'Create account',
        fee: 'Fee',
        registrar: 'Registrar',
        referrer: 'Referrer',
        account: 'Account'
      },
      account_update: {
        name: 'Update account',
        fee: 'Fee',
        account: 'Account'
      },
      account_whitelist: {
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
      account_upgrade: {
        name: 'Upgrade Account',
        account_to_upgrade: 'Upgrade account',
        fee: 'Fee',
        upgrade_to_lifetime_member: 'Upgrade to lifetime member'
      },
      account_transfer: {
        name: 'Transfer Account',
        account_id: 'Account id',
        new_owner: 'New Owner',
        fee: 'Fee'
      },
      asset_create: {
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
      asset_update: 'Update asset',
      asset_update_bitasset: 'Update SmartCoin',
      asset_update_feed_producers: 'Update asset feed producers',
      asset_issue: {
        name: 'Issue asset',
        fee: 'Fee',
        issuer: 'Issuer',
        asset_to_issue: 'Amount to issue',
        issue_to_account: 'To'
      },
      asset_reserve: {
        name: 'Reserve asset',
        fee: 'Fee',
        account: 'Account',
        amount_to_reserve: 'Reserved (Burnt) Amount'
      },
      asset_fund_fee_pool: 'Fund asset fee pool',
      asset_settle: 'Asset settlement',
      asset_global_settle: 'Global asset settlement',
      asset_publish_feed: 'Publish feed',
      committee_member_create: {
        name: 'Create committee member',
        account: 'Committee member',
        url: 'Url',
        fee: 'Fee'
      },
      committee_member_update: {
        name: 'Update committee member',
        account: 'Committee member',
        url: 'Url',
        fee: 'Fee'
      },
      witness_create: {
        name: 'Create TrustNode',
        witness_account: 'TrustNode candidate',
        witness_url: 'Url',
        signing_key: 'Signing Key',
        fee: 'Fee'
      },
      witness_update: {
        name: 'Update TrustNode',
        witness_account: 'TrustNode candidate',
        witness_url: 'Url',
        signing_key: 'Signing Key',
        fee: 'Fee'
      },
      witness_withdraw_pay: 'TrustNode pay withdrawal',
      proposal: {
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
      withdraw_permission_create: 'Create withdrawal permission',
      withdraw_permission_update: 'Update withdrawal permission',
      withdraw_permission_claim: 'Claim withdrawal permission',
      withdraw_permission_delete: 'Delete withdrawal permission',
      fill_order: 'Fill order',
      committee_member_update_global_parameters: 'Global parameters update',
      vesting_balance_create: 'Create vesting balance',
      vesting_balance_withdraw: {
        name: 'Withdraw vesting balance',
        owner: 'To',
        amount: 'Amount',
        fee: 'Fee'
      },
      worker_create: 'Create budget item',
      custom: {
        name: 'Custom',
        payer: 'Payer',
        fee: 'Fee',
        data: 'Data',
        toHex: 'StrToUtf8Hex',
        toString: 'Utf8HexToStr'
      },
      assert: 'Assert operation',
      balance_claim: 'Claim balance',
      override_transfer: {
        name: 'Override transfer',
        fee: 'Fee',
        issuer: 'Issuer',
        from: 'From',
        to: 'To',
        amount: 'Amount'
      },
      transfer_to_blind: 'Transfer to blinded account',
      blind_transfer: 'Blinded transfer',
      transfer_from_blind: 'Transfer from blinded account',
      asset_claim_fees: 'Claim asset fees',
      account_upgrade_merchant: {
        name: 'Merchant verify',
        account_to_upgrade: 'Upgrade account',
        auth_referrer: 'Auth referrer',
        upgrade_to_merchant_member: 'Upgrade to merchant member',
        fee: 'Fee'
      },
      account_upgrade_datasource: {
        name: 'DataSource verify',
        account_to_upgrade: 'Upgrade account',
        auth_referrer: 'Auth referrer',
        upgrade_to_datasource_member: 'Upgrade to datasource member',
        fee: 'Fee'
      },
      data_market_category_create: {
        name: 'Market category created',
        category_name: 'Category name',
        issuer: 'Issuer',
        fee: 'Fee',
        create_date_time: 'Create datetime'
      },
      data_market_category_update: {
        name: 'Market category updated',
        category: 'Category id',
        new_category_name: 'New category name',
        new_status: 'New status',
        fee: 'Fee'
      },
      free_data_product_create: {
        name: 'Data item for free marked created',
        product_name: 'Product name',
        issuer: 'Issuer',
        fee: 'Fee',
        create_date_time: 'Create datetime'
      },
      free_data_product_update: {
        name: 'Data item form free market updated',
        free_data_product: 'Product id',
        new_product_name: 'New product name',
        new_status: 'New status',
        fee: 'Fee'
      },
      league_data_product_create: {
        name: 'Data item for alliance created',
        product_name: 'Product name',
        issuer: 'Issuer',
        fee: 'Fee',
        create_date_time: 'Create datetime'
      },
      league_data_product_update: {
        name: 'Data item for alliance updated',
        free_data_product: 'Product id',
        new_product_name: 'New product name',
        new_status: 'New status',
        fee: 'Fee'
      },
      league_create: {
        name: 'Alliance created',
        legue_name: 'Legue name',
        fee: 'Fee',
        create_date_time: 'Create datetime'
      },
      league_update: {
        name: 'Alliance updated',
        legue: 'Legue id',
        new_legue_name: 'New legue name',
        new_status: 'New status',
        fee: 'Fee'
      },
      data_transaction_create: {
        name: 'Data transaction created',
        request_id: 'Request id',
        product_id: 'Product name',
        version: 'Version',
        fee: 'Fee',
        requester: 'Requester',
        create_date_time: 'Create datetime'
      },
      data_transaction_update: {
        name: 'Data transaction updated',
        request_id: 'Request id',
        new_status: 'New status',
        fee: 'Fee',
        new_requester: 'New requester'
      },
      data_transaction_pay: {
        name: 'Data transaction pay',
        fee: 'Fee',
        from: 'From',
        to: 'To',
        amount: 'Amount',
        request_id: 'Request id'
      },
      account_upgrade_data_transaction_member: {
        name: 'Upgrade to DE witness',
        fee: 'Fee',
        account_to_upgrade: 'Upgrade account',
        upgrade_to_data_transaction_member: 'Upgrade to data transaction member'
      },
      data_transaction_datasource_upload: {
        name: 'Copyright stored',
        request_id: 'Request id',
        requester: 'Requester',
        datasource: 'Datasource',
        fee: 'Fee'
      },
      data_transaction_datasource_validate_error: {
        name: 'Data transaction fail',
        request_id: 'Request id',
        datasource: 'Datasource',
        fee: 'Fee'
      },
      balance_lock: {
        name: 'Balance Lock',
        create_date_time: 'Start Date',
        amount: 'Lockup Amount',
        program_id: 'Lockup Term',
        term: ' Months',
        interest_rate: 'Annualized Bonus'
      },
      balance_unlock: {
        name: 'Balance Unlock',
        account: 'Unlock Account',
        lock_id: 'Lock ID'
      },
      proxy_transfer: {
        name: 'Proxy Transfer',
        from: 'From',
        to: 'To',
        amount: 'Amount',
        memo: 'Memo',
        proxy_memo: 'Proxy memo',
        proxy_account: 'Proxy Account',
        fee: 'Fee'
      },
      create_contract: {
        name: 'Create Contract',
        account: 'Account',
        contract_name: 'Contract Name',
        fee: 'Fee'
      },
      call_contract: {
        name: 'Call Contract',
        account: 'Account',
        contract_name: 'Contract Name',
        method_name: 'Method Name',
        params: 'Parameters',
        fee: 'Fee',
        amount: 'Sending Assets'
      },
      update_contract: {
        name: 'Create Contract',
        owner: 'Onwer',
        new_owner: 'New Onwer',
        contract_name: 'Contract Name',
        fee: 'Fee'
      },
      trust_node_pledge_withdraw: {
        name: 'TrustNode margin Withdraw',
        witness_account: 'Account',
        fee: 'Fee'
      },
      inline_transfer: {
        name: 'Inline Transfer',
        from: 'From',
        amount: 'Amount',
        to: 'To',
        memo: 'Memo(Tag)',
        fee: 'Fee'
      },
      inter_contract_call: {
        name: 'Inter Contract Call',
        sender_contract: 'Account',
        contract_name: 'Contract Name',
        method_name: 'Method Name',
        params: 'Parameters',
        fee: 'Fee',
        amount: 'Sending Assets'
      },
      staking_create: {
        name: 'Staking Create',
        owner: 'Account',
        trust_node: 'TrustNode',
        fee: 'Fee',
        amount: 'Amount',
        days: 'Days'
      },
      staking_update: {
        name: 'Staking Update',
        owner: 'Account',
        trust_node: 'TrustNode',
        fee: 'Fee'
      },
      staking_claim: {
        name: 'Staking Claim',
        owner: 'Account',
        amount: 'Amount',
        fee: 'Fee'
      },
      witness_set_commission: {
        name: 'TrustNode Set Commission',
        account: 'Account',
        rate: 'Rate',
        fee: 'Fee'
      },
      witness_unbanned: {
        name: 'TrustNode Unbanned',
        fee: 'Fee'
      },
      status_states: {
        0: 'Unpublished',
        1: 'Published',
        2: 'Deleted'
      }
    },
    operation: {
      pending: 'pending %(blocks)s blocks',
      no_recent: 'No recent transactions',
      reg_account: '{registrar} registered the account {new_account}',
      transfer: '{from} sent {amount} to {to}',
      proposal_create: '{account} created a proposed transaction',
      proposal_update: '{account} updated a proposed transaction',
      proposal_delete: '{account} deleted a proposed transaction',
      account_create: '{registrar} created a account {account}',
      account_transfer: '{account} transfer to {new_account}',
      fill_order: '{account} bought {received} at {price}',
      vesting_balance_withdraw: '{account} withdrew vesting balance of {amount}',
      balance_claim: '{account} claimed a balance of {amount}',
      publish_feed: '{account} published feed price of {price}',
      set_proxy: '{account} set {proxy} as their voting proxy',
      update_account: '{account} updated their account data',
      limit_order_sell: '{account} placed an order to sell {amount} at {price}',
      limit_order_buy: '{account} placed an order to buy {amount} at {price}',
      limit_order_cancel: '{account} cancelled order #%(order)s',
      call_order_update: '{account} changed {debtSymbol} debt by {debt} and collateral by {collateral}',
      asset_reserve: '{account} reserved (burnt) {amount}',
      asset_issue: '{account} issued {amount} to {to}',
      asset_fund_fee_pool: '{account} funded {asset} fee pool with {amount}',
      asset_create: '{account} created the asset {asset}',
      asset_update: '{account} updated the asset {asset}',
      lifetime_upgrade_account: '{account} was upgraded to lifetime member',
      annual_upgrade_account: '{account} was upgraded to annual member',
      unlisted_by: '{lister} unlisted the account {listee}',
      whitelisted_by: '{lister} whitelisted the account {listee}',
      blacklisted_by: '{lister} blacklisted the account {listee}',
      transfer_account: '{account} ownership transferred to {to}',
      asset_update_feed_producers: '{account} updated the feed producers for the asset {asset}',
      asset_settle: '{account} requested settlement of {amount}',
      asset_global_settle: '{account} requested global settlement of {asset} at {price}',
      witness_create: '{account} was upgraded to become a TrustNode candidate',
      witness_update: '{account} update its candidate info',
      witness_pay: 'Withdraw TrustNode pay to account',
      witness_receive: 'Received witness from witness',
      committee_member_update_global_parameters: '{account} updated the global committee parameters',
      committee_member_create: '{account} was upgraded to become a witness',
      committee_member_update: '{account} update its committee info',
      worker_create: '{account} created a worker proposal with daily pay of {pay}',
      override_transfer: '{issuer} transferred {amount} from {from} to {to}',
      account_upgrade_merchant: '{account} was upgraded to merchant',
      account_upgrade_datasource: '{account} was upgraded to datasource',
      data_market_category_create: '{issuer} created the market category {category}',
      data_market_category_update: '{issuer} passed the proposal and updated the market category {category}',
      free_data_product_create: '{issuer} created the free market product {product}',
      free_data_product_update: '{issuer} passed the proposal and updated the free market product {product}',
      league_data_product_create: '{issuer} created the alliance market product {product}',
      league_data_product_update: '{issuer} passed the proposal and updated the alliance market product named  {product}',
      league_create: '{issuer} created the league {league}',
      league_update: '{issuer} passed the proposal and updated the league {league}',
      data_transaction_create: '{account} created a data transaction',
      data_transaction_update: '{account} updated a data transaction',
      data_transaction_pay: '{from} payed {amount} for data transaction to {to}',
      account_upgrade_data_transaction_member: '{account} was upgraded to data transaction confirm node',
      data_transaction_datasource_upload: '{account} confirmed an data upload from {datasource}',
      data_transaction_datasource_validate_error: '{account} returned an error when processing the data upload',
      balance_lock: '{account} locked {amount} for loyalty program',
      balance_unlock: '{account} complete a loyalty program',
      proxy_transfer: '{from} sent {amount} to {to} delegated by {account}',
      create_contract: '{account} created the contract {contract_name}',
      call_contract: "{account} call the contract {contract_name} 's {method_name} method",
      call_contract_and_transfer: "{account} call the contract {contract_name} 's {method_name} method and sent {amount} to contract account",
      update_contract: '{account} updated the contract {contract_name}',
      custom: '{account} created a custom operation',
      trust_node_pledge_withdraw: '{account} withdraw trustnode margin',
      inline_transfer: 'contract account {from} sent {amount} to {to} with memo {memo}',
      inter_contract_call: "contract account {sender_contract} call the contract account {contract_name} 's {method_name} method",
      inter_contract_call_and_transfer: "contract account {sender_contract} call the contract account {contract_name} 's {method_name} method and sent {amount} to contract account",
      staking_create: '{account} staking {amount} for {days} to {trust_node}',
      staking_update: '{account} updated a staking record from {original} to {trust_node}',
      staking_claim: '{account} claimed a staking {amount}',
      witness_set_commission: '{account} set commission rates {rate}',
      witness_unbanned: '{account} restarted and unbanded'
    }
  },
  // account
  account: {
    title: 'Account Information',
    empty: 'No record',
    membership: {
      lifetime: 'Lifetime',
      normal: 'Normal Account',
      contract: 'Contract Account',
      trustnode: 'TrustNode Candidate'
    },
    basic: {
      title: 'Basic Information',
      more: 'More',
      no_more: 'No More',
      account_name: 'Account Name',
      account_id: 'Account ID',
      membership: 'Membership',
      referrer_name: 'Register Referrer',
      contract_info: 'Contract Information',
      commit: 'Commit',
      pending_claim: 'Pending Claim'
    },
    contract: {
      tooltip: 'Comments by：github.com/gxchain/contractInfo',
      abi: {
        title: 'Contract ABI'
      },
      code: {
        title: 'Code'
      },
      database: {
        title: 'Database',
        no_record: 'No More Record'
      }
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
      balance: 'Balance',
      empty: 'No Assets'
    },
    locked_balance: 'Loyalty Program(GXC)',
    pledge_balance: 'TrustNode margin balance(GXC)',
    staking: {
      title: 'Stakings Record',
      title_award: 'Awarded Staking Record',
      tooltip: 'Record with yellow background is expired',
      no_record: 'No Record',
      trust_node: 'TrustNode',
      amount: 'Amount',
      days: 'Days',
      weight: 'Weights',
      period: 'Period',
      sub_title: 'Staking(GXC)',
      Income_received: 'Income',
      get_earned: 'Vesting balance amount',
      earned_coin_day: 'Coin days earned',
      required_coin_day: 'Coin days required',
      remain_day: 'Days left of vesting period',
      get_amount: 'Available to claim',
      filter_record: 'Filter 0 records'
    }
  },
  // asset
  asset: {
    title: 'Asset Information',
    empty: 'No record',
    issuer: 'Issuer',
    precision: 'Precision',
    max_supply: 'Max Supply',
    current_supply: 'Current Supply',
    gxc: 'Actual supply of GXC = Current Supply - GXC managed by the Foundation'
  },
  // about
  about: {
    title: 'About GXChain Blockchain Explorer',
    version: 'Version',
    version_intro_title: 'About this version',
    version_intro: 'Providing search function for Block, Transaction and Account for both API and UI. Choose one that match your requirements',
    project_intro_title: 'About this project',
    project_intro: "GXChain is a Graphene technology based Blockchain, so GXChain Explorer can also work with any Graphene based chain, anyone can fork and modify this project for free, and it's very welcome to commit your pull request, you'll probably be rewarded of some GXC for your good job.",
    github: 'Github',
    about_company: 'About GXChain',
    company_intro1: 'GXChain is a fundamental blockchain for the global data economy, designed to build a trusted data internet of value.',
    company_intro2: 'Benefiting from DPoS based Graphene underlying architecture, GXChain possesses functions including G-ID, GVM, BaaS and Blockcity, which are convenient for application development. ',
    company_intro3:
      'GXChain based DApp-Blockcity has more than two million verified users and provides abundant data for other DApps and strategic partners. GXChain launched decentralized data marketplace as well which is serving hundreds of Chinese enterprises. GXChain team independently developed its main net and launched it in June 2017. Based on decentralization, cryptography, and smart token design, GXChain provides a leading solution for the data economy by developing multiple trusted data modules. Data uploading, storage, computation, and exchange has been gradually realized with many commercialized applications.'
  },
  // api
  api: {
    title: 'APIs',
    query_supply: 'Query Supply:',
    query_block: 'Query Block:',
    query_transaction: 'Query Transaction:',
    query_account: 'Query Account:',
    query_account_history: 'Query Account History',
    query_account_balance: 'Query Account Balance:',
    fetch_vest_balance: 'Query Account Vest Balance',
    get_account_header: 'Get Account Header:',
    assets: 'Assets:',
    asset_info: 'Asset Info:',
    candidates: 'TrustNode Candidates:'
  },
  params: {
    mark: 'In the GXChain network，there are a bunch of global params managed by committee members, which enables on-chain governance',
    titles: {
      params: 'Basic Chain Params',
      staking_items: 'Staking options',
      staking_params: 'Chain Params of Staking',
      key: 'Key',
      value: 'Value',
      desc: 'Description'
    },
    params: {
      block_interval: 'interval in seconds between blocks',
      maintenance_interval: 'interval in sections between blockchain maintenance events',
      maintenance_skip_slots: 'number of block_intervals to skip at maintenance time',
      committee_proposal_review_period: 'minimum time in seconds that a proposed transaction requiring committee authority may not be signed, prior to expiration',
      maximum_transaction_size: 'maximum allowable size in bytes for a transaction',
      maximum_block_size: 'maximum allowable size in bytes for a block',
      maximum_time_until_expiration: 'maximum lifetime in seconds for transactions to be valid, before expiring',
      maximum_proposal_lifetime: 'maximum lifetime in seconds for proposed transactions to be kept, before expiring',
      maximum_witness_count: 'maximum number of active witnesses',
      maximum_committee_count: 'maximum number of active committee_members',
      maximum_authority_membership: 'largest number of keys/accounts an authority can have',
      network_percent_of_fee: 'the percentage of the network\'s allocation of a fee that is taken out of circulation',
      lifetime_referrer_percent_of_fee: 'percent of transaction fees paid to referrer',
      cashback_vesting_period_seconds: 'time after cashback rewards are accrued before they become liquid',
      cashback_vesting_threshold: 'the maximum cashback that can be received without vesting',
      count_non_member_votes: 'set to false to restrict voting privlegages to member accounts',
      witness_pay_per_block: 'CORE to be allocated to witnesses (per block)',
      accounts_per_fee_scale: 'number of accounts between fee scalings',
      account_fee_scale_bitshifts: 'number of times to left bitshift account registration fee at each scaling',
      max_authority_depth: 'max signature check depth',
      staking_items: {
        id: 'staking id',
        staking_days: 'staking days',
        weight: 'weight',
        is_valid: 'valid flag'
      },
      staking_params: {
        staking_mode_on: 'set to true to set staking mode on',
        set_commission_interval: 'the time interval that witness node can reset commission rate',
        staking_rewards_vesting_seconds: 'vesting seconds for staking reward',
        missed_block_limit: 'the max number of blocks that a node could miss in one maintenance period',
        max_staking_count: 'the max number of stakings that an account could create',
        witness_reward_proportion: 'the percentage of witness_pay_per_block that will be rewarded to stakers',
        valid_nodes_number: 'the max number of available witnesses that will receive staking reward',
        min_staking_amount: 'the min amount to stake'
      }
    }
  },
  fee: {
    mark:
      'In the GXChain ecosystem every operation is assigned an individual fee.These fees are subject to change. However, they are defined solely by shareholder approval, thus each and every shareholder of the GXChain core asset has a say as to what the fees should be. If shareholders can be convinced to reduce a certain fee and consensus is reached, the fee will be reduced automatically by the blockchain. Changes of blockchain parameters are proposed by members of the committee. These members are voted by shareholders and improve the flexibility and reaction rate.',
    feeGroups: {
      general_row: 'General',
      asset_row: 'Asset-Specific',
      market: 'Market-Specific',
      account_row: 'Account-Specific',
      business_row: 'Business Administration'
    },
    title: {
      action: 'Action',
      type: 'Fee Type',
      fee: 'Standard Fee',
      feeltm: 'Lifetime Member Fee'
    },
    trxTypes: {
      all: 'Show all',
      transfer: 'Transfer',
      limit_order_create: 'Place order',
      limit_order_cancel: 'Cancel order',
      call_order_update: 'Update margin',
      account_create: 'Create account',
      account_update: 'Update account',
      account_whitelist: 'Account whitelist',
      account_upgrade: 'Upgrade Account',
      account_transfer: 'Transfer Account',
      asset_create: 'Create asset',
      asset_update: 'Update asset',
      asset_update_bitasset: 'Update SmartCoin',
      asset_update_feed_producers: 'Update asset feed producers',
      asset_issue: 'Issue asset',
      asset_reserve: 'Reserve asset',
      asset_fund_fee_pool: 'Fund asset fee pool',
      asset_settle: 'Asset settlement',
      asset_global_settle: 'Global asset settlement',
      asset_publish_feed: 'Publish feed',
      committee_member_create: 'Create committee member',
      witness_create: 'Create TrustNode',
      witness_withdraw_pay: 'TrustNode pay withdrawal',
      proposal_create: 'Create proposal',
      proposal_update: 'Update proposal',
      proposal_delete: 'Delete proposal',
      withdraw_permission_create: 'Create withdrawal permission',
      withdraw_permission_update: 'Update withdrawal permission',
      withdraw_permission_claim: 'Claim withdrawal permission',
      withdraw_permission_delete: 'Delete withdrawal permission',
      fill_order: 'Fill order',
      delegate_update_global_parameters: 'Global parameters update',
      vesting_balance_create: 'Create vesting balance',
      vesting_balance_withdraw: 'Withdraw vesting balance',
      worker_create: 'Create budget item',
      custom: 'Custom',
      assert: 'Assert operation',
      balance_claim: 'Claim balance',
      override_transfer: 'Override transfer',
      witness_update: 'Update TrustNode',
      committee_member_update_global_parameters: 'Global parameters update',
      transfer_to_blind: 'Transfer to blinded account',
      blind_transfer: 'Blinded transfer',
      transfer_from_blind: 'Transfer from blinded account',
      committee_member_update: 'Update committee member',
      asset_claim_fees: 'Claim asset fees',
      account_upgrade_merchant: 'Merchant verify',
      account_upgrade_datasource: 'DataSource verify',
      data_market_category_create: 'Market category created',
      data_market_category_update: 'Market category updated',
      free_data_product_create: 'Data item for free marked created',
      free_data_product_update: 'Data item form free market updated',
      league_data_product_create: 'Data item for alliance created',
      league_data_product_update: 'Data item for alliance updated',
      league_create: 'Alliance created',
      league_update: 'Alliance updated',
      data_transaction_create: 'Data transaction created',
      data_transaction_update: 'Data transaction updated',
      data_transaction_pay: 'Data transaction pay',
      account_upgrade_data_transaction_member: 'Upgrade to DE witness',
      data_transaction_datasource_upload: 'Copyright stored',
      data_transaction_datasource_validate_error: 'Data transaction fail',
      balance_lock: 'Balance Lock',
      balance_unlock: 'Balance Unlock',
      proxy_transfer: 'Proxy Transfer',
      create_contract: 'Create Contract',
      call_contract: 'Call Contract',
      update_contract: 'Update Contract',
      trust_node_pledge_withdraw: 'TrustNode margin Withdraw',
      inline_transfer: 'Inline Transfer',
      inter_contract_call: 'Inter Contract Call',
      staking_create: 'Staking Create',
      staking_update: 'Staking Update',
      staking_claim: 'Staking Claim',
      witness_set_commission: 'TrustNode Set Commission',
      witness_unbanned: 'Witness Unbannded'
    },
    feeTypes: {
      _none: 'Free of Charge',
      fee: 'Regular Transaction Fee',
      price_per_kbyte: 'Price per KByte Transaction Size',
      basic_fee: 'Basic Fee',
      premium_fee: 'Fee for Premium Names',
      membership_annual_fee: 'Annual Membership',
      membership_lifetime_fee: 'Lifetime Membership',
      symbol3: 'Symbols with 3 Characters',
      symbol4: 'Symbols with 4 Characters',
      long_symbol: 'Longer Symbols',
      price_per_output: ''
    }
  },
  // contract
  contract: {
    title: 'Call Contract',
    method: 'Method',
    payable_asset: 'Payable Asset',
    params: 'Params',
    output: 'Output'
  },
  // tools
  tools: {
    title: 'Tools',
    no_data: 'No Data',
    logo: 'Login First',
    browser_not_support: 'Browser does not support',
    bulk_transfer: {
      title: ' Bulk Transfer',
      des: 'Bulk transfer utility, suitable for community airdrops, batch awards',
      download_template: 'Download Template',
      import: 'Import',
      execute: 'Execute',
      clear: 'Clear',
      refresh: 'Refresh',
      export: 'Export',
      filter: 'Filter',
      import_all: 'Records',
      article: '',
      all: 'All',
      success: 'Success',
      fail: 'Fail',
      processing: 'Processing',
      transfer_processing: 'Transfer in progress',
      transfer_success: 'Success',
      transfer_fail: 'Fail'
    },
    key_gen: {
      title: 'Key Generation',
      des: 'Generate random keys for GXChain',
      gen: 'Generate',
      save: 'Save'
    }
  }
};

export default locale;
