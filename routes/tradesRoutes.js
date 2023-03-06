const express = require('express');
const router = express.Router();
const buyStock  = require('../controllers/buyController');
const sellStock  = require('../controllers/sellController');
const tradeController  = require('../controllers/tradeController.js');

// Buy trade route
router.post('/buyStock', buyStock.buyShare);

// Sell trade route
router.post('/sellStock',sellStock.sellTrade);

// Get All trades
router.get('/trades',tradeController.getAllTrades);

module.exports = router;
