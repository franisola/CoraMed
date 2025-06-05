// src/components/Appointments/NextAppointmentCard.tsx
import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { useTheme } from "@themes/ThemeContext";
import { getNextAppointment } from "@slices/appointmentSlice";
import dayjs from "dayjs";

interface Props {
  onPress?: () => void;
}

const NextAppointmentCard: React.FC<Props> = ({ onPress }) => {
  const dispatch = useAppDispatch();
  const { theme } = useTheme();

  const { appointment, loading, error } = useAppSelector(
    (state) => state.appointment
  );
  const user = useAppSelector((state) => state.auth.user);

  // Llamada automática al montar
  useEffect(() => {
    if (user) {
      dispatch(getNextAppointment());
    }
  }, [dispatch, user]);

  const nombreCompleto =
    appointment?.profesional?.nombre && appointment?.profesional?.apellido
      ? `${appointment.profesional.nombre} ${appointment.profesional.apellido}`
      : "Profesional sin nombre";

  const especialidad =
    appointment?.profesional?.especialidad || "No especificada";
  const fecha = appointment?.fecha
    ? dayjs(appointment.fecha).format("DD/MM/YYYY")
    : "-";
  const hora = appointment?.hora || "-";

  return (
    <TouchableOpacity
      style={{
        borderWidth: 1,
        borderColor: theme.colors.inputBorder,
        backgroundColor: theme.colors.details,
        borderRadius: 8,
        padding: 16,
      }}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text
        style={{
          color: theme.colors.text,
          fontWeight: "bold",
          fontSize: 24,
          marginBottom: 12,
        }}
      >
        Próximo Turno
      </Text>

      {loading ? (
        <ActivityIndicator color={theme.colors.primary} />
      ) : error ? (
        <Text style={{ color: theme.colors.error, fontStyle: "italic" }}>
          {error}
        </Text>
      ) : appointment ? (
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 12,
            justifyContent: "space-between",
          }}
        >
          <View style={{ width: "45%" }}>
            <Text
              style={{
                color: theme.colors.text,
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              Profesional:
            </Text>
            <Text style={{ color: theme.colors.text, fontSize: 16 }}>{nombreCompleto}</Text>
          </View>
          <View style={{ width: "45%" }}>
            <Text
              style={{
                color: theme.colors.text,
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              Especialidad:
            </Text>
            <Text style={{ color: theme.colors.text, fontSize: 16 }}>{especialidad}</Text>
          </View>
          <View style={{ width: "45%", marginTop: 12 }}>
            <Text
              style={{
                color: theme.colors.text,
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              Fecha:
            </Text>
            <Text style={{ color: theme.colors.text, fontSize: 16 }}>{fecha}</Text>
          </View>
          <View style={{ width: "45%", marginTop: 12 }}>
            <Text
              style={{
                color: theme.colors.text,
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              Hora:
            </Text>
            <Text style={{ color: theme.colors.text, fontSize: 16 }}>{hora}</Text>
          </View>
        </View>
      ) : (
        <Text style={{ color: theme.colors.greyText, fontStyle: "italic" }}>
          No hay turnos próximos.
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default NextAppointmentCard;
