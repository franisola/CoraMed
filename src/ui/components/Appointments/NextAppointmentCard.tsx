// src/components/Appointments/NextAppointmentCard.tsx
import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { useTheme } from "@themes/ThemeContext";
import { getNextAppointment } from "@slices/appointmentSlice";
import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/native";

const NextAppointmentCard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { theme } = useTheme();
  const navigation = useNavigation<any>();

  const { appointment, loading, error } = useAppSelector(
    (state) => state.appointment
  );
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      dispatch(getNextAppointment());
    }
  }, [dispatch, user]);

  const nombreCompleto =
    appointment?.profesional?.nombre && appointment?.profesional?.apellido
      ? `${appointment.profesional.nombre} ${appointment.profesional.apellido}`
      : "-";

  const especialidad = appointment?.profesional?.especialidad || "-";
  const fecha = appointment?.fecha
    ? dayjs(appointment.fecha).format("DD/MM/YYYY")
    : "-";
  const hora = appointment?.hora || "-";

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

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.details,
          borderColor: theme.colors.inputBorder,
        },
      ]}
      activeOpacity={appointment ? 0.8 : 1}
      onPress={handlePress}
      disabled={!appointment}
    >
      <Text style={[styles.title, { color: theme.colors.primary }]}>
        Próximo Turno
      </Text>

      {appointment ? (
        <View style={styles.rowGroup}>
          <View style={styles.col}>
            <Text style={[styles.label, { color: theme.colors.primary }]}>
              Profesional:
            </Text>
            <Text style={[styles.value, { color: theme.colors.text }]}>
              {nombreCompleto}
            </Text>
          </View>
          <View style={styles.col}>
            <Text style={[styles.label, { color: theme.colors.primary }]}>
              Especialidad:
            </Text>
            <Text style={[styles.value, { color: theme.colors.text }]}>
              {especialidad}
            </Text>
          </View>
          <View style={styles.col}>
            <Text style={[styles.label, { color: theme.colors.primary }]}>
              Fecha:
            </Text>
            <Text style={[styles.value, { color: theme.colors.text }]}>
              {fecha}
            </Text>
          </View>
          <View style={styles.col}>
            <Text style={[styles.label, { color: theme.colors.primary }]}>
              Hora:
            </Text>
            <Text style={[styles.value, { color: theme.colors.text }]}>
              {hora}
            </Text>
          </View>
        </View>
      ) : (
        <Text style={[styles.noDataText, { color: theme.colors.greyText }]}>
          No hay turnos próximos.
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 16,
  },
  rowGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
  },
  col: {
    width: "47%",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  value: {
    fontSize: 16,
    marginTop: 4,
  },
  errorText: {
    marginTop: 20,
    fontSize: 16,
  },
  noDataText: {
    fontStyle: "italic",
    fontSize: 16,
    marginTop: 8,
  },
});

export default NextAppointmentCard;
