<template>
    <div class="col-md-12">
        <div class="panel panel-default">
            <div class="panel-heading">
                <span class="fa fa-list">&nbsp;{{$t('transaction.trx_op')}} <span v-if="id>0">{{id}}</span></span>
                <span class="right" v-if="this.txid"><router-link
                        :to="{path:'/transaction/'+this.txid}">txid:{{this.txid}}</router-link></span>
            </div>
            <div class="panel-body no-padding">
                <div class="table-responsive">
                    <table class="table table-striped no-margin">
                        <!-- 账户相关 -->
                        <!-- 0:transfer -->
                        <tbody v-if="ops[op[0]] == 'transfer'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-success">{{$t('transaction.trxTypes.transfer.name')}}</span></td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.transfer.from')}}</th>
                            <td align="right">
                                <router-link :to="{path: '/account/' + op[1].from}">
                                    {{formatted_account(op[1].from, 'from')}}
                                </router-link>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.transfer.to')}}</th>
                            <td align="right">
                                <router-link :to="{path: '/account/' + op[1].to}">
                                    {{formatted_account(op[1].to, 'to')}}
                                </router-link>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.transfer.amount')}}</th>
                            <td align="right">{{formatted_number(op[1].amount.asset_id, op[1].amount.amount, 5)}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.transfer.fee')}}</th>
                            <td align="right">{{formatted_number(op[1].fee.asset_id, op[1].fee.amount, 5)}}</td>
                        </tr>
                        </tbody>
                        <!-- 1:limit_order_create -->
                        <tbody v-if="ops[op[0]] == 'limit_order_create'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-warning">{{$t('transaction.trxTypes.limit_order_create')}}</span>
                            </td>
                        </tr>
                        </tbody>
                        <!-- 2:limit_order_cancel -->
                        <tbody v-if="ops[op[0]] == 'limit_order_cancel'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-danger">{{$t('transaction.trxTypes.limit_order_cancel')}}</span>
                            </td>
                        </tr>
                        </tbody>
                        <!-- 3:call_order_update -->
                        <tbody v-if="ops[op[0]] == 'call_order_update'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-primary">{{$t('transaction.trxTypes.call_order_update')}}</span>
                            </td>
                        </tr>
                        </tbody>
                        <!-- 4:fill_order -->
                        <tbody v-if="ops[op[0]] == 'fill_order'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span class="label label-primary">{{$t('transaction.trxTypes.fill_order')}}</span>
                            </td>
                        </tr>
                        </tbody>
                        <!-- 5:account_create -->
                        <tbody v-if="ops[op[0]] == 'account_create'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-primary">{{$t('transaction.trxTypes.account_create.name')}}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.account_create.registrar')}}</th>
                            <td align="right">
                                <router-link :to="{path: '/account/' + op[1].registrar}">
                                    {{formatted_account(op[1].registrar, 'registrar')}}
                                </router-link>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.account_create.referrer')}}</th>
                            <td align="right">
                                <router-link :to="{path: '/account/' + op[1].referrer}">
                                    {{formatted_account(op[1].referrer, 'referrer')}}
                                </router-link>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.account_create.account')}}</th>
                            <td align="right">
                                <router-link :to="{path: '/account/' + op[1].name}">{{op[1].name}}</router-link>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.account_create.fee')}}</th>
                            <td align="right">{{formatted_number(op[1].fee.asset_id, op[1].fee.amount, 5)}}</td>
                        </tr>
                        </tbody>
                        <!-- 6:account_update -->
                        <tbody v-if="ops[op[0]] == 'account_update'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-primary">{{$t('transaction.trxTypes.account_update.name')}}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.account_update.account')}}</th>
                            <td align="right">
                                <router-link :to="{path: '/account/' + op[1].account}">
                                    {{formatted_account(op[1].account, 'account')}}
                                </router-link>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.account_update.fee')}}</th>
                            <td align="right">{{formatted_number(op[1].fee.asset_id, op[1].fee.amount, 5)}}</td>
                        </tr>
                        </tbody>
                        <!-- 7:account_whitelist -->
                        <tbody v-if="ops[op[0]] == 'account_whitelist'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-primary">{{$t('transaction.trxTypes.account_whitelist.name')}}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.account_whitelist.authorizing_account')}}</th>
                            <td align="right">
                                <router-link :to="{path: '/account/' + op[1].authorizing_account}">
                                    {{formatted_account(op[1].authorizing_account, 'authorizing_account')}}
                                </router-link>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.account_whitelist.account_to_list')}}</th>
                            <td align="right">
                                <router-link :to="{path: '/account/' + op[1].account_to_list}">
                                    {{formatted_account(op[1].account_to_list, 'account_to_list')}}
                                </router-link>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.account_whitelist.new_listing')}}</th>
                            <td align="right">{{$t(formatted_listing(op[1].new_listing))}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.account_whitelist.fee')}}</th>
                            <td align="right">{{formatted_number(op[1].fee.asset_id, op[1].fee.amount, 5)}}</td>
                        </tr>
                        </tbody>
                        <!-- 8:account_upgrade -->
                        <tbody v-if="ops[op[0]] == 'account_upgrade'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-primary">{{$t('transaction.trxTypes.account_upgrade.name')}}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.account_upgrade.account_to_upgrade')}}</th>
                            <td align="right">
                                <router-link :to="{path: '/account/' + op[1].account_to_upgrade}">
                                    {{formatted_account(op[1].account_to_upgrade, 'account_to_upgrade')}}
                                </router-link>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.account_upgrade.fee')}}</th>
                            <td align="right">{{formatted_number(op[1].fee.asset_id, op[1].fee.amount, 5)}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.account_upgrade.upgrade_to_lifetime_member')}}</th>
                            <td align="right">{{op[1].upgrade_to_lifetime_member}}</td>
                        </tr>
                        </tbody>
                        <!-- 9:account_transfer -->
                        <tbody v-if="ops[op[0]] == 'account_transfer'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-primary">{{$t('transaction.trxTypes.account_transfer.name')}}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.account_transfer.account_id')}}</th>
                            <td align="right">
                                <router-link :to="{path: '/account/' + op[1].account_id}">
                                    {{formatted_account(op[1].account_id, 'account_id')}}
                                </router-link>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.account_transfer.new_owner')}}</th>
                            <td align="right">
                                <router-link :to="{path: '/account/' + op[1].new_owner}">
                                    {{formatted_account(op[1].new_owner, 'new_owner')}}
                                </router-link>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.account_transfer.fee')}}</th>
                            <td align="right">{{formatted_number(op[1].fee.asset_id, op[1].fee.amount, 5)}}</td>
                        </tr>
                        </tbody>

                        <!-- 资产相关 -->
                        <!-- 10:asset_create -->
                        <tbody v-if="ops[op[0]] == 'asset_create'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-warning">{{$t('transaction.trxTypes.asset_create.name')}}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.asset_create.issuer')}}</th>
                            <td align="right">
                                <router-link :to="{path: '/account/' + op[1].issuer}">
                                    {{formatted_account(op[1].issuer, 'issuer')}}
                                </router-link>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.asset_create.symbol')}}</th>
                            <td align="right">{{op[1].symbol}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.asset_create.precision')}}</th>
                            <td align="right">{{op[1].precision}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.asset_create.max_supply')}}</th>
                            <td align="right">{{op[1].common_options.max_supply}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.asset_create.description')}}</th>
                            <td align="right">{{op[1].common_options.description}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.asset_create.market_fee')}}</th>
                            <td align="right">{{op[1].common_options.market_fee_percent}}%</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.asset_create.maximum_market_fee')}}</th>
                            <td align="right">{{op[1].common_options.max_market_fee}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.asset_create.fee')}}</th>
                            <td align="right">{{formatted_number(op[1].fee.asset_id, op[1].fee.amount, 5)}}</td>
                        </tr>
                        </tbody>
                        <!-- 11:asset_update -->
                        <tbody v-if="ops[op[0]] == 'asset_update'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-primary">{{$t('transaction.trxTypes.asset_update')}}</span></td>
                        </tr>
                        </tbody>
                        <!-- 12:asset_update_bitasset -->
                        <tbody v-if="ops[op[0]] == 'asset_update_bitasset'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-primary">{{$t('transaction.trxTypes.asset_update_bitasset')}}</span>
                            </td>
                        </tr>
                        </tbody>
                        <!-- 13:asset_update_feed_producers -->
                        <tbody v-if="ops[op[0]] == 'asset_update_feed_producers'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-primary">{{$t('transaction.trxTypes.asset_update_feed_producers')}}</span>
                            </td>
                        </tr>
                        </tbody>
                        <!-- 14:asset_issue -->
                        <tbody v-if="ops[op[0]] == 'asset_issue'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-warning">{{$t('transaction.trxTypes.asset_issue.name')}}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.asset_issue.issuer')}}</th>
                            <td align="right">
                                <router-link :to="{path: '/account/' + op[1].issuer}">
                                    {{formatted_account(op[1].issuer, 'issuer')}}
                                </router-link>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.asset_issue.asset_to_issue')}}</th>
                            <td align="right">
                                {{formatted_number(op[1].asset_to_issue.asset_id, op[1].asset_to_issue.amount, 5)}}
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.asset_issue.issue_to_account')}}</th>
                            <td align="right">
                                <router-link :to="{path: '/account/' + op[1].issue_to_account}">
                                    {{formatted_account(op[1].issue_to_account, 'issue_to_account')}}
                                </router-link>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.asset_issue.fee')}}</th>
                            <td align="right">{{formatted_number(op[1].fee.asset_id, op[1].fee.amount, 5)}}</td>
                        </tr>
                        </tbody>
                        <!-- 15:asset_reserve -->
                        <tbody v-if="ops[op[0]] == 'asset_reserve'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-danger">{{$t('transaction.trxTypes.asset_reserve')}}</span></td>
                        </tr>
                        </tbody>
                        <!-- 16:asset_fund_fee_pool -->
                        <tbody v-if="ops[op[0]] == 'asset_fund_fee_pool'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-primary">{{$t('transaction.trxTypes.asset_fund_fee_pool')}}</span>
                            </td>
                        </tr>
                        </tbody>
                        <!-- 17:asset_settle -->
                        <tbody v-if="ops[op[0]] == 'asset_settle'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-primary">{{$t('transaction.trxTypes.asset_settle')}}</span></td>
                        </tr>
                        </tbody>
                        <!-- 18:asset_global_settle -->
                        <tbody v-if="ops[op[0]] == 'asset_global_settle'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-primary">{{$t('transaction.trxTypes.asset_global_settle')}}</span>
                            </td>
                        </tr>
                        </tbody>
                        <!-- 19:asset_publish_feed -->
                        <tbody v-if="ops[op[0]] == 'asset_publish_feed'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-warning">{{$t('transaction.trxTypes.asset_publish_feed')}}</span>
                            </td>
                        </tr>
                        </tbody>

                        <!-- 其他相关 -->
                        <!-- 20:witness_create -->
                        <tbody v-if="ops[op[0]] == 'witness_create'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-warning">{{$t('transaction.trxTypes.witness_create')}}</span>
                            </td>
                        </tr>
                        </tbody>
                        <!-- 21:witness_update -->
                        <tbody v-if="ops[op[0]] == 'witness_update'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-primary">{{$t('transaction.trxTypes.witness_update')}}</span>
                            </td>
                        </tr>
                        </tbody>
                        <!-- 22:proposal_create -->
                        <tbody v-if="ops[op[0]] == 'proposal_create'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-warning">{{$t('transaction.trxTypes.proposal.proposal_create')}}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.proposal.fee')}}</th>
                            <td align="right">{{formatted_number(op[1].fee.asset_id, op[1].fee.amount, 5)}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.proposal.fee_paying_account')}}</th>
                            <td align="right">
                                <router-link :to="{path: '/account/' + op[1].fee_paying_account}">
                                    {{formatted_account(op[1].fee_paying_account, 'fee_paying_account')}}
                                </router-link>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.proposal.expiration_time')}}</th>
                            <td align="right">{{op[1].expiration_time}}</td>
                        </tr>
                        <tr v-if="op[1].proposed_ops[0]">
                            <td colspan="2">
                                <Proposed_Op v-for="(operation,index) in op[1].proposed_ops[0]" :key="index" :id="index"
                                             :operation="operation"></Proposed_Op>
                            </td>
                        </tr>
                        </tbody>
                        <!-- 23:proposal_update -->
                        <tbody v-if="ops[op[0]] == 'proposal_update'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-primary">{{$t('transaction.trxTypes.proposal.proposal_update')}}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.proposal.fee')}}</th>
                            <td align="right">{{formatted_number(op[1].fee.asset_id, op[1].fee.amount, 5)}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.proposal.fee_paying_account')}}</th>
                            <td align="right">
                                <router-link :to="{path: '/account/' + op[1].fee_paying_account}">
                                    {{formatted_account(op[1].fee_paying_account, 'fee_paying_account')}}
                                </router-link>
                            </td>
                        </tr>
                        <tr v-if="op[1].active_approvals_to_add.length>0">
                            <th>{{$t('transaction.trxTypes.proposal.update.active_approvals_to_add')}}</th>
                            <td align="right">
                <span class="account_span" v-for="(account,index) in op[1].active_approvals_to_add" :key="index">
                  <router-link :to="{path: '/account/' + account}">{{account}}</router-link>
                </span>
                            </td>
                        </tr>
                        <tr v-if="op[1].active_approvals_to_remove.length>0">
                            <th>{{$t('transaction.trxTypes.proposal.update.active_approvals_to_remove')}}</th>
                            <td align="right">
                <span class="account_span" v-for="(account,index) in op[1].active_approvals_to_remove" :key="index">
                  <router-link :to="{path: '/account/' + account}">{{account}}</router-link>
                </span>
                            </td>
                        </tr>
                        <tr v-if="op[1].owner_approvals_to_add.length>0">
                            <th>{{$t('transaction.trxTypes.proposal.update.owner_approvals_to_add')}}</th>
                            <td align="right">
                <span class="account_span" v-for="(account,index) in op[1].owner_approvals_to_add" :key="index">
                  <router-link :to="{path: '/account/' + account}">{{account}}</router-link>
                </span>
                            </td>
                        </tr>
                        <tr v-if="op[1].owner_approvals_to_remove.length>0">
                            <th>{{$t('transaction.trxTypes.proposal.update.owner_approvals_to_remove')}}</th>
                            <td align="right">
                <span class="account_span" v-for="(account,index) in op[1].owner_approvals_to_remove" :key="index">
                  <router-link :to="{path: '/account/' + account}">{{account}}</router-link>
                </span>
                            </td>
                        </tr>
                        <tr v-if="op[1].key_approvals_to_add.length>0">
                            <th>{{$t('transaction.trxTypes.proposal.update.key_approvals_to_add')}}</th>
                            <td align="right">
                <span class="account_span" v-for="(account,index) in op[1].key_approvals_to_add" :key="index">
                  <router-link :to="{path: '/account/' + account}">{{account}}</router-link>
                </span>
                            </td>
                        </tr>
                        <tr v-if="op[1].key_approvals_to_remove.length>0">
                            <th>{{$t('transaction.trxTypes.proposal.update.key_approvals_to_remove')}}</th>
                            <td align="right">
                <span class="account_span" v-for="(account,index) in op[1].key_approvals_to_remove" :key="index">
                  <router-link :to="{path: '/account/' + account}">{{account}}</router-link>
                </span>
                            </td>
                        </tr>
                        </tbody>
                        <!-- 24:proposal_delete -->
                        <tbody v-if="ops[op[0]] == 'proposal_delete'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-danger">{{$t('transaction.trxTypes.proposal.proposal_delete')}}</span>
                            </td>
                        </tr>
                        </tbody>
                        <!-- 25:withdraw_permission_create -->
                        <tbody v-if="ops[op[0]] == 'withdraw_permission_create'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-warning">{{$t('transaction.trxTypes.withdraw_permission_create')}}</span>
                            </td>
                        </tr>
                        </tbody>
                        <!-- 26:withdraw_permission_update -->
                        <tbody v-if="ops[op[0]] == 'withdraw_permission_update'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-primary">{{$t('transaction.trxTypes.withdraw_permission_update')}}</span>
                            </td>
                        </tr>
                        </tbody>
                        <!-- 27:withdraw_permission_claim -->
                        <tbody v-if="ops[op[0]] == 'withdraw_permission_claim'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-primary">{{$t('transaction.trxTypes.withdraw_permission_claim')}}</span>
                            </td>
                        </tr>
                        </tbody>
                        <!-- 28:withdraw_permission_delete -->
                        <tbody v-if="ops[op[0]] == 'withdraw_permission_delete'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-danger">{{$t('transaction.trxTypes.withdraw_permission_delete')}}</span>
                            </td>
                        </tr>
                        </tbody>
                        <!-- 29:committee_member_create -->
                        <tbody v-if="ops[op[0]] == 'committee_member_create'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-warning">{{$t('transaction.trxTypes.committee_member_create')}}</span>
                            </td>
                        </tr>
                        </tbody>
                        <!-- 30:committee_member_update -->
                        <tbody v-if="ops[op[0]] == 'committee_member_update'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-primary">{{$t('transaction.trxTypes.committee_member_update')}}</span>
                            </td>
                        </tr>
                        </tbody>
                        <!-- 31:committee_member_update_global_parameters -->
                        <tbody v-if="ops[op[0]] == 'committee_member_update_global_parameters'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-primary">{{$t('transaction.trxTypes.committee_member_update_global_parameters')}}</span>
                            </td>
                        </tr>
                        </tbody>
                        <!-- 32:vesting_balance_create -->
                        <tbody v-if="ops[op[0]] == 'vesting_balance_create'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-warning">{{$t('transaction.trxTypes.vesting_balance_create')}}</span>
                            </td>
                        </tr>
                        </tbody>
                        <!-- 33:vesting_balance_withdraw -->
                        <tbody v-if="ops[op[0]] == 'vesting_balance_withdraw'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-primary">{{$t('transaction.trxTypes.vesting_balance_withdraw.name')}}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.vesting_balance_withdraw.owner')}}</th>
                            <td align="right">
                                <router-link :to="{path: '/account/' + op[1].owner}">
                                    {{formatted_account(op[1].owner, 'owner')}}
                                </router-link>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.vesting_balance_withdraw.amount')}}</th>
                            <td align="right">{{formatted_number(op[1].amount.asset_id, op[1].amount.amount, 5)}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.vesting_balance_withdraw.fee')}}</th>
                            <td align="right">{{formatted_number(op[1].fee.asset_id, op[1].fee.amount, 5)}}</td>
                        </tr>
                        </tbody>
                        <!-- 34:worker_create -->
                        <tbody v-if="ops[op[0]] == 'worker_create'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-warning">{{$t('transaction.trxTypes.worker_create')}}</span></td>
                        </tr>
                        </tbody>
                        <!-- 35:custom -->
                        <tbody v-if="ops[op[0]] == 'custom'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-primary">{{$t('transaction.trxTypes.custom')}}</span></td>
                        </tr>
                        </tbody>
                        <!-- 36:assert -->
                        <tbody v-if="ops[op[0]] == 'assert'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-primary">{{$t('transaction.trxTypes.assert')}}</span></td>
                        </tr>
                        </tbody>
                        <!-- 37:balance_claim -->
                        <tbody v-if="ops[op[0]] == 'balance_claim'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-primary">{{$t('transaction.trxTypes.balance_claim')}}</span></td>
                        </tr>
                        </tbody>
                        <!-- 38:override_transfer -->
                        <tbody v-if="ops[op[0]] == 'override_transfer'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-primary">{{$t('transaction.trxTypes.override_transfer.name')}}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.override_transfer.issuer')}}</th>
                            <td align="right">
                                <router-link :to="{path: '/account/' + op[1].issuer}">
                                    {{formatted_account(op[1].issuer, 'issuer')}}
                                </router-link>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.override_transfer.from')}}</th>
                            <td align="right">
                                <router-link :to="{path: '/account/' + op[1].from}">
                                    {{formatted_account(op[1].from, 'from')}}
                                </router-link>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.override_transfer.to')}}</th>
                            <td align="right">
                                <router-link :to="{path: '/account/' + op[1].to}">
                                    {{formatted_account(op[1].to, 'to')}}
                                </router-link>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.override_transfer.amount')}}</th>
                            <td align="right">{{formatted_number(op[1].amount.asset_id, op[1].amount.amount, 5)}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.override_transfer.fee')}}</th>
                            <td align="right">{{formatted_number(op[1].fee.asset_id, op[1].fee.amount, 5)}}</td>
                        </tr>
                        </tbody>
                        <!-- 39:transfer_to_blind -->
                        <tbody v-if="ops[op[0]] == 'transfer_to_blind'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-primary">{{$t('transaction.trxTypes.transfer_to_blind')}}</span>
                            </td>
                        </tr>
                        </tbody>
                        <!-- 40:blind_transfer -->
                        <tbody v-if="ops[op[0]] == 'blind_transfer'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-primary">{{$t('transaction.trxTypes.blind_transfer')}}</span>
                            </td>
                        </tr>
                        </tbody>
                        <!-- 41:transfer_from_blind -->
                        <tbody v-if="ops[op[0]] == 'transfer_from_blind'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-primary">{{$t('transaction.trxTypes.transfer_from_blind')}}</span>
                            </td>
                        </tr>
                        </tbody>
                        <!-- 42:asset_settle_cancel -->
                        <tbody v-if="ops[op[0]] == 'asset_settle_cancel'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-danger">{{$t('transaction.trxTypes.asset_settle_cancel')}}</span>
                            </td>
                        </tr>
                        </tbody>
                        <!-- 43:asset_claim_fees -->
                        <tbody v-if="ops[op[0]] == 'asset_claim_fees'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-primary">{{$t('transaction.trxTypes.asset_claim_fees')}}</span>
                            </td>
                        </tr>
                        </tbody>
                        <!-- 44:fba_distribute -->
                        <tbody v-if="ops[op[0]] == 'fba_distribute'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-primary">{{$t('transaction.trxTypes.fba_distribute')}}</span>
                            </td>
                        </tr>
                        </tbody>

                        <!-- 数据交易相关 -->
                        <!-- 45:account_upgrade_merchant -->
                        <tbody v-if="ops[op[0]] == 'account_upgrade_merchant'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-primary">{{$t('transaction.trxTypes.account_upgrade_merchant.name')}}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.account_upgrade_merchant.auth_referrer')}}</th>
                            <td align="right">
                                <router-link :to="{path: '/account/' + op[1].auth_referrer}">
                                    {{formatted_account(op[1].auth_referrer, 'auth_referrer')}}
                                </router-link>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.account_upgrade_merchant.account_to_upgrade')}}</th>
                            <td align="right">
                                <router-link :to="{path: '/account/' + op[1].account_to_upgrade}">
                                    {{formatted_account(op[1].account_to_upgrade, 'account_to_upgrade')}}
                                </router-link>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.account_upgrade_merchant.upgrade_to_merchant_member')}}</th>
                            <td align="right">{{op[1].upgrade_to_merchant_member}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.account_upgrade_merchant.fee')}}</th>
                            <td align="right">{{formatted_number(op[1].fee.asset_id, op[1].fee.amount, 5)}}</td>
                        </tr>
                        </tbody>
                        <!-- 46:account_upgrade_datasource -->
                        <tbody v-if="ops[op[0]] == 'account_upgrade_datasource'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-primary">{{$t('transaction.trxTypes.account_upgrade_datasource.name')}}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.account_upgrade_datasource.auth_referrer')}}</th>
                            <td align="right">
                                <router-link :to="{path: '/account/' + op[1].auth_referrer}">
                                    {{formatted_account(op[1].auth_referrer, 'auth_referrer')}}
                                </router-link>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.account_upgrade_datasource.account_to_upgrade')}}</th>
                            <td align="right">
                                <router-link :to="{path: '/account/' + op[1].account_to_upgrade}">
                                    {{formatted_account(op[1].account_to_upgrade, 'account_to_upgrade')}}
                                </router-link>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.account_upgrade_datasource.upgrade_to_datasource_member')}}
                            </th>
                            <td align="right">{{op[1].upgrade_to_datasource_member}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.account_upgrade_datasource.fee')}}</th>
                            <td align="right">{{formatted_number(op[1].fee.asset_id, op[1].fee.amount, 5)}}</td>
                        </tr>
                        </tbody>
                        <!-- 47:stale_data_market_category_create -->
                        <tbody v-if="ops[op[0]] == 'stale_data_market_category_create'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-warning">{{$t('transaction.trxTypes.data_market_category_create')}}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.data_market_category_create.category_name')}}</th>
                            <td align="right">{{op[1].category_name}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.data_market_category_create.issuer')}}</th>
                            <td align="right">
                                <router-link :to="{path: '/account/' + op[1].issuer}">
                                    {{formatted_account(op[1].issuer, 'issuer')}}
                                </router-link>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.data_market_category_create.fee')}}</th>
                            <td align="right">{{formatted_number(op[1].fee.asset_id, op[1].fee.amount, 5)}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.data_market_category_create.create_date_time')}}</th>
                            <td align="right">{{op[1].create_date_time}}</td>
                        </tr>
                        </tbody>
                        <!-- 48:stale_data_market_category_update -->
                        <tbody v-if="ops[op[0]] == 'stale_data_market_category_update'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-primary">{{$t('transaction.trxTypes.data_market_category_update')}}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.data_market_category_update.category')}}</th>
                            <td align="right">{{op[1].category}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.data_market_category_update.new_category_name')}}</th>
                            <td align="right">{{op[1].new_category_name}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.data_market_category_update.fee')}}</th>
                            <td align="right">{{formatted_number(op[1].fee.asset_id, op[1].fee.amount, 5)}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.data_market_category_update.new_status')}}</th>
                            <td align="right">{{$t('transaction.trxTypes.status_states.' + op[1].new_status)}}</td>
                        </tr>
                        </tbody>
                        <!-- 49:stale_free_data_product_create -->
                        <tbody v-if="ops[op[0]] == 'stale_free_data_product_create'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-warning">{{$t('transaction.trxTypes.free_data_product_create.name')}}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.free_data_product_create.product_name')}}</th>
                            <td align="right">{{op[1].product_name}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.free_data_product_create.issuer')}}</th>
                            <td align="right">
                                <router-link :to="{path: '/account/' + op[1].issuer}">
                                    {{formatted_account(op[1].issuer, 'issuer')}}
                                </router-link>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.free_data_product_create.fee')}}</th>
                            <td align="right">{{formatted_number(op[1].fee.asset_id, op[1].fee.amount, 5)}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.free_data_product_create.create_date_time')}}</th>
                            <td align="right">{{op[1].create_date_time}}</td>
                        </tr>
                        </tbody>
                        <!-- 50:stale_free_data_product_update -->
                        <tbody v-if="ops[op[0]] == 'stale_free_data_product_update'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-primary">{{$t('transaction.trxTypes.free_data_product_update.name')}}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.free_data_product_update.free_data_product')}}</th>
                            <td align="right">{{op[1].free_data_product}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.free_data_product_update.new_product_name')}}</th>
                            <td align="right">{{op[1].new_product_name}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.free_data_product_update.fee')}}</th>
                            <td align="right">{{formatted_number(op[1].fee.asset_id, op[1].fee.amount, 5)}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.free_data_product_update.new_status')}}</th>
                            <td align="right">{{$t('transaction.trxTypes.status_states.' + op[1].new_status)}}</td>
                        </tr>
                        </tbody>
                        <!-- 51:stale_league_data_product_create -->
                        <tbody v-if="ops[op[0]] == 'stale_league_data_product_create'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-warning">{{$t('transaction.trxTypes.league_data_product_create.name')}}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.league_data_product_create.product_name')}}</th>
                            <td align="right">{{op[1].product_name}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.league_data_product_create.issuer')}}</th>
                            <td align="right">
                                <router-link :to="{path: '/account/' + op[1].issuer}">
                                    {{formatted_account(op[1].issuer, 'issuer')}}
                                </router-link>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.league_data_product_create.fee')}}</th>
                            <td align="right">{{formatted_number(op[1].fee.asset_id, op[1].fee.amount, 5)}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.league_data_product_create.create_date_time')}}</th>
                            <td align="right">{{op[1].create_date_time}}</td>
                        </tr>
                        </tbody>
                        <!-- 52:stale_league_data_product_update -->
                        <tbody v-if="ops[op[0]] == 'stale_league_data_product_update'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-primary">{{$t('transaction.trxTypes.league_data_product_update.name')}}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.league_data_product_update.league_data_product')}}</th>
                            <td align="right">{{op[1].league_data_product}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.league_data_product_update.new_product_name')}}</th>
                            <td align="right">{{op[1].new_product_name}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.league_data_product_update.fee')}}</th>
                            <td align="right">{{formatted_number(op[1].fee.asset_id, op[1].fee.amount, 5)}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.league_data_product_update.new_status')}}</th>
                            <td align="right">{{$t('transaction.trxTypes.status_states.' + op[1].new_status)}}</td>
                        </tr>
                        </tbody>
                        <!-- 53:stale_league_create -->
                        <tbody v-if="ops[op[0]] == 'stale_league_create'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-warning">{{$t('transaction.trxTypes.league_create.name')}}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.league_create.league_name')}}</th>
                            <td align="right">{{op[1].league_name}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.league_create.fee')}}</th>
                            <td align="right">{{formatted_number(op[1].fee.asset_id, op[1].fee.amount, 5)}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.league_create.create_date_time')}}</th>
                            <td align="right">{{op[1].create_date_time}}</td>
                        </tr>
                        </tbody>
                        <!-- 54:stale_league_update -->
                        <tbody v-if="ops[op[0]] == 'stale_league_update'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-primary">{{$t('transaction.trxTypes.league_update.name')}}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.league_update.league')}}</th>
                            <td align="right">{{op[1].league}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.league_update.new_league_name')}}</th>
                            <td align="right">{{op[1].new_league_name}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.league_update.fee')}}</th>
                            <td align="right">{{formatted_number(op[1].fee.asset_id, op[1].fee.amount, 5)}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.league_update.new_status')}}</th>
                            <td align="right">{{$t('transaction.trxTypes.status_states.' + op[1].new_status)}}</td>
                        </tr>
                        </tbody>
                        <!-- 55:data_transaction_create -->
                        <tbody v-if="ops[op[0]] == 'data_transaction_create'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-primary">{{$t('transaction.trxTypes.data_transaction_create.name')}}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.data_transaction_create.request_id')}}</th>
                            <td align="right">{{op[1].request_id}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.data_transaction_create.product_id')}}</th>
                            <td align="right">{{formatted_product(op[1].product_id, 'product_id')}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.data_transaction_create.version')}}</th>
                            <td align="right">{{op[1].version}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.data_transaction_create.fee')}}</th>
                            <td align="right">{{formatted_number(op[1].fee.asset_id, op[1].fee.amount, 5)}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.data_transaction_create.requester')}}</th>
                            <td align="right">
                                <router-link :to="{path: '/account/'+op[1].requester}">
                                    {{formatted_account(op[1].requester, 'requester')}}
                                </router-link>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.data_transaction_create.create_date_time')}}</th>
                            <td align="right">{{op[1].create_date_time}}</td>
                        </tr>
                        </tbody>
                        <!-- 56:data_transaction_update -->
                        <tbody v-if="ops[op[0]] == 'data_transaction_update'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-primary">{{$t('transaction.trxTypes.data_transaction_update.name')}}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.data_transaction_update.request_id')}}</th>
                            <td align="right">{{op[1].request_id}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.data_transaction_update.new_requester')}}</th>
                            <td align="right">
                                <router-link :to="{path: '/account/'+op[1].new_requester}">
                                    {{formatted_account(op[1].new_requester, 'new_requester')}}
                                </router-link>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.data_transaction_update.new_status')}}</th>
                            <td align="right">{{$t('transaction.trxTypes.status_states.' + op[1].new_status)}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.data_transaction_update.fee')}}</th>
                            <td align="right">{{formatted_number(op[1].fee.asset_id, op[1].fee.amount, 5)}}</td>
                        </tr>
                        </tbody>
                        <!-- 57:data_transaction_pay -->
                        <tbody v-if="ops[op[0]] == 'data_transaction_pay'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-primary">{{$t('transaction.trxTypes.data_transaction_pay.name')}}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.data_transaction_pay.request_id')}}</th>
                            <td align="right">{{op[1].request_id}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.data_transaction_pay.fee')}}</th>
                            <td align="right">{{formatted_number(op[1].fee.asset_id, op[1].fee.amount, 5)}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.data_transaction_pay.from')}}</th>
                            <td align="right">
                                <router-link :to="{path: '/account/' + op[1].from}">
                                    {{formatted_account(op[1].from, 'from')}}
                                </router-link>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.data_transaction_pay.to')}}</th>
                            <td align="right">
                                <router-link :to="{path: '/account/' + op[1].to}">
                                    {{formatted_account(op[1].to, 'to')}}
                                </router-link>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.data_transaction_pay.amount')}}</th>
                            <td align="right">{{formatted_number(op[1].amount.asset_id, op[1].amount.amount, 5)}}</td>
                        </tr>
                        </tbody>
                        <!-- 58:account_upgrade_data_transaction_member -->
                        <tbody v-if="ops[op[0]] == 'account_upgrade_data_transaction_member'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-primary">{{$t('transaction.trxTypes.account_upgrade_data_transaction_member.name')}}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.account_upgrade_data_transaction_member.account_to_upgrade')}}</th>
                            <td align="right">
                                <router-link :to="{path: '/account/' + op[1].account_to_upgrade}">
                                    {{formatted_account(op[1].account_to_upgrade, 'account_to_upgrade')}}
                                </router-link>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                {{$t('transaction.trxTypes.account_upgrade_data_transaction_member.upgrade_to_data_transaction_member')}}
                            </th>
                            <td align="right">{{op[1].upgrade_to_data_transaction_member}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.account_upgrade_data_transaction_member.fee')}}</th>
                            <td align="right">{{formatted_number(op[1].fee.asset_id, op[1].fee.amount, 5)}}</td>
                        </tr>
                        </tbody>
                        <!-- 59:data_transaction_datasource_upload -->
                        <tbody v-if="ops[op[0]] == 'data_transaction_datasource_upload'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-primary">{{$t('transaction.trxTypes.data_transaction_datasource_upload.name')}}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.data_transaction_datasource_upload.request_id')}}</th>
                            <td align="right">{{op[1].request_id}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.data_transaction_datasource_upload.requester')}}</th>
                            <td align="right">
                                <router-link :to="{path: '/account/' + op[1].requester}">
                                    {{formatted_account(op[1].requester, 'requester')}}
                                </router-link>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.data_transaction_datasource_upload.datasource')}}</th>
                            <td align="right">
                                <router-link :to="{path: '/account/' + op[1].datasource}">
                                    {{formatted_account(op[1].datasource, 'datasource')}}
                                </router-link>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.data_transaction_datasource_upload.fee')}}</th>
                            <td align="right">{{formatted_number(op[1].fee.asset_id, op[1].fee.amount, 5)}}</td>
                        </tr>
                        </tbody>
                        <!-- 60:data_transaction_datasource_validate_error -->
                        <tbody v-if="ops[op[0]] == 'data_transaction_datasource_validate_error'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-primary">{{$t('transaction.trxTypes.data_transaction_datasource_validate_error.name')}}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.data_transaction_datasource_validate_error.request_id')}}
                            </th>
                            <td align="right">{{op[1].request_id}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.data_transaction_datasource_validate_error.datasource')}}
                            </th>
                            <td align="right">
                                <router-link :to="{path: '/account/' + op[1].datasource}">
                                    {{formatted_account(op[1].datasource, 'datasource')}}
                                </router-link>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.data_transaction_datasource_validate_error.fee')}}</th>
                            <td align="right">{{formatted_number(op[1].fee.asset_id, op[1].fee.amount, 5)}}</td>
                        </tr>
                        </tbody>
                        <!-- 61:data_market_category_create -->
                        <tbody v-if="ops[op[0]] == 'data_market_category_create'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-warning">{{$t('transaction.trxTypes.data_market_category_create')}}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.data_market_category_create.category_name')}}</th>
                            <td align="right">{{op[1].category_name}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.data_market_category_create.issuer')}}</th>
                            <td align="right">
                                <router-link :to="{path: '/account/' + op[1].issuer}">
                                    {{formatted_account(op[1].issuer, 'issuer')}}
                                </router-link>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.data_market_category_create.fee')}}</th>
                            <td align="right">{{formatted_number(op[1].fee.asset_id, op[1].fee.amount, 5)}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.data_market_category_create.create_date_time')}}</th>
                            <td align="right">{{op[1].create_date_time}}</td>
                        </tr>
                        </tbody>
                        <!-- 62:data_market_category_update -->
                        <tbody v-if="ops[op[0]] == 'data_market_category_update'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-primary">{{$t('transaction.trxTypes.data_market_category_update')}}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.data_market_category_update.category')}}</th>
                            <td align="right">{{op[1].category}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.data_market_category_update.new_category_name')}}</th>
                            <td align="right">{{op[1].new_category_name}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.data_market_category_update.fee')}}</th>
                            <td align="right">{{formatted_number(op[1].fee.asset_id, op[1].fee.amount, 5)}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.data_market_category_update.new_status')}}</th>
                            <td align="right">{{$t('transaction.trxTypes.status_states.' + op[1].new_status)}}</td>
                        </tr>
                        </tbody>
                        <!-- 63:free_data_product_create -->
                        <tbody v-if="ops[op[0]] == 'free_data_product_create'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-warning">{{$t('transaction.trxTypes.free_data_product_create.name')}}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.free_data_product_create.product_name')}}</th>
                            <td align="right">{{op[1].product_name}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.free_data_product_create.issuer')}}</th>
                            <td align="right">
                                <router-link :to="{path: '/account/' + op[1].issuer}">
                                    {{formatted_account(op[1].issuer, 'issuer')}}
                                </router-link>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.free_data_product_create.fee')}}</th>
                            <td align="right">{{formatted_number(op[1].fee.asset_id, op[1].fee.amount, 5)}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.free_data_product_create.create_date_time')}}</th>
                            <td align="right">{{op[1].create_date_time}}</td>
                        </tr>
                        </tbody>
                        <!-- 64:free_data_product_update -->
                        <tbody v-if="ops[op[0]] == 'free_data_product_update'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-primary">{{$t('transaction.trxTypes.free_data_product_update.name')}}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.free_data_product_update.free_data_product')}}</th>
                            <td align="right">{{op[1].free_data_product}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.free_data_product_update.new_product_name')}}</th>
                            <td align="right">{{op[1].new_product_name}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.free_data_product_update.fee')}}</th>
                            <td align="right">{{formatted_number(op[1].fee.asset_id, op[1].fee.amount, 5)}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.free_data_product_update.new_status')}}</th>
                            <td align="right">{{$t('transaction.trxTypes.status_states.' + op[1].new_status)}}</td>
                        </tr>
                        </tbody>
                        <!-- 65:league_data_product_create -->
                        <tbody v-if="ops[op[0]] == 'league_data_product_create'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-warning">{{$t('transaction.trxTypes.league_data_product_create.name')}}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.league_data_product_create.product_name')}}</th>
                            <td align="right">{{op[1].product_name}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.league_data_product_create.issuer')}}</th>
                            <td align="right">
                                <router-link :to="{path: '/account/' + op[1].issuer}">
                                    {{formatted_account(op[1].issuer, 'issuer')}}
                                </router-link>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.league_data_product_create.fee')}}</th>
                            <td align="right">{{formatted_number(op[1].fee.asset_id, op[1].fee.amount, 5)}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.league_data_product_create.create_date_time')}}</th>
                            <td align="right">{{op[1].create_date_time}}</td>
                        </tr>
                        </tbody>
                        <!-- 66:league_data_product_update -->
                        <tbody v-if="ops[op[0]] == 'league_data_product_update'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-primary">{{$t('transaction.trxTypes.league_data_product_update.name')}}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.league_data_product_update.league_data_product')}}</th>
                            <td align="right">{{op[1].league_data_product}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.league_data_product_update.new_product_name')}}</th>
                            <td align="right">{{op[1].new_product_name}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.league_data_product_update.fee')}}</th>
                            <td align="right">{{formatted_number(op[1].fee.asset_id, op[1].fee.amount, 5)}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.league_data_product_update.new_status')}}</th>
                            <td align="right">{{$t('transaction.trxTypes.status_states.' + op[1].new_status)}}</td>
                        </tr>
                        </tbody>
                        <!-- 67:league_create -->
                        <tbody v-if="ops[op[0]] == 'league_create'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-warning">{{$t('transaction.trxTypes.league_create.name')}}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.league_create.league_name')}}</th>
                            <td align="right">{{op[1].league_name}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.league_create.fee')}}</th>
                            <td align="right">{{formatted_number(op[1].fee.asset_id, op[1].fee.amount, 5)}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.league_create.create_date_time')}}</th>
                            <td align="right">{{op[1].create_date_time}}</td>
                        </tr>
                        </tbody>
                        <!-- 68:league_update -->
                        <tbody v-if="ops[op[0]] == 'league_update'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-primary">{{$t('transaction.trxTypes.league_update.name')}}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.league_update.league')}}</th>
                            <td align="right">{{op[1].league}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.league_update.new_league_name')}}</th>
                            <td align="right">{{op[1].new_league_name}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.league_update.fee')}}</th>
                            <td align="right">{{formatted_number(op[1].fee.asset_id, op[1].fee.amount, 5)}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.league_update.new_status')}}</th>
                            <td align="right">{{$t('transaction.trxTypes.status_states.' + op[1].new_status)}}</td>
                        </tr>
                        </tbody>
                        <!-- 71:balance_lock -->
                        <tbody v-if="ops[op[0]] == 'balance_lock'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-primary">{{$t('transaction.trxTypes.balance_lock.name')}}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.balance_lock.create_date_time')}}</th>
                            <td align="right">{{op[1].create_date_time}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.balance_lock.program_id')}}</th>
                            <td align="right">{{op[1].program_id}}{{$t('transaction.trxTypes.balance_lock.term')}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.balance_lock.interest_rate')}}</th>
                            <td align="right">{{op[1].interest_rate / 100}}%</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.balance_lock.amount')}}</th>
                            <td align="right">{{formatted_number(op[1].amount.asset_id, op[1].amount.amount, 5)}}</td>
                        </tr>
                        </tbody>
                        <!-- 72:balance_unlock -->
                        <tbody v-if="ops[op[0]] == 'balance_unlock'">
                        <tr>
                            <th>{{$t('transaction.trx_type')}}</th>
                            <td align="right"><span
                                    class="label label-primary">{{$t('transaction.trxTypes.balance_unlock.name')}}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.balance_unlock.lock_id')}}</th>
                            <td align="right">{{op[1].lock_id}}</td>
                        </tr>
                        <tr>
                            <th>{{$t('transaction.trxTypes.balance_unlock.account')}}</th>
                            <td align="right">
                                <router-link :to="{path: '/account/' + op[1].account}">
                                    {{formatted_account(op[1].account, 'account')}}
                                </router-link>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { ChainTypes } from 'gxbjs/es';
    import Proposed_Op from './Proposed_Op.vue';
    import { fetch_account_by_chain, fetch_product_by_chain, formatted_asset } from '@/services/CommonService';

    let ops = Object.keys(ChainTypes.operations);

    export default {
        props: {
            id: {
                type: Number
            },
            operation: {
                type: Array
            },
            txid: {
                type: String
            }
        },
        data () {
            return {
                items: {},
                ops: ops,
                op: this.operation
            };
        },
        methods: {
            formatted_account (id, key) {
                let self = this;
                if (this.items[key]) {
                    return this.op[1][key];
                }
                this.items[key] = true;
                fetch_account_by_chain(id).then((account) => {
                    self.op[1][key] = account.toJS().name;
                }).catch(ex => {
                    self.items[key] = false;
                    console.error(ex);
                });
                return this.op[1][key];
            },
            formatted_product (id, key) {
                let self = this;
                if (this.items[key]) {
                    return this.op[1][key];
                }
                self.items[key] = true;
                fetch_product_by_chain(id).then(function (product) {
                    self.op[1][key] = product.product_name;
                }).catch(ex => {
                    self.items[key] = false;
                    console.error(ex);
                });
                return this.op[1][key];
            },
            formatted_number (asset_id, amount, decimalOffset) {
                return formatted_asset(asset_id, amount, decimalOffset);
            },
            formatted_listing (new_listing) {
                let account_listing = {
                    no_listing: 0,
                    white_listed: 1,
                    black_listed: 2,
                    white_and_black_listed: 1 | 2
                };
                let listings = Object.keys(account_listing);
                for (let i = 0; i < listings.length; i++) {
                    if (account_listing[listings[i]] === new_listing) {
                        return 'transaction.trxTypes.account_whitelist.whitelist_states.' + listings[i];
                    }
                }
            }
        },
        components: {
            Proposed_Op: Proposed_Op
        }
    };
</script>

<style scoped>
    .right {
        float: right;
    }

    .account_span {
        padding-left: 10px
    }
</style>
