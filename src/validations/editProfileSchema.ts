import { z } from "zod";

// Schema para pestaña "personal"
export const personalDataSchema = z.object({
  nombreCompleto: z
    .string()
    .min(1, "El nombre completo es obligatorio.")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, {
      message: "Solo se permiten letras y espacios.",
    })
    .refine((val) => val.trim().split(" ").length >= 2, {
      message: "Ingresá al menos nombre y apellido.",
    })
    .optional(),

  dni: z
    .string()
    .regex(/^\d{7,8}$/, "El DNI debe contener entre 7 y 8 dígitos.")
    .optional(),

  fechaNacimiento: z
    .date()
    .refine((fecha) => fecha < new Date(), {
      message: "La fecha de nacimiento debe ser anterior a hoy.",
    })
    .optional(),

  genero: z
    .enum(["Masculino", "Femenino", "Otro"], {
      errorMap: () => ({ message: "El género debe ser válido." }),
    })
    .optional(),

  direccion: z
    .string()
    .min(5, "La dirección debe tener al menos 5 caracteres.")
    .max(100, "La dirección no puede tener más de 100 caracteres.")
    .optional(),

  telefono: z
    .string()
    .regex(/^\d{10}$/, "El teléfono debe contener 10 dígitos.")
    .optional(),
});

// Schema para pestaña "account"
export const accountDataSchema = z
  .object({
    password: z
      .string()
      .nonempty("La contraseña es obligatoria")
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .max(100, "La contraseña no puede tener más de 100 caracteres")
      .trim(),
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        code: z.ZodIssueCode.custom,
        message: "Las contraseñas no coinciden.",
      });
    }
  });
