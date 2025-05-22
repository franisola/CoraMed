import React, { useState } from "react";
import { View, Text } from "react-native";
import CustomInput from "@components/Inputs/InputData";
import CustomButton from "@components/Buttons/NormalButton";
import { Picker } from "@react-native-picker/picker";
import { useTranslation } from "react-i18next";
import { useTheme } from "@themes/ThemeContext";

import {
  registerUserSchema,
  loginUserSchema,
  recoverPasswordSchema,
  changePasswordSchema,
} from "@validations/authSchemas"; // ajustá según la ubicación real

type FormType = "login" | "register" | "recover" | "changePassword";

interface AuthFormProps {
  type: FormType;
  onSubmit: (data: any) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit }) => {
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [dni, setDni] = useState("");
  const [email, setEmail] = useState("");
  const [genero, setGenero] = useState<"Masculino" | "Femenino" | "Otro" | "">(
    ""
  );
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    nombreCompleto: "",
    dni: "",
    email: "",
    password: "",
    confirmPassword: "",
    genero: "",
  });

  let buttonTextKey = "";

  switch (type) {
    case "login":
      buttonTextKey = "button.login";
      break;
    case "register":
      buttonTextKey = "button.register";
      break;
    case "recover":
      buttonTextKey = "button.recover";
      break;
    default:
      buttonTextKey = "button.changePassword";
  }




  const { t } = useTranslation();
  const { theme } = useTheme();

  const validateFields = () => {
    let validationResult;

    const data = {
      nombreCompleto,
      dni,
      email,
      password,
      genero,
      confirmPassword,
    };

    switch (type) {
      case "register":
        validationResult = registerUserSchema.safeParse(data);
        break;
      case "login":
        validationResult = loginUserSchema.safeParse({ email, password });
        break;
      case "recover":
        validationResult = recoverPasswordSchema.safeParse({ email });
        break;
      case "changePassword":
        validationResult = changePasswordSchema.safeParse({
          password,
          confirmPassword,
        });
        break;
    }

    if (!validationResult?.success) {
      const fieldErrors: any = {};
      validationResult.error.issues.forEach((issue) => {
        const field = issue.path[0];
        fieldErrors[field] = issue.message;
      });
      setErrors((prev) => ({ ...prev, ...fieldErrors }));
      return false;
    }

    // Limpiar errores si todo está OK
    setErrors({
      nombreCompleto: "",
      dni: "",
      email: "",
      password: "",
      confirmPassword: "",
      genero: "",
    });

    return true;
  };

  const handleInputChange = (field: string, value: string) => {
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
    switch (field) {
      case "nombreCompleto":
        setNombreCompleto(value);
        break;
      case "dni":
        setDni(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
    }
  };

  const handleSubmit = () => {
    if (!validateFields()) return;

    const formData: any = {
      email,
      ...(type === "login" && { password }),
      ...(type === "register" && {
        nombreCompleto,
        dni,
        password,
        genero,
      }),
      ...(type === "recover" && {}),
      ...(type === "changePassword" && { password, confirmPassword }),
    };

    onSubmit(formData);
  };

  return (
    <View style={{ gap: 10 }}>
      {type === "register" && (
        <>
          <CustomInput
            placeholder={t("inputPlaceholder.fullName")}
            value={nombreCompleto}
            onChangeText={(value) => handleInputChange("nombreCompleto", value)}
            error={errors.nombreCompleto}
          />
          <CustomInput
            placeholder={t("inputPlaceholder.dni")}
            value={dni}
            onChangeText={(value) => handleInputChange("dni", value)}
            keyboardType="numeric"
            error={errors.dni}
            maxLength={8}
          />
        </>
      )}

      {(type === "register" || type === "login" || type === "recover") && (
        <CustomInput
          placeholder={t("inputPlaceholder.email")}
          value={email}
          onChangeText={(value) => handleInputChange("email", value)}
          keyboardType="email-address"
          error={errors.email}
        />
      )}

      {(type === "register" ||
        type === "login" ||
        type === "changePassword") && (
        <CustomInput
          placeholder={t("inputPlaceholder.password")}
          value={password}
          onChangeText={(value) => handleInputChange("password", value)}
          secureTextEntry
          error={errors.password}
        />
      )}

      {type === "changePassword" && (
        <CustomInput
          placeholder={t("inputPlaceholder.confirmPassword")}
          value={confirmPassword}
          onChangeText={(value) => handleInputChange("confirmPassword", value)}
          secureTextEntry
          error={errors.confirmPassword}
        />
      )}

      {type === "register" && (
        <>
          <View
            style={{
              borderWidth: 1,
              borderRadius: 8,
              borderColor: errors.genero
                ? theme.colors.error
                : theme.colors.primary,
              marginBottom: 0,
            }}
          >
            <Picker
              selectedValue={genero}
              onValueChange={(itemValue) => {
                setGenero(itemValue as "Masculino" | "Femenino" | "Otro");
                setErrors((prev) => ({ ...prev, genero: "" }));
              }}
              style={{
                color: theme.colors.primary,
                backgroundColor: theme.colors.white,
                marginBottom: 0,
              }}
            >
              <Picker.Item label={t("inputPlaceholder.gender")} value="" />
              <Picker.Item label={t("genderPick.male")} value="Masculino" />
              <Picker.Item label={t("genderPick.female")} value="Femenino" />
              <Picker.Item label={t("genderPick.other")} value="Otro" />
            </Picker>
          </View>
          {errors.genero ? (
            <Text
              style={{
                color: theme.colors.error,
                width: 308,
                marginTop: 0,
                fontSize: 12,
              }}
            >
              {errors.genero}
            </Text>
          ) : null}
        </>
      )}

      <CustomButton
        style={{ marginTop: 0 }}
        title={t(buttonTextKey)}
        onPress={handleSubmit}
      />
    </View>
  );
};

export default AuthForm;
