import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { upsertHealthInsuranceSchema } from "@validations/healthInsuranceSchema";


export const useHealthInsuranceForm = (onSubmit: (data: any) => void) => {
  const [generalError, setGeneralError] = useState<string | null>(null);

  const {
    handleSubmit,
    setValue,
    getValues,
    register,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(upsertHealthInsuranceSchema),
    defaultValues: {
      nombre: "",
      numero_socio: "",
      plan: "",
    },
    mode: "onChange",
  });

  const handleChange = (field: string, value: string) => {
    setValue(field as any, value, { shouldValidate: true });
  };

  const handleFormSubmit = handleSubmit((data) => {
    try {
      onSubmit(data);
    } catch (error) {
      setGeneralError("Ocurrió un error al guardar los datos.");
    }
  });

  return {
    values: getValues(),
    errors,
    isValid,
    handleChange,
    handleFormSubmit,
    generalError,
  };
};