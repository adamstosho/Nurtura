// routes/symptoms.js
const express = require('express');
const { body } = require('express-validator');
const symptomController = require('../controllers/symptomController');
const auth = require('../middleware/auth');

const router = express.Router();

/**
 * @route   POST /api/symptoms
 * @desc    Log a new symptom
 */
router.post('/', auth, [
  body('symptom').notEmpty()
], symptomController.logSymptom);

/**
 * @route   GET /api/symptoms
 * @desc    Get all symptoms for user
 */
router.get('/', auth, symptomController.getSymptoms);

/**
 * @route   GET /api/symptoms/history
 * @desc    Get symptom history (optionally by date range)
 */
router.get('/history', auth, symptomController.getSymptomHistory);

module.exports = router; 