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

  const estado = appointment.estado.toLowerCase();

  const isCanceled = estado === "cancelado";
  const isCompleted = estado === "completado";
  // const isAgendado = estado === "agendado"; // No se usa


  // Borde lateral: rojo si cancelado, verde si completado, color visible según theme si agendado
  let borderColor;
  if (isCanceled) {
    borderColor = theme.colors.error;
  } else if (isCompleted) {
    borderColor = theme.colors.confirmationColor;
  } else {
    borderColor = theme.dark ? theme.colors.textSecondary : theme.colors.primary;
  }

  // Iconos: rojo si cancelado, verde si completado, color de iconos del theme si agendado
  let iconColor;
  if (isCanceled) {
    iconColor = theme.colors.error;
  } else if (isCompleted) {
    iconColor = theme.colors.confirmationColor;
  } else {
    iconColor = theme.colors.icons;
  }

  // Fondo de la card: adaptado a dark/light
  const cardBg = theme.dark ? theme.colors.details : theme.colors.white;

  // Texto principal y secundario: normal, pero si está cancelado, solo los iconos y barra en rojo
  const textColor = theme.colors.text;
  const subTextColor = theme.colors.greyText;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View
        style={[
          styles.card,
          {
            backgroundColor: cardBg,
            borderLeftColor: borderColor,
            borderLeftWidth: 4,
          },
        ]}
      >
        <View style={styles.content}>
          {/* Nombre y Especialidad sin icono, alineados al borde */}
          <Text style={[styles.title, { color: textColor }]}> 
            {appointment.profesional
              ? `Dr. ${appointment.profesional.nombre ?? ''} ${appointment.profesional.apellido ?? ''}`.trim()
              : '-'}
          </Text>
          <Text style={[styles.subtitle, { color: subTextColor }]}> 
            Especialidad: {appointment.profesional?.especialidad || '-'}
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
