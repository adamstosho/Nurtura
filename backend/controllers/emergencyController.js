// controllers/emergencyController.js
const EmergencyContact = require('../models/EmergencyContact');
const emergencyConfig = require('../config/emergencyContacts');

exports.getContacts = async (req, res, next) => {
  try {
    const region = req.query.region || req.user?.region;
    let contacts = [];
    if (req.user) {
      contacts = await EmergencyContact.find({ $or: [
        { userId: req.user.id },
        { region, userId: null }
      ] });
    } else if (region && emergencyConfig[region]) {
      contacts = emergencyConfig[region];
    }
    res.json({ contacts });
  } catch (err) {
    next(err);
  }
};

exports.addOrUpdateContact = async (req, res, next) => {
  try {
    const { name, number, type, region } = req.body;
    let contact = await EmergencyContact.findOneAndUpdate(
      { userId: req.user.id, name, region },
      { name, number, type, region, userId: req.user.id },
      { upsert: true, new: true }
    );
    res.status(201).json({ contact });
  } catch (err) {
    next(err);
  }
}; 