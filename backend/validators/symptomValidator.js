// validators/symptomValidator.js
const { body } = require('express-validator');
 
exports.symptomValidation = [
  body('symptom').notEmpty().withMessage('Symptom is required')
]; 