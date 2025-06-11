import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "@themes/ThemeContext";

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const { theme } = useTheme();
  const selectedLanguage = i18n.language.startsWith("es") ? "es" : "en";

  const handleSelectLanguage = (lang: "es" | "en") => {
    i18n.changeLanguage(lang);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>
        {selectedLanguage === "es" ? "Idioma" : "Language"}
      </Text>

      <View style={[styles.separator, { backgroundColor: theme.colors.primary }]} />

      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={styles.option}
          onPress={() => handleSelectLanguage("es")}
        >
          <View
            style={[
              styles.radio,
              {
                borderColor: theme.colors.primary,
              },
            ]}
          >
            {selectedLanguage === "es" && (
              <View
                style={[
                  styles.radioInner,
                  { backgroundColor: theme.colors.primary },
                ]}
              />
            )}
          </View>
          <Text style={[styles.label, { color: theme.colors.primary }]}>
            {selectedLanguage === "es" ? "Español" : "Spanish"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => handleSelectLanguage("en")}
        >
          <View
            style={[
              styles.radio,
              {
                borderColor: theme.colors.primary,
              },
            ]}
          >
            {selectedLanguage === "en" && (
              <View
                style={[
                  styles.radioInner,
                  { backgroundColor: theme.colors.primary },
                ]}
              />
            )}
          </View>
          <Text style={[styles.label, { color: theme.colors.primary }]}>
            {selectedLanguage === "es" ? "Inglés" : "English"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  separator: {
    height: 2,
    width: "70%",
    marginBottom: 30,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
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