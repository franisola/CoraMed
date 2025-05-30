import axios from "axios";

const API = axios.create({
  baseURL: "https://backsalud.onrender.com/api",
  withCredentials: true, // MUY IMPORTANTE para enviar cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// Opcional: interceptor para manejar errores globalmente
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default API;
