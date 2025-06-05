import API from './index';

export const fetchSpecialties = async (): Promise<string[]> => {
  const response = await API.get('/professionals/specialties');
  return response.data;
};

export const fetchProfessionalsBySpecialty = async (specialty: string): Promise<any[]> => {
  const encoded = encodeURIComponent(specialty);
  const response = await API.get(`/professionals/specialty/${encoded}`);
  return response.data;
};

export const fetchProfessionalById = async (id: string): Promise<any> => {
  const response = await API.get(`/professionals/${id}`);
  return response.data;
};

export const fetchAvailableSchedules = async (
  professionalId: string,
  date: string
): Promise<string[]> => {
  const response = await API.get(`/professionals/${professionalId}/schedules?fecha=${date}`);
  return response.data;
};