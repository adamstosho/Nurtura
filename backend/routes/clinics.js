// routes/clinics.js
const express = require('express');
const clinicController = require('../controllers/clinicController');

const router = express.Router();

/**
 * @route   GET /api/clinics
 * @desc    Search for clinics by region or coordinates
 */
router.get('/', clinicController.findClinics);

module.exports = router; 