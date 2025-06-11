import API from "./index";

import type { Appointment } from "@slices/appointmentSlice";
export interface AppointmentPayload {
  paciente: string;
  profesional: string;
  fecha: string;
  hora: string;
  motivo_consulta: string;
  notas_medicas?: string;
}


// Crear turno
export const createAppointment = async (data: AppointmentPayload) => {
  const response = await API.post("/appointments", data);
  return response.data;
};

// Obtener turno por ID
export const getAppointmentById = async (id: string) => {
  const response = await API.get(`/appointments/${id}`);
  return response.data;
};

// Obtener próximo turno
export const getNextAppointment = async (): Promise<{ appointment: Appointment | null }> => {
  try {
    const response = await API.get("/appointments/next");
    return { appointment: response.data.appointment || null };
  } catch (err: any) {
    // Si el backend devuelve 404, interpretamos que no hay turno próximo (NO es un error)
    if (err.response?.status === 404) {
      return { appointment: null };
    }
    // Cualquier otro error se lanza normalmente
    throw err;
  }
};

export const getAllAppointments = async () => {
  const response = await API.get("/appointments");
  return response.data;
};

// Cambiar estado del turno
export const updateAppointmentStatus = async (
  id: string,
  estado: "pendiente" | "confirmado" | "cancelado"
) => {
  const response = await API.put(`/appointments/${id}/status`, { estado });
  return response.data;
};

// Agregar resultados de estudios
export const addStudyResults = async (id: string, resultados: string[]) => {
  const response = await API.post(`/appointments/${id}/results`, {
    resultados_estudios: resultados,
  });
  return response.data;
};

// Eliminar turno
export const deleteAppointment = async (id: string) => {
  const response = await API.delete(`/appointments/${id}`);
  return response.data;
};
