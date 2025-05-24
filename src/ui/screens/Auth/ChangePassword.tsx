import React from "react";
import { View, Button, SafeAreaView, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useTheme } from "@themes/ThemeContext";

import AuthFooter from "@/ui/components/Auth/AuthFooter";


type MainProps = {
  changeLanguage: (lang: string) => void;
  currentLanguage: string;
};


import AuthForm from "@/ui/components/Auth/AuthForm";

const Login = () => {
  const { theme } = useTheme();

  return (
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
        onSubmit={(data) => {
          console.log("Form data:", data);
        }}
      />

      <AuthFooter currentScreen="Login" />
    </SafeAreaView>
  );
};

export default Login;