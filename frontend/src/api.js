import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const getAccessToken = () => localStorage.getItem('access_token');

const setAuthHeader = (token) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};

setAuthHeader(getAccessToken());

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalConfig = error.config;

    if (error.response && error.response.status === 401 && !originalConfig.__isRetry) {
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          const refreshResponse = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
            refresh: refreshToken,
          });

          const newAccessToken = refreshResponse.data.access;
          localStorage.setItem('access_token', newAccessToken);
          setAuthHeader(newAccessToken);

          originalConfig.__isRetry = true;
          originalConfig.headers.Authorization = `Bearer ${newAccessToken}`;

          return api(originalConfig);
        } catch (refreshError) {
          console.warn('Refresh token expired or invalid', refreshError);
        }
      }

      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      setAuthHeader(null);
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default api;
