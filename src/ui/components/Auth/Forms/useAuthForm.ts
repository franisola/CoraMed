import { useState, useEffect } from "react";
import {
  registerUserSchema,
  loginUserSchema,
  recoverPasswordSchema,
  resetPasswordSchema as changePasswordSchema,
  verifyCodeSchema,
} from "@validations/authSchemas";
import { useAppDispatch } from "@redux/hooks";
import {
  loginUser,
  registerUser,
  recoverPassword,
  resetPassword,
  verifyCode,
} from "@slices/authSlice";
import { useToast } from "react-native-toast-notifications";
import { number } from "zod";

export type AuthField = {
  nombreCompleto: string;
  dni: string;
  email: string;
  password: string;
  confirmPassword: string;
  genero: string;
  code?: string; // Campo opcional para código de verificación
};

export type AuthErrors = Partial<Record<keyof AuthField | "general", string>>;

const initialValues: AuthField = {
  nombreCompleto: "",
  dni: "",
  email: "",
  password: "",
  confirmPassword: "",
  genero: "",
  code: "",
};

export const useAuthForm = (
  type:
    | "login"
    | "register"
    | "recover"
    | "changePassword"
    | "codeVerification",
  onSubmit: (data?: any) => void,
  generalError?: string,
  initValues?: Partial<AuthField>
) => {
  const [values, setValues] = useState<AuthField>({
    ...initialValues,
    ...initValues,
  });
  const [errors, setErrors] = useState<AuthErrors>({ general: generalError });

  const dispatch = useAppDispatch();
  const toast = useToast();

  useEffect(() => {
    setValues({ ...initialValues, ...initValues });
    setErrors((prev) => ({ ...prev, general: generalError }));
  }, [type, generalError]);

  const handleChange = (field: keyof AuthField, value: string) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const validateFields = () => {
    let validationResult;

    switch (type) {
      case "register":
        validationResult = registerUserSchema.safeParse(values);
        break;
      case "login":
        validationResult = loginUserSchema.safeParse({
          email: values.email,
          password: values.password,
        });
        break;
      case "recover":
        validationResult = recoverPasswordSchema.safeParse({
          email: values.email,
        });

        break;
      case "changePassword":
        validationResult = changePasswordSchema.safeParse({
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
        });
        break;
      case "codeVerification":
        validationResult = verifyCodeSchema.safeParse({
          email: values.email,
          code: values.code,
        });

        break;
    }

    if (!validationResult?.success) {
      const fieldErrors: AuthErrors = {};
      validationResult.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof AuthErrors;
        fieldErrors[field] = issue.message;
      });
      setErrors((prev) => ({ ...prev, ...fieldErrors }));
      return false;
    }

    setErrors({});
    return true;
  };

  const buildFormData = (): any => {
    const {
      email,
      password,
      confirmPassword,
      nombreCompleto,
      dni,
      genero,
      code,
    } = values;
    return {
      email,
      ...(type === "login" && { password }),
      ...(type === "register" && { nombreCompleto, dni, password, genero }),
      ...(type === "changePassword" && { password, confirmPassword }),
      ...(type === "codeVerification" && { code, email }),
    };
  };

  const handleSubmit = async () => {
    if (!validateFields()) return;

    const formData = buildFormData();

    try {
      if (type === "login") {
        const result = await dispatch(
          loginUser({ email: values.email, password: values.password })
        ).unwrap();
        onSubmit(result);
      } else if (type === "register") {
        const result = await dispatch(registerUser(formData)).unwrap();
        onSubmit(result);
      } else if (type === "recover") {
        try {
          await dispatch(recoverPassword(values.email)).unwrap();
          toast.show("Correo de recuperación enviado.", {
            type: "success",
            placement: "top",
            duration: 4000,
          });
          onSubmit({ email: values.email });
        } catch (err: any) {
          const backendError =
            err?.error || err?.message || "Error al enviar email";
          setErrors((prev) => ({ ...prev, general: backendError }));
          toast.show(backendError, { type: "danger" });
        }
      } else if (type === "changePassword") {
        const result = await dispatch(
          resetPassword({ email: values.email, password: values.password })
        ).unwrap();
        toast.show("Contraseña restablecida exitosamente.", {
          type: "success",
          placement: "top",
          duration: 4000,
        });
        onSubmit(result);
      } else if (type === "codeVerification") {
        const result = await dispatch(
          verifyCode({ email: values.email, code: values.code })
        ).unwrap();

        toast.show(result.message, { type: "success" });

        onSubmit({ email: values.email });
      }
    } catch (err: any) {
      const backendError = err?.error || err?.message;

      if (err?.errors) {
        setErrors((prev) => ({ ...prev, ...err.errors }));
      } else if (typeof backendError === "string") {
        setErrors((prev) => ({ ...prev, general: backendError }));
        toast.show(backendError, { type: "danger" });
      } else {
        setErrors((prev) => ({ ...prev, general: "Error inesperado" }));
        toast.show("Error inesperado", { type: "danger" });
      }
    }
  };

  return {
    values,
    errors,
    handleChange,
    setGenero: (genero: string) => handleChange("genero", genero),
    handleSubmit,
  };
};
