import React from "react";
import {
  View,
  Button,
  SafeAreaView,
  Text,
  ScrollView,
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

const Register = () => {
  const { theme, toggleTheme, isDark } = useTheme();

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
          type="register"
          onSubmit={(data) => {
            console.log("Form data:", data);
          }}
        />

        <AuthFooter currentScreen="Register" />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Register;
