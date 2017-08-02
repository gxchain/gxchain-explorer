import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Block from '@/components/Block'
import Transaction from '@/components/Transaction'
import Account from '@/components/Account'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/block/:block_height',
      name: 'Block',
      component: Block
    },
    {
      path: '/transaction/:tx_id',
      name: 'Transaction',
      component: Transaction
    },
    {
      path: '/account/:id_or_name',
      name: 'Account',
      component: Account
    }
  ]
})
