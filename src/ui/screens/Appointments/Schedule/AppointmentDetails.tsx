import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useTheme } from "@themes/ThemeContext";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { useNavigation } from "@react-navigation/native";

import { getAppointmentById as fetchAppointmentById } from "@slices/appointmentSlice";

import AppointmentInfo from "@components/Appointments/AppointmentInfo";
import AppointmentMotiveInput from "@components/Appointments/AppointmentMotiveInput";
import CustomButton from "@components/Buttons/NormalButton";

import { updateAppointmentStatus } from "@slices/appointmentSlice";

const AppointmentDetailsScreen = () => {
  const { theme, isDark } = useTheme();
  const dispatch = useAppDispatch();
  const route = useRoute();
  const { id } = route.params as { id: string };
  const navigation = useNavigation();

  const valueColor = isDark
    ? theme.colors.textSecondary
    : theme.colors.greyText;

  const { appointment, loading, error } = useAppSelector(
    (state) => state.appointment
  );

  useEffect(() => {
    if (id) dispatch(fetchAppointmentById(id));
  }, [id]);

  const handleCancelarTurno = () => {
    Alert.alert(
      "¿Está seguro?",
      "¿Está seguro que desea cancelar su turno?",
      [
        {
          text: "Mantener Turno",
          style: "cancel",
        },
        {
          text: "Cancelar Turno",
          style: "destructive",
          onPress: async () => {
            if (!appointment?._id) return;
            try {
              await dispatch(
                updateAppointmentStatus({
                  id: appointment._id,
                  estado: "Cancelado",
                })
              );
            } catch (error) {
              console.log("Error al cancelar turno:", error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  if (loading || !appointment) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: theme.colors.error }}>{error}</Text>
      </View>
    );
  }

  const {
    profesional,
    especialidad,
    fecha,
    hora,
    motivo_consulta,
    estado,
    notas_medicas,
    resultados_estudios,
  } = appointment;

  const resultadosListos =
    !!notas_medicas || (resultados_estudios && resultados_estudios.length > 0);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.content}>
        <AppointmentInfo
          doctor={profesional}
          especialidad={especialidad}
          fecha={fecha}
          hora={hora}
        />

        <AppointmentMotiveInput value={motivo_consulta} editable={false} />

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={[styles.label, { color: theme.colors.text }]}>
              Estado:
            </Text>
            <Text style={[styles.value, { color: valueColor }]}>{estado}</Text>
          </View>
        </View>
      </View>

      {/* Acciones dinámicas en el pie de pantalla */}
      <View style={styles.buttonWrapper}>
        {estado === "Agendado" && (
          <CustomButton
            title="Cancelar Turno"
            onPress={handleCancelarTurno}
            style={{ backgroundColor: theme.colors.error }}
          />
        )}

        {estado === "Completado" && !resultadosListos && (
          <Text style={[styles.infoText, { color: theme.colors.text }]}>
            Los resultados aún no están listos.
          </Text>
        )}

        {estado === "Completado" && resultadosListos && (
          <CustomButton
            title="Ver resultados"
            onPress={() =>
              navigation.navigate("AppointmentResults", {
                appointment,
              })
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  content: {
    marginTop: 30,
    alignItems: "center",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
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
    fontSize: 24,
    fontWeight: "normal",
  },
  value: {
    fontSize: 18,
    marginTop: 4,
  },
  buttonWrapper: {
    alignItems: "center",
    paddingBottom: 30,
  },
  infoText: {
    fontSize: 14,
    textAlign: "center",
  },
});

export default AppointmentDetailsScreen;
