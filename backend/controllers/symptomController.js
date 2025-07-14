// controllers/symptomController.js
const Symptom = require('../models/Symptom');
const symptomTips = require('../utils/symptomTips');

exports.logSymptom = async (req, res, next) => {
  try {
    const { symptom } = req.body;
    const newSymptom = await Symptom.create({ userId: req.user.id, symptom });
    // Find tips for the logged symptom (case-insensitive, remove spaces for matching)
    const key = symptom.toLowerCase().replace(/\s+/g, '');
    const tips = symptomTips[key] || [];
    res.status(201).json({ symptom: newSymptom, tips });
  } catch (err) {
    next(err);
  }
};

exports.getSymptoms = async (req, res, next) => {
  try {
    const symptoms = await Symptom.find({ userId: req.user.id }).sort({ timestamp: -1 });
    res.json({ symptoms });
  } catch (err) {
    next(err);
  }
};

exports.getSymptomHistory = async (req, res, next) => {
  try {
    const { from, to } = req.query;
    const query = { userId: req.user.id };
    if (from || to) {
      query.timestamp = {};
      if (from) query.timestamp.$gte = new Date(from);
      if (to) query.timestamp.$lte = new Date(to);
    }
    const symptoms = await Symptom.find(query).sort({ timestamp: -1 });
    res.json({ symptoms });
  } catch (err) {
    next(err);
  }
}; 