// models/EmergencyContact.js
const mongoose = require('mongoose');

const emergencyContactSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  name: { type: String, required: true },
  number: { type: String, required: true },
  type: { type: String, required: true },
  region: { type: String, required: true }
});

module.exports = mongoose.model('EmergencyContact', emergencyContactSchema); 