// src/api/index.ts
import axios from "axios";

const API = axios.create({
  baseURL: "https://backsalud.onrender.com/api",
  withCredentials: true, // para que envíe cookies (si usás sesiones o JWT en cookies)
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de respuesta (opcional: manejo global de errores)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default API;
