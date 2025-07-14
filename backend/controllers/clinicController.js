// controllers/clinicController.js
const axios = require('axios');
const clinicsData = require('../config/clinics');

exports.findClinics = async (req, res, next) => {
  try {
    const { region, city, name, lat, lon } = req.query;
    let clinics = clinicsData;

    // If searching by coordinates, use OSM API (optional, fallback to static data)
    if (lat && lon) {
      const url = `${process.env.CLINIC_API_URL}?q=clinic&format=json&limit=10&lat=${lat}&lon=${lon}`;
      const { data } = await axios.get(url);
      clinics = data.map(item => ({
        name: item.display_name,
        address: item.display_name,
        coordinates: { lat: item.lat, lon: item.lon }
      }));
    } else {
      // Filter by region (exact match, case-insensitive)
      if (region) {
        clinics = clinics.filter(c => c.region.toLowerCase() === region.toLowerCase());
      }
      // Filter by city (partial match in address, case-insensitive)
      if (city) {
        clinics = clinics.filter(c => c.address.toLowerCase().includes(city.toLowerCase()));
      }
      // Filter by name (partial match, case-insensitive)
      if (name) {
        clinics = clinics.filter(c => c.name.toLowerCase().includes(name.toLowerCase()));
      }
    }
    res.json({ clinics });
  } catch (err) {
    next(err);
  }
}; 