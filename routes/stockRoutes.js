const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');

// Create new stock
router.post('/stock', stockController.createStock);

// Get all stocks
router.get('/stock', stockController.getAllStocks);

// Update a stock 
router.patch('/stock/:id', stockController.updateStock);

module.exports = router;
