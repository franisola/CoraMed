import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Linking,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useTheme } from "@themes/ThemeContext";
import { useRoute } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

import AppointmentInfo from "@components/Appointments/AppointmentInfo";

const AppointmentResultsScreen = () => {
  const { theme, isDark } = useTheme();
  const route = useRoute();
  const { appointment } = route.params;

  const valueColor = isDark
    ? theme.colors.textSecondary
    : theme.colors.greyText;

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <AppointmentInfo
          doctor={appointment.profesional}
          especialidad={appointment.especialidad}
          fecha={appointment.fecha}
          hora={appointment.hora}
        />

        {appointment.notas_medicas && (
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={[styles.label, { color: theme.colors.text }]}>Notas médicas:</Text>
              <Text style={[styles.value, { color: valueColor }]}>{appointment.notas_medicas}</Text>
            </View>
          </View>
        )}

        {appointment.resultados_estudios.length > 0 && (
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={[styles.label, { color: theme.colors.text }]}>Resultados:</Text>
              {appointment.resultados_estudios.map((res, index) => (
                <View key={index} style={styles.resultItem}>
                  <FontAwesome
                    name="file-pdf-o"
                    size={20}
                    color="#D32F2F"
                    style={styles.pdfIcon}
                  />
                  <Text
                    style={[styles.linkText, { color: valueColor }]}
                    onPress={() => Linking.openURL(res.pdf)}
                  >
                    {res.nombre}.pdf
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  content: {
    marginTop: 30,
    alignItems: "center",
    paddingBottom: 40,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 308,
    marginVertical: 16,

  },
  column: {
    width: "100%",
  },
  label: {
    fontSize: 24,
    fontWeight: "normal",
  },
  value: {
    fontSize: 18,
    marginTop: 4,
  },
  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  pdfIcon: {
    marginRight: 8,
  },
  linkText: {
    fontSize: 16,
    textDecorationLine: "underline",
  },
});

export default AppointmentResultsScreen;