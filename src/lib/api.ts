import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAIExplanation = async (prompt: string) => {
  try {
    const response = await api.post('/ai', { prompt });
    return response.data;
  } catch (error) {
    console.error('Error fetching AI explanation:', error);
    throw error;
  }
};

export default api; 