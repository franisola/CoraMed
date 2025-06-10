import API from "./index";

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
export const getNextAppointment = async () => {
  const response = await API.get("/appointments/next");
  return response.data;
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
