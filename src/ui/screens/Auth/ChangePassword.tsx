import React from "react";
import {
  View,
  Button,
  SafeAreaView,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useTheme } from "@themes/ThemeContext";

import AuthFooter from "@/ui/components/Auth/AuthFooter";

type MainProps = {
  changeLanguage: (lang: string) => void;
  currentLanguage: string;
};

import AuthForm from "@/ui/components/Auth/AuthForm";

const ChangePassword = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { theme, toggleTheme, isDark } = useTheme();

  const route = useRoute();
  const { email } = route.params as { email: string };

  const handleSuccess = ({ email }: { email: string }) => {
    navigation.navigate("Login");
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: theme.colors.background,
        }}
      >
        <AuthForm
          type="changePassword"
          initialValues={{ email }}
          onSubmit={handleSuccess}
        />

        <AuthFooter currentScreen="Login" />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default ChangePassword;
