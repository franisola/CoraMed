import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import {store} from "@redux/store";
// import { logoutUser } from "@slices/authSlice";

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
    const status = error.response?.status;

    if (status === 401 || status === 403) {
      console.warn("Token inválido o expirado.");
      await AsyncStorage.removeItem("token");
      // store.dispatch(logoutUser());
    }

    //console.error("API error:", error.response?.data || error.message);
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
