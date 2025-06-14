import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import CustomButton from "@components/Buttons/NormalButton";
import { useTranslation } from "react-i18next";
import { useTheme } from "@themes/ThemeContext";
import FormFields from "@/ui/components/Auth/Forms/FormFields";
import { useAuthForm } from "@components/Auth/Forms/useAuthForm";
import { useAppSelector } from "@redux/hooks"; // <- nuevo

interface AuthFormProps {
  type:
    | "login"
    | "register"
    | "recover"
    | "changePassword"
    | "codeVerification";
  onSubmit: (data: any) => void;
  generalError?: string;
  initialValues?: Partial<AuthField>;
}

const AuthForm: React.FC<AuthFormProps> = ({
  type,
  onSubmit,
  generalError,
  initialValues,
}) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { values, errors, handleChange, setGenero, handleSubmit } = useAuthForm(
    type,
    onSubmit,
    generalError,
    initialValues ?? {}
  );

  const { loading, error } = useAppSelector((state) => state.auth); // <- nuevo
  const showLoading = loading && !error; // <- nuevo

  const authTitleKey =
    type === "login"
      ? "authTitles.login"
      : type === "register"
        ? "authTitles.register"
        : type === "recover"
          ? "authTitles.recover"
          : type === "changePassword"
            ? "authTitles.changePassword"
            : "authTitles.codeVerification";

  const buttonTextKey =
    type === "login"
      ? "button.login"
      : type === "register"
        ? "button.register"
        : type === "recover"
          ? "button.recover"
          : type === "changePassword"
            ? "button.changePassword"
            : "button.verifyCode";

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

      <FormFields
        type={type}
        values={values}
        errors={errors}
        onChange={handleChange}
        setGenero={setGenero}
      />

      <CustomButton
        style={{ alignSelf: "center", position: "absolute", bottom: 100 }}
        title={t(buttonTextKey)}
        onPress={handleSubmit}
        loading={showLoading}
        disabled={showLoading}
      />
    </SafeAreaView>
  );
};

export default AuthForm;
