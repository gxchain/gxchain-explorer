<template>
  <div style="display:inline">
    :
    <!-- 账户相关 -->
    <!-- 0:transfer -->
    <span v-if="ops[op[0]] == 'transfer'">
      <i18n path="transaction.operation.transfer">
        <router-link
          place="from"
          :to="{ path: '/account/' + formatted_account(op[1].from) }"
        >
          {{ formatted_account(op[1].from) }}
        </router-link>
        <span place="amount">{{
          formatted_asset(op[1].amount.asset_id, op[1].amount.amount)
        }}</span>
        <router-link
          place="to"
          :to="{ path: '/account/' + formatted_account(op[1].to) }"
        >
          {{ formatted_account(op[1].to) }}
        </router-link>
      </i18n>
    </span>
    <!-- 1:limit_order_create -->
    <span v-if="ops[op[0]] == 'limit_order_create'">-</span>
    <!-- 2:limit_order_cancel -->
    <span v-if="ops[op[0]] == 'limit_order_cancel'">-</span>
    <!-- 3:call_order_update -->
    <span v-if="ops[op[0]] == 'call_order_update'">-</span>
    <!-- 4:fill_order -->
    <span v-if="ops[op[0]] == 'fill_order'">-</span>
    <!-- 5:account_create -->
    <span v-if="ops[op[0]] == 'account_create'">
      <i18n path="transaction.operation.account_create">
        <router-link
          place="registrar"
          :to="{ path: '/account/' + formatted_account(op[1].registrar) }"
        >
          {{ formatted_account(op[1].registrar) }}
        </router-link>
        <router-link
          place="account"
          :to="{ path: '/account/' + formatted_account(op[1].name) }"
        >
          {{ formatted_account(op[1].name) }}
        </router-link>
      </i18n>
    </span>
    <!-- 6:account_update -->
    <span v-if="ops[op[0]] == 'account_update'">
      <i18n path="transaction.operation.update_account">
        <router-link
          place="account"
          :to="{ path: '/account/' + formatted_account(op[1].account) }"
        >
          {{ formatted_account(op[1].account) }}
        </router-link>
      </i18n>
    </span>
    <!-- 7:account_whitelist -->
    <span v-if="ops[op[0]] == 'account_whitelist'">
      <i18n
        path="transaction.operation.unlisted_by"
        v-if="op[1].new_listing === listings.no_listing"
      >
        <router-link
          place="lister"
          :to="{
            path: '/account/' + formatted_account(op[1].authorizing_account)
          }"
        >
          {{ formatted_account(op[1].authorizing_account) }}
        </router-link>
        <router-link
          place="listee"
          :to="{ path: '/account/' + formatted_account(op[1].account_to_list) }"
        >
          {{ formatted_account(op[1].account_to_list) }}
        </router-link>
      </i18n>
      <i18n
        path="transaction.operation.whitelisted_by"
        v-if="op[1].new_listing === listings.white_listed"
      >
        <router-link
          place="lister"
          :to="{
            path: '/account/' + formatted_account(op[1].authorizing_account)
          }"
        >
          {{ formatted_account(op[1].authorizing_account) }}
        </router-link>
        <router-link
          place="listee"
          :to="{ path: '/account/' + formatted_account(op[1].account_to_list) }"
        >
          {{ formatted_account(op[1].account_to_list) }}
        </router-link>
      </i18n>
      <i18n
        path="transaction.operation.blacklisted_by"
        v-if="op[1].new_listing === listings.black_listed"
      >
        <router-link
          place="lister"
          :to="{
            path: '/account/' + formatted_account(op[1].authorizing_account)
          }"
        >
          {{ formatted_account(op[1].authorizing_account) }}
        </router-link>
        <router-link
          place="listee"
          :to="{ path: '/account/' + formatted_account(op[1].account_to_list) }"
        >
          {{ formatted_account(op[1].account_to_list) }}
        </router-link>
      </i18n>
    </span>
    <!-- 8:account_upgrade -->
    <span v-if="ops[op[0]] == 'account_upgrade'">
      <i18n
        path="transaction.operation.lifetime_upgrade_account"
        v-if="op[1].upgrade_to_lifetime_member"
      >
        <router-link
          place="account"
          :to="{
            path: '/account/' + formatted_account(op[1].account_to_upgrade)
          }"
        >
          {{ formatted_account(op[1].account_to_upgrade) }}
        </router-link>
      </i18n>
      <i18n path="transaction.operation.annual_upgrade_account" v-else>
        <router-link
          place="account"
          :to="{
            path: '/account/' + formatted_account(op[1].account_to_upgrade)
          }"
        >
          {{ formatted_account(op[1].account_to_upgrade) }}
        </router-link>
      </i18n>
    </span>
    <!-- 9:account_transfer -->
    <span v-if="ops[op[0]] == 'account_transfer'">
      <i18n path="transaction.operation.account_transfer">
        <router-link
          place="account"
          :to="{ path: '/account/' + formatted_account(op[1].account_id) }"
        >
          {{ formatted_account(op[1].account_id) }}
        </router-link>
        <router-link
          place="new_account"
          :to="{ path: '/account/' + formatted_account(op[1].new_account) }"
        >
          {{ formatted_account(op[1].new_account) }}
        </router-link>
      </i18n>
    </span>

    <!-- 资产相关 -->
    <!-- 10:asset_create -->
    <span v-if="ops[op[0]] == 'asset_create'">
      <i18n path="transaction.operation.asset_create">
        <router-link
          place="account"
          :to="{ path: '/account/' + formatted_account(op[1].issuer) }"
        >
          {{ formatted_account(op[1].issuer) }}
        </router-link>
        <span place="asset">{{ op[1].symbol }}</span>
      </i18n>
    </span>
    <!-- 11:asset_update -->
    <span v-if="ops[op[0]] == 'asset_update'">-</span>
    <!-- 12:asset_update_bitasset -->
    <span v-if="ops[op[0]] == 'asset_update_bitasset'">-</span>
    <!-- 13:asset_update_feed_producers -->
    <span v-if="ops[op[0]] == 'asset_update_feed_producers'">-</span>
    <!-- 14:asset_issue -->
    <span v-if="ops[op[0]] == 'asset_issue'">
      <i18n path="transaction.operation.asset_issue">
        <router-link
          place="account"
          :to="{ path: '/account/' + formatted_account(op[1].issuer) }"
        >
          {{ formatted_account(op[1].issuer) }}
        </router-link>
        <span place="amount">{{
          formatted_asset(
            op[1].asset_to_issue.asset_id,
            op[1].asset_to_issue.amount
          )
        }}</span>
        <router-link
          place="to"
          :to="{
            path: '/account/' + formatted_account(op[1].issue_to_account)
          }"
        >
          {{ formatted_account(op[1].issue_to_account) }}
        </router-link>
      </i18n>
    </span>
    <!-- 15:asset_reserve -->
    <span v-if="ops[op[0]] == 'asset_reserve'">
      <i18n path="transaction.operation.asset_reserve">
        <router-link
          place="account"
          :to="{ path: '/account/' + formatted_account(op[1].payer) }"
        >
          {{ formatted_account(op[1].payer) }}
        </router-link>
        <span place="amount">{{
          formatted_asset(
            op[1].amount_to_reserve.asset_id,
            op[1].amount_to_reserve.amount
          )
        }}</span>
      </i18n>
    </span>
    <!-- 16:asset_fund_fee_pool -->
    <span v-if="ops[op[0]] == 'asset_fund_fee_pool'">-</span>
    <!-- 17:asset_settle -->
    <span v-if="ops[op[0]] == 'asset_settle'">-</span>
    <!-- 18:asset_global_settle -->
    <span v-if="ops[op[0]] == 'asset_global_settle'">-</span>
    <!-- 19:asset_publish_feed -->
    <span v-if="ops[op[0]] == 'asset_publish_feed'">-</span>

    <!-- 其他相关 -->
    <!-- 20:witness_create -->
    <span v-if="ops[op[0]] == 'witness_create'">
      <i18n path="transaction.operation.witness_create">
        <router-link
          place="account"
          :to="{ path: '/account/' + formatted_account(op[1].witness_account) }"
        >
          {{ formatted_account(op[1].witness_account) }}
        </router-link>
      </i18n>
    </span>
    <!-- 21:witness_update -->
    <span v-if="ops[op[0]] == 'witness_update'">
      <i18n path="transaction.operation.witness_update">
        <router-link
          place="account"
          :to="{ path: '/account/' + formatted_account(op[1].witness_account) }"
        >
          {{ formatted_account(op[1].witness_account) }}
        </router-link>
      </i18n>
    </span>

    <!-- 25:withdraw_permission_create -->
    <span v-if="ops[op[0]] == 'withdraw_permission_create'">-</span>
    <!-- 26:withdraw_permission_update -->
    <span v-if="ops[op[0]] == 'withdraw_permission_update'">-</span>
    <!-- 27:withdraw_permission_claim -->
    <span v-if="ops[op[0]] == 'withdraw_permission_claim'">-</span>
    <!-- 28:withdraw_permission_delete -->
    <span v-if="ops[op[0]] == 'withdraw_permission_delete'">-</span>
    <!-- 29:committee_member_create -->
    <span v-if="ops[op[0]] == 'committee_member_create'">
      <i18n path="transaction.operation.committee_member_create">
        <router-link
          place="account"
          :to="{
            path:
              '/account/' + formatted_account(op[1].committee_member_account)
          }"
        >
          {{ formatted_account(op[1].committee_member_account) }}
        </router-link>
      </i18n>
    </span>
    <!-- 30:committee_member_update -->
    <span v-if="ops[op[0]] == 'committee_member_update'">
      <i18n path="transaction.operation.committee_member_update">
        <router-link
          place="account"
          :to="{
            path:
              '/account/' + formatted_account(op[1].committee_member_account)
          }"
        >
          {{ formatted_account(op[1].committee_member_account) }}
        </router-link>
      </i18n>
    </span>
    <!-- 31:committee_member_update_global_parameters -->
    <span v-if="ops[op[0]] == 'committee_member_update_global_parameters'">
      <i18n
        path="transaction.operation.committee_member_update_global_parameters"
      >
        <router-link
          place="account"
          :to="{
            path:
              '/account/' + formatted_account(op[1].committee_member_account)
          }"
        >
          {{ formatted_account(op[1].committee_member_account) }}
        </router-link>
      </i18n>
    </span>
    <!-- 32:vesting_balance_create -->
    <span v-if="ops[op[0]] == 'vesting_balance_create'">-</span>
    <!-- 33:vesting_balance_withdraw -->
    <span v-if="ops[op[0]] == 'vesting_balance_withdraw'">
      <i18n path="transaction.operation.vesting_balance_withdraw">
        <router-link
          place="account"
          :to="{ path: '/account/' + formatted_account(op[1].owner) }"
        >
          {{ formatted_account(op[1].owner) }}
        </router-link>
        <span place="amount">{{
          formatted_asset(op[1].amount.asset_id, op[1].amount.amount)
        }}</span>
      </i18n>
    </span>
    <!-- 34:worker_create -->
    <span v-if="ops[op[0]] == 'worker_create'">-</span>
    <!-- 35:custom -->
    <span v-if="ops[op[0]] == 'custom'">
      <i18n path="transaction.operation.custom">
        <router-link
          place="account"
          :to="{ path: '/account/' + formatted_account(op[1].payer) }"
        >
          {{ formatted_account(op[1].payer) }}
        </router-link>
      </i18n>
    </span>
    <!-- 36:assert -->
    <span v-if="ops[op[0]] == 'assert'">-</span>
    <!-- 37:balance_claim -->
    <span v-if="ops[op[0]] == 'balance_claim'">-</span>
    <!-- 38:override_transfer -->
    <span v-if="ops[op[0]] == 'override_transfer'">
      <i18n path="transaction.operation.override_transfer">
        <router-link
          place="issuer"
          :to="{ path: '/account/' + formatted_account(op[1].issuer) }"
        >
          {{ formatted_account(op[1].issuer) }}
        </router-link>
        <router-link
          place="from"
          :to="{ path: '/account/' + formatted_account(op[1].from) }"
        >
          {{ formatted_account(op[1].from) }}
        </router-link>
        <router-link
          place="to"
          :to="{ path: '/account/' + formatted_account(op[1].to) }"
        >
          {{ formatted_account(op[1].to) }}
        </router-link>
        <span place="amount">{{
          formatted_asset(op[1].amount.asset_id, op[1].amount.amount)
        }}</span>
      </i18n>
    </span>
    <!-- 39:transfer_to_blind -->
    <span v-if="ops[op[0]] == 'transfer_to_blind'">-</span>
    <!-- 40:blind_transfer -->
    <span v-if="ops[op[0]] == 'blind_transfer'">-</span>
    <!-- 41:transfer_from_blind -->
    <span v-if="ops[op[0]] == 'transfer_from_blind'">-</span>
    <!-- 42:asset_settle_cancel -->
    <span v-if="ops[op[0]] == 'asset_settle_cancel'">-</span>
    <!-- 43:asset_claim_fees -->
    <span v-if="ops[op[0]] == 'asset_claim_fees'">-</span>
    <!-- 44:fba_distribute -->
    <span v-if="ops[op[0]] == 'fba_distribute'">-</span>

    <!-- 数据交易相关 -->
    <!-- 45:account_upgrade_merchant -->
    <span v-if="ops[op[0]] == 'account_upgrade_merchant'">
      <i18n path="transaction.operation.account_upgrade_merchant">
        <router-link
          place="account"
          :to="{
            path: '/account/' + formatted_account(op[1].account_to_upgrade)
          }"
        >
          {{ formatted_account(op[1].account_to_upgrade) }}
        </router-link>
      </i18n>
    </span>
    <!-- 46:account_upgrade_datasource -->
    <span v-if="ops[op[0]] == 'account_upgrade_datasource'">
      <i18n path="transaction.operation.account_upgrade_datasource">
        <router-link
          place="account"
          :to="{
            path: '/account/' + formatted_account(op[1].account_to_upgrade)
          }"
        >
          {{ formatted_account(op[1].account_to_upgrade) }}
        </router-link>
      </i18n>
    </span>
    <!-- 47:stale_data_market_category_create -->
    <span v-if="ops[op[0]] == 'stale_data_market_category_create'">
      <i18n path="transaction.operation.data_market_category_create">
        <router-link
          place="issuer"
          :to="{ path: '/account/' + formatted_account(op[1].issuer) }"
        >
          {{ formatted_account(op[1].issuer) }}
        </router-link>
        <span place="category">{{ op[1].category_name }}</span>
      </i18n>
    </span>
    <!-- 48:stale_data_market_category_update -->
    <span v-if="ops[op[0]] == 'stale_data_market_category_update'">
      <i18n path="transaction.operation.data_market_category_update">
        <router-link
          place="issuer"
          :to="{ path: '/account/' + formatted_account('1.2.0') }"
        >
          {{ formatted_account('1.2.0') }}
        </router-link>
        <span place="category">{{ op[1].new_category_name }}</span>
      </i18n>
    </span>
    <!-- 49:stale_free_data_product_create -->
    <span v-if="ops[op[0]] == 'stale_free_data_product_create'">
      <i18n path="transaction.operation.free_data_product_create">
        <router-link
          place="issuer"
          :to="{ path: '/account/' + formatted_account(op[1].issuer) }"
        >
          {{ formatted_account(op[1].issuer) }}
        </router-link>
        <span place="product">{{ op[1].product_name }}</span>
      </i18n>
    </span>
    <!-- 50:stale_free_data_product_update -->
    <span v-if="ops[op[0]] == 'stale_free_data_product_update'">
      <i18n path="transaction.operation.free_data_product_update">
        <router-link
          place="issuer"
          :to="{ path: '/account/' + formatted_account('1.2.0') }"
        >
          {{ formatted_account('1.2.0') }}
        </router-link>
        <span place="product">{{ op[1].new_product_name }}</span>
      </i18n>
    </span>
    <!-- 51:stale_league_data_product_create -->
    <span v-if="ops[op[0]] == 'stale_league_data_product_create'">
      <i18n path="transaction.operation.league_data_product_create">
        <router-link
          place="issuer"
          :to="{ path: '/account/' + formatted_account(op[1].issuer) }"
        >
          {{ formatted_account(op[1].issuer) }}
        </router-link>
        <span place="product">{{ op[1].product_name }}</span>
      </i18n>
    </span>
    <!-- 52:stale_league_data_product_update -->
    <span v-if="ops[op[0]] == 'stale_league_data_product_update'">
      <i18n path="transaction.operation.league_data_product_update">
        <router-link
          place="issuer"
          :to="{ path: '/account/' + formatted_account('1.2.0') }"
        >
          {{ formatted_account('1.2.0') }}
        </router-link>
        <span place="product">{{ op[1].new_product_name }}</span>
      </i18n>
    </span>
    <!-- 53:stale_league_create -->
    <span v-if="ops[op[0]] == 'stale_league_create'">
      <i18n path="transaction.operation.league_create">
        <router-link
          place="issuer"
          :to="{ path: '/account/' + formatted_account(op[1].issuer) }"
        >
          {{ formatted_account(op[1].issuer) }}
        </router-link>
        <span place="league">{{ op[1].league_name }}</span>
      </i18n>
    </span>
    <!-- 54:stale_league_update -->
    <span v-if="ops[op[0]] == 'stale_league_update'">
      <i18n path="transaction.operation.league_update">
        <router-link
          place="issuer"
          :to="{ path: '/account/' + formatted_account('1.2.0') }"
        >
          {{ formatted_account('1.2.0') }}
        </router-link>
        <span place="league">{{ op[1].new_league_name }}</span>
      </i18n>
    </span>
    <!-- 55:data_transaction_create -->
    <span v-if="ops[op[0]] == 'data_transaction_create'">
      <i18n path="transaction.operation.data_transaction_create">
        <router-link
          place="account"
          :to="{ path: '/account/' + formatted_account(op[1].requester) }"
        >
          {{ formatted_account(op[1].requester) }}
        </router-link>
      </i18n>
    </span>
    <!-- 56:data_transaction_update -->
    <span v-if="ops[op[0]] == 'data_transaction_update'">
      <i18n path="transaction.operation.data_transaction_update">
        <router-link
          place="account"
          :to="{ path: '/account/' + formatted_account(op[1].new_requester) }"
        >
          {{ formatted_account(op[1].new_requester) }}
        </router-link>
      </i18n>
    </span>
    <!-- 57:data_transaction_pay -->
    <span v-if="ops[op[0]] == 'data_transaction_pay'">
      <i18n path="transaction.operation.data_transaction_pay">
        <router-link
          place="from"
          :to="{ path: '/account/' + formatted_account(op[1].from) }"
        >
          {{ formatted_account(op[1].from) }}
        </router-link>
        <span place="amount">{{
          formatted_asset(op[1].amount.asset_id, op[1].amount.amount)
        }}</span>
        <router-link
          place="to"
          :to="{ path: '/account/' + formatted_account(op[1].to) }"
        >
          {{ formatted_account(op[1].to) }}
        </router-link>
      </i18n>
    </span>
    <!-- 58:account_upgrade_data_transaction_member -->
    <span v-if="ops[op[0]] == 'account_upgrade_data_transaction_member'">
      <i18n
        path="transaction.operation.account_upgrade_data_transaction_member"
      >
        <router-link
          place="account"
          :to="{
            path: '/account/' + formatted_account(op[1].account_to_upgrade)
          }"
        >
          {{ formatted_account(op[1].account_to_upgrade) }}
        </router-link>
      </i18n>
    </span>
    <!-- 59:data_transaction_datasource_upload -->
    <span v-if="ops[op[0]] == 'data_transaction_datasource_upload'">
      <i18n path="transaction.operation.data_transaction_datasource_upload">
        <router-link
          place="account"
          :to="{ path: '/account/' + formatted_account(op[1].requester) }"
        >
          {{ formatted_account(op[1].requester) }}
        </router-link>
        <router-link
          place="datasource"
          :to="{ path: '/account/' + formatted_account(op[1].datasource) }"
        >
          {{ formatted_account(op[1].datasource) }}
        </router-link>
      </i18n>
    </span>
    <!-- 60:data_transaction_datasource_validate_error -->
    <span v-if="ops[op[0]] == 'data_transaction_datasource_validate_error'">
      <i18n
        path="transaction.operation.data_transaction_datasource_validate_error"
      >
        <router-link
          place="account"
          :to="{ path: '/account/' + formatted_account(op[1].datasource) }"
        >
          {{ formatted_account(op[1].datasource) }}
        </router-link>
      </i18n>
    </span>
    <!-- 61:data_market_category_create -->
    <span v-if="ops[op[0]] == 'data_market_category_create'">
      <i18n path="transaction.operation.data_market_category_create">
        <router-link
          place="issuer"
          :to="{ path: '/account/' + formatted_account(op[1].issuer) }"
        >
          {{ formatted_account(op[1].issuer) }}
        </router-link>
        <span place="category">{{ op[1].category_name }}</span>
      </i18n>
    </span>
    <!-- 62:data_market_category_update -->
    <span v-if="ops[op[0]] == 'data_market_category_update'">
      <i18n path="transaction.operation.data_market_category_update">
        <router-link
          place="issuer"
          :to="{ path: '/account/' + formatted_account('1.2.0') }"
        >
          {{ formatted_account('1.2.0') }}
        </router-link>
        <span place="category">{{ op[1].new_category_name }}</span>
      </i18n>
    </span>
    <!-- 63:free_data_product_create -->
    <span v-if="ops[op[0]] == 'free_data_product_create'">
      <i18n path="transaction.operation.free_data_product_create">
        <router-link
          place="issuer"
          :to="{ path: '/account/' + formatted_account(op[1].issuer) }"
        >
          {{ formatted_account(op[1].issuer) }}
        </router-link>
        <span place="product">{{ op[1].product_name }}</span>
      </i18n>
    </span>
    <!-- 64:free_data_product_update -->
    <span v-if="ops[op[0]] == 'free_data_product_update'">
      <i18n path="transaction.operation.free_data_product_update">
        <router-link
          place="issuer"
          :to="{ path: '/account/' + formatted_account('1.2.0') }"
        >
          {{ formatted_account('1.2.0') }}
        </router-link>
        <span place="product">{{ op[1].new_product_name }}</span>
      </i18n>
    </span>
    <!-- 65:league_data_product_create -->
    <span v-if="ops[op[0]] == 'league_data_product_create'">
      <i18n path="transaction.operation.league_data_product_create">
        <router-link
          place="issuer"
          :to="{ path: '/account/' + formatted_account(op[1].issuer) }"
        >
          {{ formatted_account(op[1].issuer) }}
        </router-link>
        <span place="product">{{ op[1].product_name }}</span>
      </i18n>
    </span>
    <!-- 66:league_data_product_update -->
    <span v-if="ops[op[0]] == 'league_data_product_update'">
      <i18n path="transaction.operation.league_data_product_update">
        <router-link
          place="issuer"
          :to="{ path: '/account/' + formatted_account('1.2.0') }"
        >
          {{ formatted_account('1.2.0') }}
        </router-link>
        <span place="product">{{ op[1].new_product_name }}</span>
      </i18n>
    </span>
    <!-- 67:league_create -->
    <span v-if="ops[op[0]] == 'league_create'">
      <i18n path="transaction.operation.league_create">
        <router-link
          place="issuer"
          :to="{ path: '/account/' + formatted_account(op[1].issuer) }"
        >
          {{ formatted_account(op[1].issuer) }}
        </router-link>
        <span place="league">{{ op[1].league_name }}</span>
      </i18n>
    </span>
    <!-- 68:league_update -->
    <span v-if="ops[op[0]] == 'league_update'">
      <i18n path="transaction.operation.league_update">
        <router-link
          place="issuer"
          :to="{ path: '/account/' + formatted_account('1.2.0') }"
        >
          {{ formatted_account('1.2.0') }}
        </router-link>
        <span place="league">{{ op[1].new_league_name }}</span>
      </i18n>
    </span>

    <!-- 71:balance_lock -->
    <span v-if="ops[op[0]] == 'balance_lock'">
      <i18n path="transaction.operation.balance_lock">
        <router-link
          place="account"
          :to="{ path: '/account/' + formatted_account(op[1]['account']) }"
        >
          {{ formatted_account(op[1]['account']) }}
        </router-link>
        <span place="amount">{{
          formatted_asset(op[1].amount.asset_id, op[1].amount.amount)
        }}</span>
      </i18n>
    </span>
    <!-- 72:balance_unlock -->
    <span v-if="ops[op[0]] == 'balance_unlock'">
      <i18n path="transaction.operation.balance_unlock">
        <router-link
          place="account"
          :to="{ path: '/account/' + formatted_account(op[1]['account']) }"
        >
          {{ formatted_account(op[1]['account']) }}
        </router-link>
      </i18n>
    </span>
  </div>
