import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API = axios.create({
  baseURL: "https://backsalud.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar token automáticamente
API.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar errores globalmente
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Aquí podrías hacer logout automático o intentar refresh token
      console.warn("Token inválido o expirado. Debe iniciar sesión nuevamente.");
      await AsyncStorage.removeItem("token");
    }
    console.error("API error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Función para guardar token en AsyncStorage
export const setToken = async (token: string) => {
  try {
    await AsyncStorage.setItem("token", token);
  } catch (e) {
    console.error("Error guardando token", e);
  }
};

// Función para borrar token (logout)
export const clearToken = async () => {
  try {
    await AsyncStorage.removeItem("token");
  } catch (e) {
    console.error("Error borrando token", e);
  }
};

export default API;
