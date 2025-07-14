// controllers/tipsController.js
const axios = require('axios');
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 3600 }); // 1 hour

exports.getHealthTips = async (req, res, next) => {
  try {
    let tips = cache.get('healthTips');
    if (!tips) {
      const apiUrl = process.env.HEALTH_TIPS_API_URL || 'https://www.who.int/data/gho/info/athena-api';
      const { data } = await axios.get(apiUrl);
      // For demo, assume data.tips or fallback
      tips = data.tips || [
        { title: 'Prevent Malaria', body: 'Sleep under insecticide-treated nets and clear stagnant water.' },
        { title: 'Cholera Prevention', body: 'Drink clean water and practice good hygiene.' },
        { title: 'Lassa Fever Awareness', body: 'Avoid contact with rodents and keep food covered.' },
        { title: 'COVID-19 Safety', body: 'Wash your hands regularly and wear a mask in crowded places.' },
        { title: 'Yellow Fever Vaccination', body: 'Get vaccinated and avoid mosquito bites.' },
        { title: 'HIV/AIDS Awareness', body: 'Practice safe sex and get tested regularly.' },
        { title: 'Typhoid Prevention', body: 'Eat well-cooked food and avoid street food from unhygienic sources.' },
        { title: 'Hypertension Control', body: 'Reduce salt intake and check your blood pressure regularly.' }
      ];
      cache.set('healthTips', tips);
    }
    res.json({ tips });
  } catch (err) {
    next(err);
  }
}; 