import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:3111/api' });

export const getUser = userdata => api.get(`/users/${userdata}`);
export const setUser = userdata => api.post('/users', userdata);
export const saveUserGame = userdata => api.put('/users', userdata);
export const getGame = request => api.get(`/games/${request}`);

const axiosAPI = {
  getUser,
  setUser,
  saveUserGame,
  getGame,
};

export default axiosAPI;