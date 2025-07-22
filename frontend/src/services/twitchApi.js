const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3001/api'
  : '/api';

// Función base para hacer peticiones
async function apiRequest(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error en petición a ${endpoint}:`, error);
    throw error;
  }
}

// Para RecommendedStreams - obtener streams populares
export async function getTopStreams(limit = 20) {
  try {
    const data = await apiRequest(`/streams?first=${limit}`);
    return data.data || [];
  } catch (error) {
    console.error('Error obteniendo streams populares:', error);
    return [];
  }
}

// Para Carrusel - obtener stream de un usuario específico
export async function getStreamByUser(username) {
  try {
    const data = await apiRequest(`/streams?user_login=${username}&first=1`);
    return data.data?.[0] || null;
  } catch (error) {
    console.error(`Error obteniendo stream de ${username}:`, error);
    return null;
  }
}

// Para Carrusel - obtener múltiples streams de usuarios específicos
export async function getStreamsByUsers(usernames) {
  try {
    const usernamesString = Array.isArray(usernames) ? usernames.join(',') : usernames;
    const data = await apiRequest(`/streams?user_login=${usernamesString}`);
    return data.data || [];
  } catch (error) {
    console.error('Error obteniendo streams de usuarios:', error);
    return [];
  }
}

// Para Carrusel - obtener stream destacado (el más popular)
export async function getFeaturedStream() {
  try {
    const data = await apiRequest('/streams?first=1');
    return data.data?.[0] || null;
  } catch (error) {
    console.error('Error obteniendo stream destacado:', error);
    return null;
  }
}

// Para Carrusel - obtener streams destacados (5 más populares)
export async function getFeaturedStreams(limit = 5) {
  try {
    const data = await apiRequest(`/streams?first=${limit}`);
    return data.data || [];
  } catch (error) {
    console.error('Error obteniendo streams destacados:', error);
    return [];
  }
}

// Para Sidebar - obtener streams de usuarios específicos (usando el endpoint específico)
export async function getStreamsForUsers(usernames) {
  try {
    const usernamesString = Array.isArray(usernames) ? usernames.join(',') : usernames;
    const data = await apiRequest(`/streams/users?user_login=${usernamesString}`);
    return data.data || [];
  } catch (error) {
    console.error('Error obteniendo streams de usuarios:', error);
    return [];
  }
}

// Para obtener información de usuarios
export async function getUsersInfo(usernames) {
  try {
    const usernamesString = Array.isArray(usernames) ? usernames.join(',') : usernames;
    const data = await apiRequest(`/users?login=${usernamesString}`);
    return data.data || [];
  } catch (error) {
    console.error('Error obteniendo información de usuarios:', error);
    return [];
  }
}

// Para obtener categorías populares
export async function getTopGames(limit = 20) {
  try {
    const data = await apiRequest(`/games/top?first=${limit}`);
    return data.data || [];
  } catch (error) {
    console.error('Error obteniendo juegos populares:', error);
    return [];
  }
}

// Función para probar la conexión
export async function testConnection() {
  try {
    const data = await apiRequest('/test');
    console.log('✅ Conexión con backend exitosa:', data);
    return true;
  } catch (error) {
    console.error('❌ Error conectando con backend:', error);
    return false;
  }
}