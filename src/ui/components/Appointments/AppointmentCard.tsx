import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@themes/ThemeContext";
import { Appointment } from "@redux/slices/appointmentSlice";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

interface Props {
  appointment: Appointment;
  onPress?: () => void;
}

const AppointmentCard: React.FC<Props> = ({ appointment, onPress }) => {
  const { theme } = useTheme();

  const isCanceled = appointment.estado.toLowerCase() === "cancelado";

  const borderColor = isCanceled ? theme.colors.error : theme.colors.primary;
  const textColor = theme.colors.text;
  const subTextColor = theme.colors.greyText;
  const iconColor = isCanceled ? theme.colors.error : theme.colors.icons;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.colors.white,
            borderLeftColor: borderColor,
            borderLeftWidth: 4,
          },
        ]}
      >
        <View style={styles.content}>
          {/* Nombre y Especialidad sin icono, alineados al borde */}
          <Text style={[styles.title, { color: textColor }]}>
            Dr. {appointment.profesional.nombre}{" "}
            {appointment.profesional.apellido}
          </Text>
          <Text style={[styles.subtitle, { color: subTextColor }]}>
            Especialidad: {appointment.profesional.especialidad}
          </Text>

          {/* Los demás campos con icono y texto alineado */}
          <View style={styles.row}>
            <Ionicons
              name="calendar-outline"
              size={20}
              color={iconColor}
              style={styles.icon}
            />
            <Text style={[styles.body, { color: subTextColor }]}>
              Fecha:{" "}
              {dayjs(appointment.fecha).utc(false).format("DD/MM/YYYY")}{" "}
            </Text>
          </View>

          <View style={styles.row}>
            <Ionicons
              name="time-outline"
              size={20}
              color={iconColor}
              style={styles.icon}
            />
            <Text style={[styles.body, { color: subTextColor }]}>
              Hora: {appointment.hora}
            </Text>
          </View>

          <View style={styles.row}>
            <Ionicons
              name="chatbox-ellipses-outline"
              size={20}
              color={iconColor}
              style={styles.icon}
            />
            <Text style={[styles.body, { color: subTextColor }]}>
              Motivo: {appointment.motivo_consulta}
            </Text>
          </View>

          <View style={styles.row}>
            <Ionicons
              name="alert-circle-outline"
              size={20}
              color={iconColor}
              style={styles.icon}
            />
            <Text style={[styles.body, { color: subTextColor }]}>
              Estado: {appointment.estado}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 4,
    borderRadius: 8,
    elevation: 1,
    flexDirection: "row",
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  icon: {
    marginRight: 8,
    width: 24,
    textAlign: "center",
  },
  body: {
    fontSize: 14,
    flexShrink: 1,
  },
});

export default AppointmentCard;
