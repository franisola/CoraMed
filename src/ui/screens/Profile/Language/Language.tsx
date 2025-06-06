import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { lightColors } from "../../../../themes/colors"; // Ajustá la ruta

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const selectedLanguage = i18n.language.startsWith("es") ? "es" : "en";

  const handleSelectLanguage = (lang: "es" | "en") => {
    i18n.changeLanguage(lang);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.option}
        onPress={() => handleSelectLanguage("es")}
      >
        <View style={[styles.radio, { borderColor: lightColors.primary }]}>
          {selectedLanguage === "es" && (
            <View style={[styles.radioInner, { backgroundColor: lightColors.primary }]} />
          )}
        </View>
        <Text style={[styles.label, { color: lightColors.primary }]}>Español</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => handleSelectLanguage("en")}
      >
        <View style={[styles.radio, { borderColor: lightColors.primary }]}>
          {selectedLanguage === "en" && (
            <View style={[styles.radioInner, { backgroundColor: lightColors.primary }]} />
          )}
        </View>
        <Text style={[styles.label, { color: lightColors.primary }]}>English</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  label: {
    fontSize: 16,
  },
});
