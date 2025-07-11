import API, { setToken, clearToken } from './index';

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
  const token = response.data.token;
  if (token) {
    await setToken(token);  // guardo token en AsyncStorage
  }
  return response.data;
};

// REGISTER
export const registerUser = async (data: RegisterPayload) => {
  const response = await API.post('/auth/register', data);
  const token = response.data.token;
  if (token) {
    await setToken(token);  // guardo token en AsyncStorage
  }
  return response.data;
};

// LOGOUT
export const logoutUser = async () => {
  const response = await API.post('/auth/logout');
  await clearToken();  // limpio token al hacer logout
  return response.data;
};

// RECOVER PASSWORD
export const recoverPassword = async (email: string) => {
  const response = await API.post('/auth/recover-password', { email });  
  return response.data;
};

// VERIFY CODE
export const verifyCode = async (email: string, code: string) => {
  const response = await API.post('/auth/verify-code', { email, code });
  return response.data;
};

// RESET PASSWORD
export const resetPassword = async (email: string, password: string) => {
  const response = await API.post('/auth/reset-password', {
    email,       // <- este campo es el que espera el backend
    password,
  });
  return response.data;
};


// DELETE ACCOUNT
export const deleteAccount = async () => {
  const response = await API.delete('/auth/delete-account');
  await clearToken();  // también limpiar token si borran cuenta
  return response.data;
};

// GET CURRENT USER
export const getCurrentUser = async () => {
  const response = await API.get('/auth/me');
  return response.data;
};
