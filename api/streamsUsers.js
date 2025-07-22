const axios = require('axios');
require('dotenv').config();

let accessToken = null;

async function getAccessToken() {
  const response = await axios.post('https://id.twitch.tv/oauth2/token', {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    grant_type: 'client_credentials'
  });
  accessToken = response.data.access_token;
  return accessToken;
}

async function makeAuthenticatedRequest(url, params = {}) {
  if (!accessToken) {
    await getAccessToken();
  }

  const response = await axios.get(url, {
    headers: {
      'Client-ID': process.env.CLIENT_ID,
      'Authorization': `Bearer ${accessToken}`
    },
    params
  });

  return response.data;
}

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { user_login } = req.query;

    if (!user_login) {
      return res.status(400).json({ error: 'Se requiere el parámetro user_login' });
    }

    const data = await makeAuthenticatedRequest('https://api.twitch.tv/helix/streams', {
      user_login
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: 'Error fetching user streams',
      details: error.response?.data || error.message
    });
  }
};