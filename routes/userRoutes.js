const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// Define routes
router.post("/register", userController.registerUser);

module.exports = router;