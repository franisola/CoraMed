// src/api/user.api.ts
import API from "./index";

export interface UpdateUserPayload {
  nombreCompleto?: string;
  dni?: string;
  direccion?: string;
  telefono?: string;
  fecha_nacimiento?: string;
  genero?: string;
  // Otros campos que permitas editar
}

export const updateUserAPI = async (data: UpdateUserPayload) => {
  const response = await API.put("/user/profile", data); // <-- asegúrate de que el endpoint exista
  return response.data;
};
