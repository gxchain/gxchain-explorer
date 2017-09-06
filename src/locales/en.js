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
    search: 'Enter block number, transaction id, account name or id here'
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
    error:'Fetch error'
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
