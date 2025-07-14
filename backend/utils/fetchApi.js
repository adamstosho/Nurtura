// utils/fetchApi.js
const axios = require('axios');

async function fetchApi(url, options = {}) {
  try {
    const response = await axios({ url, ...options });
    return response.data;
  } catch (err) {
    throw err.response ? err.response.data : err;
  }
}

module.exports = fetchApi; 