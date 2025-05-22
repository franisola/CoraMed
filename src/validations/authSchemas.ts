import { z } from 'zod';

// Registro de usuario
export const registerUserSchema = z.object({
  nombreCompleto: z
    .string()
    .min(1, 'El nombre completo es obligatorio.')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, {
      message: 'Solo se permiten letras y espacios.',
    })
    .refine((val) => val.trim().split(' ').length >= 2, {
      message: 'Ingresá al menos nombre y apellido.',
    }),
  email: z
    .string()
    .nonempty('El correo electrónico es obligatorio')
    .email('El correo electrónico debe ser válido')
    .trim(),
  password: z
    .string()
    .nonempty('La contraseña es obligatoria')
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .max(100, 'La contraseña no puede tener más de 100 caracteres')
    .trim(),
  dni: z
    .string()
    .nonempty('El DNI es obligatorio')
    .regex(/^[0-9]{7,8}$/, 'El DNI debe contener entre 7 y 8 dígitos')
    .trim(),
  genero: z
  .string()
  .refine(
    (val) => ['Masculino', 'Femenino', 'Otro'].includes(val),
    { message: 'El género es obligatorio.' }
  ),
});

// Login
export const loginUserSchema = z.object({
  email: z
    .string()
    .nonempty('El correo electrónico es obligatorio')
    .email('El correo electrónico debe ser válido')
    .trim(),
  password: z
    .string()
    .nonempty('La contraseña es obligatoria')
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .max(100, 'La contraseña no puede tener más de 100 caracteres')
    .trim(),
});

// Recuperación de contraseña
export const recoverPasswordSchema = z.object({
  email: z
    .string()
    .nonempty('El correo electrónico es obligatorio')
    .email('El correo electrónico debe ser válido')
    .trim(),
});

// Cambio de contraseña (reset)
export const changePasswordSchema = z.object({
  password: z
    .string()
    .nonempty('La contraseña es obligatoria')
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .max(100, 'La contraseña no puede tener más de 100 caracteres')
    .trim(),
  confirmPassword: z
    .string()
    .nonempty('Confirmá tu contraseña'),
}).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Las contraseñas no coinciden.',
});

// Tipos inferidos para TypeScript
export type RegisterUserData = z.infer<typeof registerUserSchema>;
export type LoginUserData = z.infer<typeof loginUserSchema>;
export type RecoverPasswordData = z.infer<typeof recoverPasswordSchema>;
export type ChangePasswordData = z.infer<typeof changePasswordSchema>;
