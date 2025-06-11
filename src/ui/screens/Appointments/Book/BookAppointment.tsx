import React, { useState } from "react";
import dayjs from "dayjs";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "@themes/ThemeContext";
import CustomButton from "@components/Buttons/NormalButton";

import { useAppDispatch } from "@redux/hooks";
import { createAppointment } from "@slices/appointmentSlice";

import AppointmentMotiveInput from "@components/Appointments/AppointmentMotiveInput";
import AppointmentInfo from "@components/Appointments/AppointmentInfo";

const BookAppointment = () => {
  const { theme, isDark } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useAppDispatch();

  const { especialidad, doctor, fecha, hora } = route.params;
  const [motivoConsulta, setMotivoConsulta] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isValid =
    motivoConsulta.trim().length >= 10 && motivoConsulta.length <= 500;

  const valueColor = isDark
    ? theme.colors.textSecondary
    : theme.colors.greyText;

  const handleSubmit = async () => {
    if (!isValid || isLoading) return;

    setErrorMsg("");
    setIsLoading(true);

    try {
      const payload = {
        profesional: doctor._id,
        especialidad,
        fecha,
        hora,
        motivo_consulta: motivoConsulta.trim(),
      };

      const response = await dispatch(createAppointment(payload)).unwrap();

      navigation.navigate("Home", { turno: response });
    } catch (error: any) {
      const mensaje =
        error?.message || "Ocurrió un error al crear el turno.";
      setErrorMsg(mensaje);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={[
          styles.container,
          { backgroundColor: theme.colors.background },
        ]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.content}>
          <AppointmentInfo
            doctor={doctor}
            especialidad={especialidad}
            fecha={fecha}
            hora={hora}
          />

          <AppointmentMotiveInput
            value={motivoConsulta}
            onChangeText={setMotivoConsulta}
            editable={!isLoading}
          />

          {!!errorMsg && (
            <Text
              style={{
                color: theme.colors.error,
                marginTop: 10,
                textAlign: "center",
              }}
            >
              {errorMsg}
            </Text>
          )}
        </View>

        <View style={styles.buttonWrapper}>
          <CustomButton
            title="Confirmar Turno"
            onPress={handleSubmit}
            loading={isLoading}
            disabled={!isValid || isLoading}
            style={[
              styles.button,
              {
                backgroundColor:
                  !isValid || isLoading
                    ? theme.colors.unauthorizedButton
                    : theme.colors.button,
              },
            ]}
          />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  content: {
    marginTop: 30,
    alignItems: "center",
  },
  buttonWrapper: {
    paddingBottom: 30,
    alignItems: "center",
  },
  button: {
    width: 308,
    height: 58,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BookAppointment;
