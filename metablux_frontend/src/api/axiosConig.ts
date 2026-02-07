import axios from "axios";
const BASE_URL:any = import.meta.env.VITE_BACKEND_URL

const api = axios.create({
  baseURL: `${BASE_URL}/api/`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export default api;
