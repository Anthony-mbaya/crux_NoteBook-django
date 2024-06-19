// Import the axios library for making HTTP requests
import axios from "axios";
// Import a constant named ACCESS_TOKEN from a constants file
import { ACCESS_TOKEN } from "./constants";

// Create a new Axios instance with a base URL specified in environment variables
const api = axios.create({
  //IMPOET ANYTHING SPECIFIED IN ENV
  baseURL: import.meta.env.VITE_API_URL,
});

// Add a request interceptor to the Axios instance
api.interceptors.request.use(
  (config) => {
    // Retrieve the token from local storage using the ACCESS_TOKEN key
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      // If a token exists, set the Authorization header with the token
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Return the modified config object
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default api;
