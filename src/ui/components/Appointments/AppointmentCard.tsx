import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "@themes/ThemeContext";
import { Appointment } from "@redux/slices/appointmentSlice";
import dayjs from "dayjs";

interface Props {
  appointment: Appointment;
  onPress?: () => void;
}

const ICON_SIZE = 18;

const AppointmentCard: React.FC<Props> = ({ appointment, onPress }) => {
  const { theme, isDark } = useTheme();

  const textColor = isDark ? theme.colors.textSecondary : theme.colors.greyText;

  return (
    // <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={[styles.card, { backgroundColor: theme.colors.details }]}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Dr. {appointment.profesional.nombre}{" "}
          {appointment.profesional.apellido}
        </Text>

        <Text style={[styles.subtitle, { color: textColor }]}>
          Especialidad: {appointment.profesional.especialidad}
        </Text>

        <View style={styles.row}>
          <FontAwesome
            name="calendar"
            size={ICON_SIZE}
            color={theme.colors.icons}
            style={styles.icon}
          />
          <Text style={[styles.info, { color: textColor }]}>
            Fecha: {dayjs(appointment.fecha).format("DD/MM/YYYY")}
          </Text>
        </View>

        <View style={styles.row}>
          <FontAwesome
            name="clock-o"
            size={ICON_SIZE}
            color={theme.colors.icons}
            style={styles.icon}
          />
          <Text style={[styles.info, { color: textColor }]}>
            Hora: {appointment.hora}
          </Text>
        </View>

        <View style={styles.row}>
          <FontAwesome
            name="comment"
            size={ICON_SIZE}
            color={theme.colors.icons}
            style={styles.icon}
          />
          <Text style={[styles.info, { color: textColor }]}>
            Motivo: {appointment.motivo_consulta}
          </Text>
        </View>

        <View style={styles.row}>
          <FontAwesome
            name="info-circle"
            size={ICON_SIZE}
            color={theme.colors.icons}
            style={styles.icon}
          />
          <Text style={[styles.info, { color: textColor }]}>
            Estado: {appointment.estado}
          </Text>
        </View>
      </TouchableOpacity>
    // </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center", // Alinea ícono y texto verticalmente al centro
    marginBottom: 6,
  },
  icon: {
    marginRight: 10,
    width: ICON_SIZE, // Uniforma el ancho ocupado por el ícono
    textAlign: "center",
  },
  info: {
    fontSize: 14,
    lineHeight: 20,
    flexShrink: 1, // Para evitar desborde de texto largo
  },
});

export default AppointmentCard;
