import React from "react";
import { View, Text, Button } from "react-native";
import { useTranslation } from "react-i18next";

export default function Profile() {
  const { t, i18n } = useTranslation();

  return (
    <View>
      <Text>{t("screenTitles.home")}</Text>
      <Button title="Español" onPress={() => i18n.changeLanguage("es")} />
      <Button title="English" onPress={() => i18n.changeLanguage("en")} />
    </View>
  );
}