</template>

<script>
import { ChainTypes } from 'gxbjs/es';
import { fetch_account } from '@/services/CommonService';
import filters from '@/filters';
import { mapGetters } from 'vuex';

let ops = Object.keys(ChainTypes.operations);
let account_listing = {
  no_listing: 0,
  white_listed: 1,
  black_listed: 2,
  white_and_black_listed: 1 | 2
};
let listings = Object.keys(account_listing);
export default {
  props: {
    op: {
      type: Array
    }
  },
  filters,
  data() {
    return {
      listings,
      items: {},
      account: {},
      ops: ops
    };
  },
  computed: {
    ...mapGetters({
      assetList: 'assetList'
    })
  },
  methods: {
    formatted_account(id) {
      if (!id) return;
      if (this.items[id]) {
        return this.account[id];
      }
      this.items[id] = true;
      fetch_account(id)
        .then(res => {
          this.$set(this.account, id, res.body.account.name);
        })
        .catch(ex => {
          this.items[id] = false;
          console.error(ex);
        });
      return this.account[id];
    },
    formatted_asset(asset_id, amount) {
      return (
        filters.number(
          (amount / 100000).toFixed(this.assetList[asset_id].precision),
          this.assetList[asset_id].precision
        ) +
        ' ' +
        this.assetList[asset_id].symbol
      );
    }
  }
};
</script>
