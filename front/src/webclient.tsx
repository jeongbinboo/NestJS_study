import axios, { AxiosInstance } from 'axios';

const API_ROOT = 'http://localhost:5000';

const webClient: AxiosInstance = axios.create({
  baseURL: API_ROOT,
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('access_token'),
  },
});

webClient.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default webClient;
