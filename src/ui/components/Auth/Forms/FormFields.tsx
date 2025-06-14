import React from "react";
import {
  View,
  Text,
  TouchableOpacity,

} from "react-native";
import CustomInput from "@components/Inputs/InputData";
import CustomPicker from "@components/Inputs/CustomPicker";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@themes/ThemeContext";
import { AuthErrors, AuthField } from "@components/Auth/Forms/useAuthForm";

interface ExtendedAuthField extends AuthField {
  code?: string; // Nuevo campo opcional para código
}

interface Props {
  type:
    | "login"
    | "register"
    | "recover"
    | "changePassword"
    | "codeVerification";
  values: ExtendedAuthField;
  errors: AuthErrors;
  onChange: (field: keyof ExtendedAuthField, value: string) => void;
  setGenero: (value: string) => void;
}

const FormFields: React.FC<Props> = ({
  type,
  values,
  errors,
  onChange,
  setGenero,
}) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { theme } = useTheme();

  return (
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
            value={values.nombreCompleto}
            onChangeText={(value) => onChange("nombreCompleto", value)}
            error={errors.nombreCompleto}
          />
          <CustomInput
            placeholder={t("inputPlaceholder.dni")}
            value={values.dni}
            onChangeText={(value) => onChange("dni", value)}
            keyboardType="numeric"
            error={errors.dni}
            maxLength={8}
          />
        </>
      )}

      {(type === "register" || type === "login" || type === "recover") && (
        <CustomInput
          placeholder={t("inputPlaceholder.email")}
          value={values.email}
          onChangeText={(value) => onChange("email", value)}
          keyboardType="email-address"
          error={errors.email}
        />
      )}

      {(type === "register" ||
        type === "login" ||
        type === "changePassword") && (
        <CustomInput
          placeholder={t("inputPlaceholder.password")}
          value={values.password}
          onChangeText={(value) => onChange("password", value)}
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
          value={values.confirmPassword}
          onChangeText={(value) => onChange("confirmPassword", value)}
          secureTextEntry={true}
          error={errors.confirmPassword}
        />
      )}

      {type === "register" && (
        <CustomPicker
          selectedValue={values.genero}
          onValueChange={(itemValue) => setGenero(itemValue)}
          error={errors.genero}
          items={[
            { label: t("inputPlaceholder.gender"), value: "" },
            { label: t("genderPick.male"), value: "Masculino" },
            { label: t("genderPick.female"), value: "Femenino" },
            { label: t("genderPick.other"), value: "Otro" },
          ]}
        />
      )}

      {type === "codeVerification" && (
        <CustomInput
          placeholder={t("inputPlaceholder.verificationCode")}
          value={values.code || ""}
          onChangeText={(value) => onChange("code", value)}
          keyboardType="numeric"
          error={errors.code}
          maxLength={6} // Por ejemplo, código de 6 dígitos
        />
      )}

      {errors.general && (
        <Text style={{ color: theme.colors.error, marginBottom: 10 }}>
          {errors.general}
        </Text>
      )}
    </View>
  );
};

export default FormFields;
