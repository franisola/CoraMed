import React from "react";
import {
  View,
  Button,
  SafeAreaView,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useTheme } from "@themes/ThemeContext";

import AuthFooter from "@/ui/components/Auth/AuthFooter";

type MainProps = {
  changeLanguage: (lang: string) => void;
  currentLanguage: string;
};

import AuthForm from "@/ui/components/Auth/AuthForm";

const RecoverPassword = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { theme, toggleTheme, isDark } = useTheme();

  const handleSuccess = ({ email }: { email: string }) => {
    navigation.navigate("CodeVerification", { email });
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
        <AuthForm type="recover" onSubmit={handleSuccess} />

        <AuthFooter currentScreen="Login" />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default RecoverPassword;
