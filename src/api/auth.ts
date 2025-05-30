import API from './index';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  dni: string;
  email: string;
  password: string;
  genero: string;
  nombreCompleto: string;
  fecha_nacimiento?: string;
  direccion?: string;
  telefono?: string;
}

// LOGIN
export const loginUser = async (data: LoginPayload) => {
  const response = await API.post('/auth/login', data);
  return response.data;
};

// REGISTER
export const registerUser = async (data: RegisterPayload) => {
  const response = await API.post('/auth/register', data);
  return response.data;
};

// LOGOUT
export const logoutUser = async () => {
  const response = await API.post('/auth/logout');
  return response.data;
};

// RECOVER PASSWORD
export const recoverPassword = async (email: string) => {
  const response = await API.post('/auth/recover-password', { email });  
  return response.data;
};

// RESET PASSWORD
export const resetPassword = async (token: string, newPassword: string) => {
  const response = await API.post('/auth/reset-password', {
    token,
    newPassword,
  });
  return response.data;
};

// DELETE ACCOUNT
export const deleteAccount = async () => {
  const response = await API.delete('/auth/delete-account');
  return response.data;
};

// GET CURRENT USER
export const getCurrentUser = async () => {
  const response = await API.get('/auth/me');
  return response.data;
};
