// validators/clinicValidator.js
const { query } = require('express-validator');
 
exports.clinicSearchValidation = [
  query('region').optional().isString(),
  query('lat').optional().isFloat(),
  query('lon').optional().isFloat()
]; 