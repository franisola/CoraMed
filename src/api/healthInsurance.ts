import API from "./index";

// TYPES
export interface HealthInsurancePayload {
  nombre: string;
  numero_socio: string;
  plan: string;
}

export interface HealthInsuranceResponse {
  _id: string;
  nombre: string;
  numero_socio: string;
  numero_socio_visible?: string;
  plan: string;
}

// GET: obtener obra social del usuario
export const getHealthInsurance =
  async (): Promise<HealthInsuranceResponse | null> => {
    const response = await API.get("/health-insurance");
    return response.data ?? null;
};

// POST/PUT: crear o actualizar obra social del usuario
export const upsertHealthInsurance = async (
  data: HealthInsurancePayload
): Promise<{ message: string; healthInsurance: HealthInsuranceResponse }> => {
  const response = await API.put("/health-insurance", data);
  return response.data;
};

// DELETE: eliminar obra social del usuario
export const deleteHealthInsurance = async (): Promise<{ message: string }> => {
  const response = await API.delete("/health-insurance");
  return response.data;
};
