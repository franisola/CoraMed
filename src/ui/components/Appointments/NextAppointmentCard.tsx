import React, { useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { useTheme } from "@themes/ThemeContext";
import { getNextAppointment } from "@slices/appointmentSlice";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

const ICON_SIZE = 20;

const NextAppointmentCard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { theme } = useTheme();
  const navigation = useNavigation<any>();

  const { appointment, loading, error } = useAppSelector(
    (state) => state.appointment
  );
  const user = useAppSelector((state) => state.auth.user);

  useFocusEffect(
    useCallback(() => {
      if (user) {
        dispatch(getNextAppointment());
      }
    }, [dispatch, user])
  );

  const isCancelado =
    appointment?.estado?.toLowerCase() === "cancelado" ||
    appointment?.estado?.toLowerCase() === "turno_cancelado";

  const handlePress = () => {
    if (appointment?._id) {
      navigation.navigate("ScheduleStack", {
        screen: "AppointmentDetails",
        params: { id: appointment._id },
      });
    }
  };

  if (loading) {
    return <ActivityIndicator color={theme.colors.primary} />;
  }

  if (error) {
    return (
      <Text style={[styles.errorText, { color: theme.colors.error }]}>
        {error}
      </Text>
    );
  }

  // Si no hay turno próximo mostramos mensaje especial con otro estilo
  if (!appointment) {
    return (
      <View
        style={[
          styles.noAppointmentContainer,
          { backgroundColor: theme.colors.details },
        ]}
      >
        <Text
          style={[styles.noAppointmentText, { color: theme.colors.greyText }]}
        >
          No hay turnos próximos.
        </Text>
      </View>
    );
  }

  // Si hay turno mostramos la card con estilo normal
  const nombreCompleto = appointment.profesional
    ? `${appointment.profesional.nombre ?? ""} ${appointment.profesional.apellido ?? ""}`.trim()
    : "-";

  const especialidad = appointment.profesional?.especialidad || "-";
  const fecha = appointment.fecha
    ? dayjs(appointment.fecha).utc(false).format("DD/MM/YYYY")
    : "-";
  const hora = appointment.hora || "-";

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.white,
          borderLeftColor: isCancelado
            ? theme.colors.error
            : theme.colors.primary,
          borderLeftWidth: 4,
        },
      ]}
      activeOpacity={0.8}
      onPress={handlePress}
    >
      <View style={styles.row}>
        {/* Nombre y especialidad sin icono, alineados a la izquierda */}
        <View style={styles.nameSpecialtyContainer}>
          <Text
            style={[
              styles.title,
              { color: isCancelado ? theme.colors.error : theme.colors.text },
            ]}
            numberOfLines={1}
          >
            {nombreCompleto}
          </Text>
          <Text
            style={[
              styles.subtitle,
              {
                color: isCancelado ? theme.colors.error : theme.colors.greyText,
              },
            ]}
            numberOfLines={1}
          >
            {especialidad}
          </Text>
        </View>
      </View>

      {/* Fecha con icono */}
      <View style={styles.row}>
        <Ionicons
          name="calendar-outline"
          size={ICON_SIZE}
          color={isCancelado ? theme.colors.error : theme.colors.icons}
          style={styles.icon}
        />
        <Text
          style={[
            styles.info,
            { color: isCancelado ? theme.colors.error : theme.colors.text },
          ]}
        >
          {`Fecha: ${fecha}`}
        </Text>
      </View>

      {/* Hora con icono */}
      <View style={styles.row}>
        <Ionicons
          name="time-outline"
          size={ICON_SIZE}
          color={isCancelado ? theme.colors.error : theme.colors.icons}
          style={styles.icon}
        />
        <Text
          style={[
            styles.info,
            { color: isCancelado ? theme.colors.error : theme.colors.text },
          ]}
        >
          {`Hora: ${hora}`}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 8,
    marginVertical: 10,
    marginHorizontal: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  nameSpecialtyContainer: {
    flex: 1,
    flexDirection: "column",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  icon: {
    marginRight: 10,
  },
  info: {
    fontSize: 16,
  },
  errorText: {
    marginTop: 20,
    fontSize: 16,
    textAlign: "center",
  },
  noAppointmentContainer: {
    padding: 20,
    marginHorizontal: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  noAppointmentText: {
    fontSize: 16,
    fontStyle: "italic",
  },
});

export default NextAppointmentCard;
