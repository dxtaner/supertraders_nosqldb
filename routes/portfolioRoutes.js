const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController.js');

// Add a new portfolio to user
router.post('/portfolio', portfolioController.addPortfolio);

// Get All portfolio
router.get('/portfolio', portfolioController.getAllPortfolio);

module.exports = router;
