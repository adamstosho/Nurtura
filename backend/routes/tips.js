// routes/tips.js
const express = require('express');
const tipsController = require('../controllers/tipsController');

const router = express.Router();

/**
 * @route   GET /api/tips
 * @desc    Get latest health tips
 */
router.get('/', tipsController.getHealthTips);

module.exports = router; 