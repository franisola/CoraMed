import React from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import { useTheme } from "@themes/ThemeContext";

const LoadingScreen = () => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
      <Text style={[styles.text, { color: theme.colors.text }]}>Cargando...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LoadingScreen;