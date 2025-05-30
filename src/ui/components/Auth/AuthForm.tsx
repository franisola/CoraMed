import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Button,
} from "react-native";
import CustomInput from "@components/Inputs/InputData";
import CustomButton from "@components/Buttons/NormalButton";
import CustomPicker from "@components/Inputs/CustomPicker";

import { useTranslation } from "react-i18next";
import { useTheme } from "@themes/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector, useAppDispatch } from "@redux/hooks";

import {
  registerUser,
  loginUser,
  recoverPassword,
  resetPassword,
} from "@slices/authSlice";
import { useToast } from "react-native-toast-notifications";

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
  generalError?: string; // Para manejar errores generales
}

const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit, ...props }) => {
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [dni, setDni] = useState("");
  const [email, setEmail] = useState("");
  const [genero, setGenero] = useState<"Masculino" | "Femenino" | "Otro" | "">(
    ""
  );

  const navigation = useNavigation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    nombreCompleto: "",
    dni: "",
    email: "",
    password: "",
    confirmPassword: "",
    genero: "",
    general: props.generalError,
  });

  let buttonTextKey = "";
  let authTitleKey = "";

  switch (type) {
    case "login":
      authTitleKey = "authTitles.login";
      buttonTextKey = "button.login";
      break;
    case "register":
      authTitleKey = "authTitles.register";
      buttonTextKey = "button.register";
      break;
    case "recover":
      authTitleKey = "authTitles.recover";
      buttonTextKey = "button.recover";
      break;
    default:
      authTitleKey = "authTitles.changePassword";
      buttonTextKey = "button.changePassword";
  }

  const { t } = useTranslation();
  const { theme } = useTheme();

  useEffect(() => {
    setNombreCompleto("");
    setDni("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setGenero("");
    setErrors({
      nombreCompleto: "",
      dni: "",
      email: "",
      password: "",
      confirmPassword: "",
      genero: "",
      general: props.generalError,
    });
  }, [type]);

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

    setErrors({
      nombreCompleto: "",
      dni: "",
      email: "",
      password: "",
      confirmPassword: "",
      genero: "",
      general: "",
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

  const dispatch = useAppDispatch();
  const toast = useToast();

  const handleSubmit = async () => {
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
      ...(type === "changePassword" && { password, confirmPassword }),
    };

    try {
      if (type === "login") {
        await dispatch(loginUser({ email, password })).unwrap();
        setErrors((prev) => ({ ...prev, general: "" }));
        onSubmit(formData);
      } else if (type === "register") {
        await dispatch(registerUser(formData)).unwrap();
        setErrors((prev) => ({ ...prev, general: "" }));
        onSubmit(formData);
      } else if (type === "recover") {
        // Para recover, tratamos el resultado localmente y NO llamamos a onSubmit
        await dispatch(recoverPassword(email)).unwrap();
        setErrors((prev) => ({ ...prev, general: "" }));
        toast.show("Correo de recuperación enviado.", { type: "success" });
        // Acá NO se llama a onSubmit, por lo que no se actualiza el stack.
      } else if (type === "changePassword") {
        await dispatch(resetPassword(formData)).unwrap();
        setErrors((prev) => ({ ...prev, general: "" }));
        onSubmit(formData);
      }
    } catch (err: any) {
      if (err && typeof err === "object" && err.errors) {
        setErrors((prev) => ({ ...prev, ...err.errors }));
      } else if (typeof err === "string") {
        setErrors((prev) => ({ ...prev, general: err }));
        toast.show(err, { type: "danger" });
      } else if (err && err.message) {
        setErrors((prev) => ({ ...prev, general: err.message }));
        toast.show(err.message, { type: "danger" });
      } else {
        toast.show("Error inesperado, intente nuevamente.", { type: "danger" });
      }
    }
  };
  return (
    <SafeAreaView style={{ gap: 10, flex: 1, alignItems: "center" }}>
      <Text
        style={{
          color: theme.colors.text,
          fontSize: 36,
          fontWeight: "bold",
          alignSelf: "center",
          marginTop: 80,
        }}
      >
        {t(authTitleKey)}
      </Text>

      <View
        style={{
          gap: 10,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 50,
        }}
      >
        {type === "register" && (
          <>
            <CustomInput
              placeholder={t("inputPlaceholder.fullName")}
              value={nombreCompleto}
              onChangeText={(value) =>
                handleInputChange("nombreCompleto", value)
              }
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
            secureTextEntry={true}
            error={errors.password}
          />
        )}
        {type === "login" && (
          <TouchableOpacity
            style={{ flexDirection: "row", alignSelf: "flex-start" }}
            onPress={() => navigation.navigate("RecoverPassword")}
          >
            <Text style={{ color: theme.colors.text }}>
              {t("authTitles.forgotPassword")}
            </Text>
            <Text
              style={{
                color: theme.colors.text,
                fontWeight: "bold",
                marginLeft: 4,
              }}
            >
              {t("authTitles.linkForgotPassword")}
            </Text>
          </TouchableOpacity>
        )}

        {type === "changePassword" && (
          <CustomInput
            placeholder={t("inputPlaceholder.confirmPassword")}
            value={confirmPassword}
            onChangeText={(value) =>
              handleInputChange("confirmPassword", value)
            }
            secureTextEntry={true}
            error={errors.confirmPassword}
          />
        )}

        {type === "register" && (
          <CustomPicker
            selectedValue={genero}
            onValueChange={(itemValue) => {
              setGenero(itemValue as "Masculino" | "Femenino" | "Otro");
              setErrors((prev) => ({ ...prev, genero: "" }));
            }}
            error={errors.genero}
            items={[
              { label: t("inputPlaceholder.gender"), value: "" },
              { label: t("genderPick.male"), value: "Masculino" },
              { label: t("genderPick.female"), value: "Femenino" },
              { label: t("genderPick.other"), value: "Otro" },
            ]}
          />
        )}

        {errors.general ? (
          <Text style={{ color: theme.colors.error, marginBottom: 10 }}>
            {errors.general}
          </Text>
        ) : null}
      </View>

      <CustomButton
        style={{
          marginHorizontal: "auto",
          alignSelf: "center",
          position: "absolute",
          bottom: 100,
        }}
        title={t(buttonTextKey)}
        onPress={handleSubmit}
      />
    </SafeAreaView>
  );
};

export default AuthForm;
