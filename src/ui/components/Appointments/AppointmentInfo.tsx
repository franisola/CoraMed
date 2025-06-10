import React from "react";
import { View, Text, StyleSheet } from "react-native";
import dayjs from "dayjs";
import { useTheme } from "@themes/ThemeContext";

interface Props {
  doctor: { nombre: string; apellido: string };
  especialidad: string;
  fecha: string;
  hora: string;
}

const AppointmentInfo: React.FC<Props> = ({ doctor, especialidad, fecha, hora }) => {
  const { theme, isDark } = useTheme();
  const valueColor = isDark ? theme.colors.textSecondary : theme.colors.greyText;

  return (
    <>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={[styles.label, { color: theme.colors.text }]}>Profesional:</Text>
          <Text style={[styles.value, { color: valueColor }]}>
            {doctor.nombre} {doctor.apellido}
          </Text>
        </View>
        <View style={styles.column}>
          <Text style={[styles.label, { color: theme.colors.text }]}>Especialidad:</Text>
          <Text style={[styles.value, { color: valueColor }]}>{especialidad}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={[styles.label, { color: theme.colors.text }]}>Fecha:</Text>
          <Text style={[styles.value, { color: valueColor }]}>{dayjs(fecha).format("DD/MM/YYYY")}</Text>
        </View>
        <View style={styles.column}>
          <Text style={[styles.label, { color: theme.colors.text }]}>Hora:</Text>
          <Text style={[styles.value, { color: valueColor }]}>{hora}</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 308,
    marginBottom: 10,
  },
  column: {
    width: "48%",
  },
  label: {
    fontWeight: "normal",
    fontSize: 24,
  },
  value: {
    fontSize: 18,
    marginTop: 4,
  },
});

export default AppointmentInfo;