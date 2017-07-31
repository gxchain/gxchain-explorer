import express from 'express';
import GXChainService from '../services/GXChainService'
import LevelDBService from '../services/LevelDBService'
let router = express.Router();

router.get('/block/:block_height', function (req, res) {
    GXChainService.fetch_block(req.params.block_height).then((block)=> {
        res.send(block)
    }).catch(ex=> {
        res.send({});
    })
})

router.get('/transaction/:tx_id', function (req, res) {
    LevelDBService.get(req.params.tx_id).then((transaction)=> {
        res.send(JSON.parse(transaction));
    }).catch(ex=> {
        res.send({});
    })
})

router.get('/account/:account_id_or_name', function (req, res) {
    GXChainService.fetch_account(req.params.account_id_or_name).then((account)=> {
        res.send(account.toJS());
    }).catch(ex=>{
        res.send({});
    })
})

router.get('/account_balance/:account_id_or_name', function (req, res) {
    GXChainService.fetch_account_balance(req.params.account_id_or_name).then((balances)=> {
        res.send(balances);
    }).catch(ex=>{
        res.send({});
    })
})

module.exports = router;