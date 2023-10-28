import axios from 'axios';


const getToken = () => {
	const token = localStorage.getItem('token');
	return token ? token : '';
  };
  
export const axiosWithAuth = axios.create({
  baseURL: 'https://api-tarea-frrzc.ondigitalocean.app', // Tu URL base
});

axiosWithAuth.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});
