import axios from 'axios';

const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://user-service:80';

export const validateUser = async (token) => {
  const response = await axios.get(`${USER_SERVICE_URL}/api/users/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data.user;
};