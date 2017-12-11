<template>
    <tbody>
    <tr v-for="(op,index) in latestTransactions" :key="index">
        <!-- 账户相关 -->
        <!-- 0:transfer -->
        <td align="right" v-if="ops[op[0]] == 'transfer'">
            <i18n path="transaction.operation.transfer">
                <router-link place="from" :to="{path: '/account/' + formatted_account(op[1].from)}">
                    {{ formatted_account(op[1].from) }}
                </router-link>
                <span place="amount">{{ formatted_number(op[1].amount.asset_id, op[1].amount.amount, 5) }}</span>
                <router-link place="to" :to="{path: '/account/' + formatted_account(op[1].to)}">
                    {{ formatted_account(op[1].to) }}
                </router-link>
            </i18n>
        </td>
        <!-- 1:limit_order_create -->
        <td align="right" v-if="ops[op[0]] == 'limit_order_create'">-</td>
        <!-- 2:limit_order_cancel -->
        <td align="right" v-if="ops[op[0]] == 'limit_order_cancel'">-</td>
        <!-- 3:call_order_update -->
        <td align="right" v-if="ops[op[0]] == 'call_order_update'">-</td>
        <!-- 4:fill_order -->
        <td align="right" v-if="ops[op[0]] == 'fill_order'">-</td>
        <!-- 5:account_create -->
        <td align="right" v-if="ops[op[0]] == 'account_create'">
            <i18n path="transaction.operation.account_create">
                <router-link place="registrar" :to="{path: '/account/' + formatted_account(op[1].registrar)}">
                    {{ formatted_account(op[1].registrar) }}
                </router-link>
                <router-link place="account" :to="{path: '/account/' + formatted_account(op[1].name)}">
                    {{ formatted_account(op[1].name) }}
                </router-link>
            </i18n>
        </td>
        <!-- 6:account_update -->
        <td align="right" v-if="ops[op[0]] == 'account_update'">
            <i18n path="transaction.operation.update_account">
                <router-link place="account" :to="{path: '/account/' + formatted_account(op[1].account)}">
                    {{ formatted_account(op[1].account) }}
                </router-link>
            </i18n>
        </td>
        <!-- 7:account_whitelist -->
        <td align="right" v-if="ops[op[0]] == 'account_whitelist'">
            <i18n path="transaction.operation.unlisted_by" v-if="op[1].new_listing === listings.no_listing">
                <router-link place="lister" :to="{path: '/account/' + formatted_account(op[1].authorizing_account)}">
                    {{ formatted_account(op[1].authorizing_account) }}
                </router-link>
                <router-link place="listee" :to="{path: '/account/' + formatted_account(op[1].account_to_list)}">
                    {{ formatted_account(op[1].account_to_list) }}
                </router-link>
            </i18n>
            <i18n path="transaction.operation.whitelisted_by" v-if="op[1].new_listing === listings.white_listed">
                <router-link place="lister" :to="{path: '/account/' + formatted_account(op[1].authorizing_account)}">
                    {{ formatted_account(op[1].authorizing_account) }}
                </router-link>
                <router-link place="listee" :to="{path: '/account/' + formatted_account(op[1].account_to_list)}">
                    {{ formatted_account(op[1].account_to_list) }}
                </router-link>
            </i18n>
            <i18n path="transaction.operation.blacklisted_by" v-if="op[1].new_listing === listings.black_listed">
                <router-link place="lister" :to="{path: '/account/' + formatted_account(op[1].authorizing_account)}">
                    {{ formatted_account(op[1].authorizing_account) }}
                </router-link>
                <router-link place="listee" :to="{path: '/account/' + formatted_account(op[1].account_to_list)}">
                    {{ formatted_account(op[1].account_to_list) }}
                </router-link>
            </i18n>
        </td>
        <!-- 8:account_upgrade -->
        <td align="right" v-if="ops[op[0]] == 'account_upgrade'">
            <i18n path="transaction.operation.lifetime_upgrade_account" v-if="op[1].upgrade_to_lifetime_member">
                <router-link place="account" :to="{path: '/account/' + formatted_account(op[1].account_to_upgrade)}">
                    {{ formatted_account(op[1].account_to_upgrade) }}
                </router-link>
            </i18n>
            <i18n path="transaction.operation.annual_upgrade_account" v-else>
                <router-link place="account" :to="{path: '/account/' + formatted_account(op[1].account_to_upgrade)}">
                    {{ formatted_account(op[1].account_to_upgrade) }}
                </router-link>
            </i18n>
        </td>
        <!-- 9:account_transfer -->
        <td align="right" v-if="ops[op[0]] == 'account_transfer'">
            <i18n path="transaction.operation.account_transfer">
                <router-link place="account" :to="{path: '/account/' + formatted_account(op[1].account_id)}">
                    {{ formatted_account(op[1].account_id) }}
                </router-link>
                <router-link place="new_account" :to="{path: '/account/' + formatted_account(op[1].new_account)}">
                    {{ formatted_account(op[1].new_account) }}
                </router-link>
            </i18n>
        </td>

        <!-- 资产相关 -->
        <!-- 10:asset_create -->
        <td align="right" v-if="ops[op[0]] == 'asset_create'">
            <i18n path="transaction.operation.asset_create">
                <router-link place="account" :to="{path: '/account/' + formatted_account(op[1].issuer)}">
                    {{ formatted_account(op[1].issuer) }}
                </router-link>
                <span place="asset">{{ op[1].symbol}}</span>
            </i18n>
        </td>
        <!-- 11:asset_update -->
        <td align="right" v-if="ops[op[0]] == 'asset_update'">-</td>
        <!-- 12:asset_update_bitasset -->
        <td align="right" v-if="ops[op[0]] == 'asset_update_bitasset'">-</td>
        <!-- 13:asset_update_feed_producers -->
        <td align="right" v-if="ops[op[0]] == 'asset_update_feed_producers'">-</td>
        <!-- 14:asset_issue -->
        <td align="right" v-if="ops[op[0]] == 'asset_issue'">
            <i18n path="transaction.operation.asset_issue">
                <router-link place="account" :to="{path: '/account/' + formatted_account(op[1].issuer)}">
                    {{ formatted_account(op[1].issuer) }}
                </router-link>
                <span place="amount">{{ formatted_number(op[1].asset_to_issue.asset_id, op[1].asset_to_issue.amount, 5)
                    }}</span>
                <router-link place="to" :to="{path: '/account/' + formatted_account(op[1].issue_to_account)}">
                    {{ formatted_account(op[1].issue_to_account) }}
                </router-link>
            </i18n>
        </td>
        <!-- 15:asset_reserve -->
        <td align="right" v-if="ops[op[0]] == 'asset_reserve'">-</td>
        <!-- 16:asset_fund_fee_pool -->
        <td align="right" v-if="ops[op[0]] == 'asset_fund_fee_pool'">-</td>
        <!-- 17:asset_settle -->
        <td align="right" v-if="ops[op[0]] == 'asset_settle'">-</td>
        <!-- 18:asset_global_settle -->
        <td align="right" v-if="ops[op[0]] == 'asset_global_settle'">-</td>
        <!-- 19:asset_publish_feed -->
        <td align="right" v-if="ops[op[0]] == 'asset_publish_feed'">-</td>

        <!-- 其他相关 -->
        <!-- 20:witness_create -->
        <td align="right" v-if="ops[op[0]] == 'witness_create'">-</td>
        <!-- 21:witness_update -->
        <td align="right" v-if="ops[op[0]] == 'witness_update'">-</td>

        <!-- 25:withdraw_permission_create -->
        <td align="right" v-if="ops[op[0]] == 'withdraw_permission_create'">-</td>
        <!-- 26:withdraw_permission_update -->
        <td align="right" v-if="ops[op[0]] == 'withdraw_permission_update'">-</td>
        <!-- 27:withdraw_permission_claim -->
        <td align="right" v-if="ops[op[0]] == 'withdraw_permission_claim'">-</td>
        <!-- 28:withdraw_permission_delete -->
        <td align="right" v-if="ops[op[0]] == 'withdraw_permission_delete'">-</td>
        <!-- 29:committee_member_create -->
        <td align="right" v-if="ops[op[0]] == 'committee_member_create'">-</td>
        <!-- 30:committee_member_update -->
        <td align="right" v-if="ops[op[0]] == 'committee_member_update'">-</td>
        <!-- 31:committee_member_update_global_parameters -->
        <td align="right" v-if="ops[op[0]] == 'committee_member_update_global_parameters'">-</td>
        <!-- 32:vesting_balance_create -->
        <td align="right" v-if="ops[op[0]] == 'vesting_balance_create'">-</td>
        <!-- 33:vesting_balance_withdraw -->
        <td align="right" v-if="ops[op[0]] == 'vesting_balance_withdraw'">
            <i18n path="transaction.operation.vesting_balance_withdraw">
                <router-link place="account" :to="{path: '/account/' + formatted_account(op[1].owner)}">
                    {{ formatted_account(op[1].owner) }}
                </router-link>
                <span place="amount">{{ formatted_number(op[1].amount.asset_id, op[1].amount.amount, 5) }}</span>
            </i18n>
        </td>
        <!-- 34:worker_create -->
        <td align="right" v-if="ops[op[0]] == 'worker_create'">-</td>
        <!-- 35:custom -->
        <td align="right" v-if="ops[op[0]] == 'custom'">-</td>
        <!-- 36:assert -->
        <td align="right" v-if="ops[op[0]] == 'assert'">-</td>
        <!-- 37:balance_claim -->
        <td align="right" v-if="ops[op[0]] == 'balance_claim'">-</td>
        <!-- 38:override_transfer -->
        <td align="right" v-if="ops[op[0]] == 'override_transfer'">
            <i18n path="transaction.operation.override_transfer">
                <router-link place="issuer" :to="{path: '/account/' + formatted_account(op[1].issuer)}">
                    {{ formatted_account(op[1].issuer) }}
                </router-link>
                <router-link place="from" :to="{path: '/account/' + formatted_account(op[1].from)}">
                    {{ formatted_account(op[1].from) }}
                </router-link>
                <router-link place="to" :to="{path: '/account/' + formatted_account(op[1].to)}">
                    {{ formatted_account(op[1].to) }}
                </router-link>
                <span place="amount">{{ formatted_number(op[1].amount.asset_id, op[1].amount.amount, 5) }}</span>
            </i18n>
        </td>
        <!-- 39:transfer_to_blind -->
        <td align="right" v-if="ops[op[0]] == 'transfer_to_blind'">-</td>
        <!-- 40:blind_transfer -->
        <td align="right" v-if="ops[op[0]] == 'blind_transfer'">-</td>
        <!-- 41:transfer_from_blind -->
        <td align="right" v-if="ops[op[0]] == 'transfer_from_blind'">-</td>
        <!-- 42:asset_settle_cancel -->
        <td align="right" v-if="ops[op[0]] == 'asset_settle_cancel'">-</td>
        <!-- 43:asset_claim_fees -->
        <td align="right" v-if="ops[op[0]] == 'asset_claim_fees'">-</td>
        <!-- 44:fba_distribute -->
        <td align="right" v-if="ops[op[0]] == 'fba_distribute'">-</td>

        <!-- 数据交易相关 -->
        <!-- 45:account_upgrade_merchant -->
        <td align="right" v-if="ops[op[0]] == 'account_upgrade_merchant'">
            <i18n path="transaction.operation.account_upgrade_merchant">
                <router-link place="account" :to="{path: '/account/' + formatted_account(op[1].account_to_upgrade)}">
                    {{ formatted_account(op[1].account_to_upgrade) }}
                </router-link>
            </i18n>
        </td>
        <!-- 46:account_upgrade_datasource -->
        <td align="right" v-if="ops[op[0]] == 'account_upgrade_datasource'">
            <i18n path="transaction.operation.account_upgrade_datasource">
                <router-link place="account" :to="{path: '/account/' + formatted_account(op[1].account_to_upgrade)}">
                    {{ formatted_account(op[1].account_to_upgrade) }}
                </router-link>
            </i18n>
        </td>
        <!-- 47:stale_data_market_category_create -->
        <td align="right" v-if="ops[op[0]] == 'stale_data_market_category_create'">
            <i18n path="transaction.operation.data_market_category_create">
                <router-link place="issuer" :to="{path: '/account/' + formatted_account(op[1].issuer)}">
                    {{ formatted_account(op[1].issuer) }}
                </router-link>
                <span place="category">{{op[1].category_name}}</span>
            </i18n>
        </td>
        <!-- 48:stale_data_market_category_update -->
        <td align="right" v-if="ops[op[0]] == 'stale_data_market_category_update'">
            <i18n path="transaction.operation.data_market_category_update">
                <router-link place="issuer" :to="{path: '/account/' + formatted_account('1.2.0')}">
                    {{ formatted_account('1.2.0') }}
                </router-link>
                <span place="category">{{op[1].new_category_name}}</span>
            </i18n>
        </td>
        <!-- 49:stale_free_data_product_create -->
        <td align="right" v-if="ops[op[0]] == 'stale_free_data_product_create'">
            <i18n path="transaction.operation.free_data_product_create">
                <router-link place="issuer" :to="{path: '/account/' + formatted_account(op[1].issuer)}">
                    {{ formatted_account(op[1].issuer) }}
                </router-link>
                <span place="product">{{op[1].product_name}}</span>
            </i18n>
        </td>
        <!-- 50:stale_free_data_product_update -->
        <td align="right" v-if="ops[op[0]] == 'stale_free_data_product_update'">
            <i18n path="transaction.operation.free_data_product_update">
                <router-link place="issuer" :to="{path: '/account/' + formatted_account('1.2.0')}">
                    {{ formatted_account('1.2.0') }}
                </router-link>
                <span place="product">{{op[1].new_product_name}}</span>
            </i18n>
        </td>
        <!-- 51:stale_league_data_product_create -->
        <td align="right" v-if="ops[op[0]] == 'stale_league_data_product_create'">
            <i18n path="transaction.operation.league_data_product_create">
                <router-link place="issuer" :to="{path: '/account/' + formatted_account(op[1].issuer)}">
                    {{ formatted_account(op[1].issuer) }}
                </router-link>
                <span place="product">{{op[1].product_name}}</span>
            </i18n>
        </td>
        <!-- 52:stale_league_data_product_update -->
        <td align="right" v-if="ops[op[0]] == 'stale_league_data_product_update'">
            <i18n path="transaction.operation.league_data_product_update">
                <router-link place="issuer" :to="{path: '/account/' + formatted_account('1.2.0')}">
                    {{ formatted_account('1.2.0') }}
                </router-link>
                <span place="product">{{op[1].new_product_name}}</span>
            </i18n>
        </td>
        <!-- 53:stale_league_create -->
        <td align="right" v-if="ops[op[0]] == 'stale_league_create'">
            <i18n path="transaction.operation.league_create">
                <router-link place="issuer" :to="{path: '/account/' + formatted_account(op[1].issuer)}">
                    {{ formatted_account(op[1].issuer) }}
                </router-link>
                <span place="league">{{op[1].league_name}}</span>
            </i18n>
        </td>
        <!-- 54:stale_league_update -->
        <td align="right" v-if="ops[op[0]] == 'stale_league_update'">
            <i18n path="transaction.operation.league_update">
                <router-link place="issuer" :to="{path: '/account/' + formatted_account('1.2.0')}">
                    {{ formatted_account('1.2.0') }}
                </router-link>
                <span place="league">{{op[1].new_league_name}}</span>
            </i18n>
        </td>
        <!-- 55:data_transaction_create -->
        <td align="right" v-if="ops[op[0]] == 'data_transaction_create'">
            <i18n path="transaction.operation.data_transaction_create">
                <router-link place="account" :to="{path: '/account/' + formatted_account(op[1].requester)}">
                    {{ formatted_account(op[1].requester) }}
                </router-link>
            </i18n>
        </td>
        <!-- 56:data_transaction_update -->
        <td align="right" v-if="ops[op[0]] == 'data_transaction_update'">
            <i18n path="transaction.operation.data_transaction_update">
                <router-link place="account" :to="{path: '/account/' + formatted_account(op[1].new_requester)}">
                    {{ formatted_account(op[1].new_requester) }}
                </router-link>
            </i18n>
        </td>
        <!-- 57:data_transaction_pay -->
        <td align="right" v-if="ops[op[0]] == 'data_transaction_pay'">
            <i18n path="transaction.operation.data_transaction_pay">
                <router-link place="from" :to="{path: '/account/' + formatted_account(op[1].from)}">
                    {{ formatted_account(op[1].from) }}
                </router-link>
                <span place="amount">{{ formatted_number(op[1].amount.asset_id, op[1].amount.amount, 5) }}</span>
                <router-link place="to" :to="{path: '/account/' + formatted_account(op[1].to)}">
                    {{ formatted_account(op[1].to) }}
                </router-link>
            </i18n>
        </td>
        <!-- 58:account_upgrade_data_transaction_member -->
        <td align="right" v-if="ops[op[0]] == 'account_upgrade_data_transaction_member'">
            <i18n path="transaction.operation.account_upgrade_data_transaction_member">
                <router-link place="account" :to="{path: '/account/' + formatted_account(op[1].account_to_upgrade)}">
                    {{ formatted_account(op[1].account_to_upgrade) }}
                </router-link>
            </i18n>
        </td>
        <!-- 59:data_transaction_datasource_upload -->
        <td align="right" v-if="ops[op[0]] == 'data_transaction_datasource_upload'">
            <i18n path="transaction.operation.data_transaction_datasource_upload">
                <router-link place="account" :to="{path: '/account/' + formatted_account(op[1].requester)}">
                    {{ formatted_account(op[1].requester) }}
                </router-link>
                <router-link place="datasource" :to="{path: '/account/' + formatted_account(op[1].datasource)}">
                    {{ formatted_account(op[1].datasource) }}
                </router-link>
            </i18n>
        </td>
        <!-- 60:data_transaction_datasource_validate_error -->
        <td align="right" v-if="ops[op[0]] == 'data_transaction_datasource_validate_error'">
            <i18n path="transaction.operation.data_transaction_datasource_validate_error">
                <router-link place="account" :to="{path: '/account/' + formatted_account(op[1].datasource)}">
                    {{ formatted_account(op[1].datasource) }}
                </router-link>
            </i18n>
        </td>
        <!-- 61:data_market_category_create -->
        <td align="right" v-if="ops[op[0]] == 'data_market_category_create'">
            <i18n path="transaction.operation.data_market_category_create">
                <router-link place="issuer" :to="{path: '/account/' + formatted_account(op[1].issuer)}">
                    {{ formatted_account(op[1].issuer) }}
                </router-link>
                <span place="category">{{op[1].category_name}}</span>
            </i18n>
        </td>
        <!-- 62:data_market_category_update -->
        <td align="right" v-if="ops[op[0]] == 'data_market_category_update'">
            <i18n path="transaction.operation.data_market_category_update">
                <router-link place="issuer" :to="{path: '/account/' + formatted_account('1.2.0')}">
                    {{ formatted_account('1.2.0') }}
                </router-link>
                <span place="category">{{op[1].new_category_name}}</span>
            </i18n>
        </td>
        <!-- 63:free_data_product_create -->
        <td align="right" v-if="ops[op[0]] == 'free_data_product_create'">
            <i18n path="transaction.operation.free_data_product_create">
                <router-link place="issuer" :to="{path: '/account/' + formatted_account(op[1].issuer)}">
                    {{ formatted_account(op[1].issuer) }}
                </router-link>
                <span place="product">{{op[1].product_name}}</span>
            </i18n>
        </td>
        <!-- 64:free_data_product_update -->
        <td align="right" v-if="ops[op[0]] == 'free_data_product_update'">
            <i18n path="transaction.operation.free_data_product_update">
                <router-link place="issuer" :to="{path: '/account/' + formatted_account('1.2.0')}">
                    {{ formatted_account('1.2.0') }}
                </router-link>
                <span place="product">{{op[1].new_product_name}}</span>
            </i18n>
        </td>
        <!-- 65:league_data_product_create -->
        <td align="right" v-if="ops[op[0]] == 'league_data_product_create'">
            <i18n path="transaction.operation.league_data_product_create">
                <router-link place="issuer" :to="{path: '/account/' + formatted_account(op[1].issuer)}">
                    {{ formatted_account(op[1].issuer) }}
                </router-link>
                <span place="product">{{op[1].product_name}}</span>
            </i18n>
        </td>
        <!-- 66:league_data_product_update -->
        <td align="right" v-if="ops[op[0]] == 'league_data_product_update'">
            <i18n path="transaction.operation.league_data_product_update">
                <router-link place="issuer" :to="{path: '/account/' + formatted_account('1.2.0')}">
                    {{ formatted_account('1.2.0') }}
                </router-link>
                <span place="product">{{op[1].new_product_name}}</span>
            </i18n>
        </td>
        <!-- 67:league_create -->
        <td align="right" v-if="ops[op[0]] == 'league_create'">
            <i18n path="transaction.operation.league_create">
                <router-link place="issuer" :to="{path: '/account/' + formatted_account(op[1].issuer)}">
                    {{ formatted_account(op[1].issuer) }}
                </router-link>
                <span place="league">{{op[1].league_name}}</span>
            </i18n>
        </td>
        <!-- 68:league_update -->
        <td align="right" v-if="ops[op[0]] == 'league_update'">
            <i18n path="transaction.operation.league_update">
                <router-link place="issuer" :to="{path: '/account/' + formatted_account('1.2.0')}">
                    {{ formatted_account('1.2.0') }}
                </router-link>
                <span place="league">{{op[1].new_league_name}}</span>
            </i18n>
        </td>

        <!-- 71:balance_lock -->
        <td align="right" v-if="ops[op[0]] == 'balance_lock'">
            <i18n path="transaction.operation.balance_lock">
                <router-link place="account" :to="{path: '/account/' + formatted_account(op[1]['account'])}">
                    {{ formatted_account(op[1]['account']) }}
                </router-link>
                <span place="amount">{{ formatted_number(op[1].amount.asset_id, op[1].amount.amount, 5) }}</span>
            </i18n>
        </td>
        <!-- 72:balance_unlock -->
        <td align="right" v-if="ops[op[0]] == 'balance_unlock'">
            <i18n path="transaction.operation.balance_unlock">
                <router-link place="account" :to="{path: '/account/' + formatted_account(op[1]['account'])}">
                    {{ formatted_account(op[1]['account']) }}
                </router-link>
            </i18n>
        </td>
    </tr>
    </tbody>
</template>

<script>
    import { ChainTypes } from 'gxbjs/es';
    import { fetch_account_by_chain, formatted_asset } from '@/services/CommonService';

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
            latestTransactions: {}
        },
        data () {
            return {
                listings,
                items: {},
                account: {},
                ops: ops
            };
        },
        methods: {
            formatted_account (id) {
                let self = this;
                if (this.items[id]) {
                    return this.account[id];
                }
                this.items[id] = true;
                fetch_account_by_chain(id).then((account) => {
                    self.$set(self.account, id, account.toJS().name);
                }).catch(ex => {
                    self.items[id] = false;
                    console.error(ex);
                });
                return this.account[id];
            },
            formatted_number (asset_id, amount, decimalOffset) {
                return formatted_asset(asset_id, amount, decimalOffset);
            }
        }
    };
</script>