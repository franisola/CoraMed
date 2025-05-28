import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useTheme } from "@themes/ThemeContext";

interface AuthFooterProps {
  currentScreen: string;
}
const AuthFooter: React.FC<AuthFooterProps> = ({ currentScreen }) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { theme, toggleTheme, isDark } = useTheme();

  const isRegister = currentScreen === "Register";
  const footerText = isRegister
    ? t("authFooterText.alreadyHaveAccount")
    : t("authFooterText.noAccount");
  const footerLinkText = isRegister
    ? t("authFooterText.login")
    : t("authFooterText.register");

  const handleNavigation = () => {
    if (isRegister) {
      navigation.navigate("Login");
    } else {
      navigation.navigate("Register");
    }
  };

  return (
    <SafeAreaView
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.details,
        width: "100%",
        height: 78,
      }}
    >
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center" }}
        onPress={() => handleNavigation()}
      >
        <Text style={{ color: theme.colors.text }}>{footerText}</Text>
        <Text
          style={{
            color: theme.colors.text,
            fontWeight: "bold",
            marginLeft: 4,
          }}
        >
          {footerLinkText}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AuthFooter;
