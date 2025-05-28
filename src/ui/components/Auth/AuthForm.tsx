import React, { useState } from "react";
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
import { Picker } from "@react-native-picker/picker";
import { useTranslation } from "react-i18next";
import { useTheme } from "@themes/ThemeContext";
import { useNavigation } from "@react-navigation/native";

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
            secureTextEntry
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
                  : theme.colors.inputBorder,
                marginBottom: 0,
                marginTop: 10,
                width: 308,
              }}
            >
              <Picker
                selectedValue={genero}
                onValueChange={(itemValue) => {
                  setGenero(itemValue as "Masculino" | "Femenino" | "Otro");
                  setErrors((prev) => ({ ...prev, genero: "" }));
                }}
                style={{
                  color: theme.colors.text,
                  backgroundColor: theme.colors.white,
                  marginBottom: 0,
                  height: 58,
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
