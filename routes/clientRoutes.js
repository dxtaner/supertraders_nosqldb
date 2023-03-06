const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController.js');

// Get all users
router.get('/client', userController.getAllUsers);

// Create a new user
router.post('/client', userController.createUser);

module.exports = router;
