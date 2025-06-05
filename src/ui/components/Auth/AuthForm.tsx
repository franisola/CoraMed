import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import CustomButton from "@components/Buttons/NormalButton";
import { useTranslation } from "react-i18next";
import { useTheme } from "@themes/ThemeContext";
import FormFields from "@/ui/components/Auth/Forms/formFields";
import { useAuthForm } from "@components/Auth/Forms/useAuthForm";
import { useAppSelector } from "@redux/hooks"; // <- nuevo

interface AuthFormProps {
  type: "login" | "register" | "recover" | "changePassword";
  onSubmit: (data: any) => void;
  generalError?: string;
}

const AuthForm: React.FC<AuthFormProps> = ({
  type,
  onSubmit,
  generalError,
}) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { values, errors, handleChange, setGenero, handleSubmit } = useAuthForm(
    type,
    onSubmit,
    generalError
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
          : "authTitles.changePassword";

  const buttonTextKey =
    type === "login"
      ? "button.login"
      : type === "register"
        ? "button.register"
        : type === "recover"
          ? "button.recover"
          : "button.changePassword";

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
        loading={showLoading} // <- aplicado
      />
    </SafeAreaView>
  );
};

export default AuthForm;
