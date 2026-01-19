import axios from "axios";

/**
 * Axios Base Instance
 * - Cookie based authentication
 * - Centralized config
 */

const axiosBaseUrl = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

/**
 * Global Response Interceptor
 * - Handles 401 (session expired)
 * - Can be extended later
 */
axiosBaseUrl.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      // Optional: later global logout / redirect logic
      // window.location.href = "/admin/login";
    }

    return Promise.reject(error);
  }
);

export default axiosBaseUrl;
