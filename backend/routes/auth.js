// routes/auth.js
const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

const router = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register new user
 */
router.post('/register', [
  body('name').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('region').notEmpty()
], authController.register);

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 */
router.post('/login', [
  body('email').isEmail(),
  body('password').exists()
], authController.login);

/**
 * @route   GET /api/auth/profile
 * @desc    Get user profile
 */
router.get('/profile', auth, authController.getProfile);

module.exports = router; 