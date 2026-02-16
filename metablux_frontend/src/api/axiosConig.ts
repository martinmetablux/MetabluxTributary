import axios from "axios";

const BASE_URL: any = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: `${BASE_URL}/api/`,
  withCredentials: true,
});

// 🔹 Request Interceptor (Attach Token)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }

  return config;
});

// 🔹 Response Interceptor (Auto Logout on 401)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("Unauthorized - Logging out...");

      // Clear token
      localStorage.removeItem("token");

      // Redirect to login
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
