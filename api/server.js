require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
let accessToken = null;

async function getAccessToken() {
  try {
    console.log('Obteniendo access token...');
    const response = await axios.post('https://id.twitch.tv/oauth2/token', {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: 'client_credentials'
    });
    accessToken = response.data.access_token;
    console.log('✅ Access token obtenido exitosamente');
    return accessToken;
  } catch (error) {
    console.error('❌ Error obteniendo access token:', error.response?.data || error.message);
    throw error;
  }
}

async function makeAuthenticatedRequest(url, params = {}) {
  try {
    if (!accessToken) {
      await getAccessToken();
    }

    const response = await axios.get(url, {
      headers: {
        'Client-ID': CLIENT_ID,
        'Authorization': `Bearer ${accessToken}`
      },
      params
    });

    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      console.log('Token expirado, obteniendo uno nuevo...');
      await getAccessToken();
      
      const retryResponse = await axios.get(url, {
        headers: {
          'Client-ID': CLIENT_ID,
          'Authorization': `Bearer ${accessToken}`
        },
        params
      });
      
      return retryResponse.data;
    }
    throw error;
  }
}

// =============== ENDPOINTS ===============
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Backend funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/streams', async (req, res) => {
  try {
    const { first = 20, game_id, user_login } = req.query;
    
    const params = {
      first: parseInt(first)
    };
    
    if (game_id) {
      params.game_id = game_id;
    } else if (user_login) {
      params.user_login = user_login;
    } else {
      params.game_id = '509658';
    }

    const data = await makeAuthenticatedRequest('https://api.twitch.tv/helix/streams', params);

    if (data.data && data.data.length > 0) {
      const userIds = data.data.map(stream => stream.user_id);
      
      try {
        const usersData = await makeAuthenticatedRequest('https://api.twitch.tv/helix/users', {
          id: userIds.join(',')
        });

        const enrichedStreams = data.data.map(stream => {
          const userData = usersData.data.find(user => user.id === stream.user_id);
          return {
            ...stream,
            profile_image_url: userData?.profile_image_url || `https://unavatar.io/twitch/${stream.user_login}`
          };
        });

        res.json({
          ...data,
          data: enrichedStreams
        });
      } catch (userError) {
        console.log('⚠️ Error obteniendo datos de usuarios, devolviendo streams básicos:', userError.message);
        res.json(data);
      }
    } else {
      res.json(data);
    }

  } catch (error) {
    console.error('❌ Error fetching streams:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Error fetching streams',
      details: error.response?.data || error.message
    });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const { login } = req.query;
    
    if (!login) {
      return res.status(400).json({ error: 'Se requiere el parámetro login' });
    }

    const data = await makeAuthenticatedRequest('https://api.twitch.tv/helix/users', {
      login: login
    });

    res.json(data);
  } catch (error) {
    console.error('❌ Error fetching users:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Error fetching users',
      details: error.response?.data || error.message
    });
  }
});

app.get('/api/streams/users', async (req, res) => {
  try {
    const { user_login } = req.query;
    
    if (!user_login) {
      return res.status(400).json({ error: 'Se requiere el parámetro user_login' });
    }

    const data = await makeAuthenticatedRequest('https://api.twitch.tv/helix/streams', {
      user_login: user_login
    });

    res.json(data);
  } catch (error) {
    console.error('❌ Error fetching user streams:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Error fetching user streams',
      details: error.response?.data || error.message
    });
  }
});

app.get('/api/games/top', async (req, res) => {
  try {
    const { first = 20 } = req.query;
    
    const data = await makeAuthenticatedRequest('https://api.twitch.tv/helix/games/top', {
      first: parseInt(first)
    });

    res.json(data);
  } catch (error) {
    console.error('❌ Error fetching top games:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Error fetching top games',
      details: error.response?.data || error.message
    });
  }
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, async () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    console.log(`📍 http://localhost:${PORT}`);
    
    if (!CLIENT_ID || !CLIENT_SECRET) {
      console.error('❌ Faltan credenciales de Twitch en el archivo .env');
    } else {
      console.log('✅ Credenciales de Twitch configuradas');
      try {
        await getAccessToken();
        console.log('✅ Servidor listo para recibir peticiones');
      } catch (error) {
        console.error('❌ Error inicial obteniendo token:', error.message);
      }
    }
  });
}

module.exports = app;