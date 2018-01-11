import express from 'express';
import GXChainService from '../services/GXChainService';
import LevelDBService from '../services/LevelDBService';
import HoldrankService from '../services/HoldrankService';
import jdenticon from 'jdenticon';
import crypto from 'crypto';

let router = express.Router();

/**
 * 供应查询
 */

router.get('/supply', function (req, res) {
    GXChainService.gxs_supply().then(function (gxs) {
        res.send({
            total_supply: gxs.current_supply / 100000,
            circulating_supply: 60000000
        });
    });
});

/**
 * 区块查询
 */
router.get('/block/:block_height', function (req, res) {
    GXChainService.fetch_block(req.params.block_height).then((block) => {
        res.send(block);
    }).catch(() => {
        res.send({});
    });
});

/**
 * 交易记录查询
 */
router.get('/transaction/:tx_id', function (req, res) {
    LevelDBService.get(req.params.tx_id.toLowerCase()).then((transaction) => {
        res.send(JSON.parse(transaction));
    }).catch(() => {
        res.send({});
    });
});

/**
 * 账户查询
 */
router.get('/account/:account_id_or_name', function (req, res) {
    GXChainService.fetch_full_account(req.params.account_id_or_name).then((account) => {
        res.send(account.length > 0 ? account[0][1] : {});
    }).catch(() => {
        res.send({});
    });
});

/**
 * 账户余额查询
 */
router.get('/account_balance/:account_id_or_name', function (req, res) {
    GXChainService.fetch_account_balance(req.params.account_id_or_name).then((balances) => {
        res.send(balances);
    }).catch(() => {
        res.send({});
    });
});

router.get('/header/:account_name', function (req, res) {
    var hash = crypto.createHash('sha256').update(req.params.account_name, 'utf8').digest('hex');
    var size = Number(req.query.size || '80');
    let png = jdenticon.toPng(hash, size);
    res.set('content-type', 'image/png');
    res.write(png);
    res.end();
});

/**
 * 产品信息查询
 */
router.get('/product/:product_id', function (req, res) {
    GXChainService.fetch_product(req.params.product_id).then((product) => {
        res.send(JSON.stringify(product));
    }).catch(() => {
        res.send({});
    });
});

/**
 * 持仓
 */
router.get('/holdrank/:typeid', function (req, res) {
    try {
        res.send(JSON.stringify(HoldrankService.get_rank(req.params.typeid)));
    } catch (err) {
        res.send({});
    }
});

module.exports = router;
