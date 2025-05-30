export interface User {
  _id: string;
  dni: string;
  email: string;
  genero: string;
  nombreCompleto: string;
  fechaNacimiento?: string;
  direccion?: string;
  telefono?: string;
}
