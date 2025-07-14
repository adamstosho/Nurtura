// utils/seed.js
const EmergencyContact = require('../models/EmergencyContact');
const clinicData = require('../config/clinics');
const emergencyConfig = require('../config/emergencyContacts');

async function seedDatabase() {
  // Seed emergency contacts
  for (const [region, contacts] of Object.entries(emergencyConfig)) {
    for (const contact of contacts) {
      await EmergencyContact.updateOne(
        { name: contact.name, region, userId: null },
        { ...contact, region, userId: null },
        { upsert: true }
      );
    }
  }
  // Clinics are static in config; add seeding logic if you use a Clinic model
  console.log('Database seeded with emergency contacts.');
}

module.exports = { seedDatabase }; 