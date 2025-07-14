// routes/emergency.js
const express = require('express');
const emergencyController = require('../controllers/emergencyController');
const auth = require('../middleware/auth');

const router = express.Router();

/**
 * @route   GET /api/emergency
 * @desc    Get emergency contacts by region or user
 */
router.get('/', emergencyController.getContacts);

/**
 * @route   POST /api/emergency
 * @desc    Add or update a user's emergency contact
 */
router.post('/', auth, emergencyController.addOrUpdateContact);

module.exports = router; 