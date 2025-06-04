import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "@themes/ThemeContext";
import CustomButton from "@components/Buttons/NormalButton";

const BookAppointment = () => {
  const { theme, isDark } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { especialidad, doctor, fecha, hora } = route.params;

  const [motivoConsulta, setMotivoConsulta] = useState("");

  const handleSubmit = () => {
    const formData = {
      especialidad,
      doctor,
      fecha,
      hora,
      motivo_consulta: motivoConsulta,
    };

    console.log("Formulario enviado:", formData);
  };

  const valueColor = isDark ? theme.colors.textSecondary : theme.colors.greyText;
  const isValid = motivoConsulta.trim().length >= 10 && motivoConsulta.length <= 500;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.content}>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={[styles.label, { color: theme.colors.text }]}>Profesional:</Text>
              <Text style={[styles.value, { color: valueColor }]}>{doctor}</Text>
            </View>
            <View style={styles.column}>
              <Text style={[styles.label, { color: theme.colors.text }]}>Especialidad:</Text>
              <Text style={[styles.value, { color: valueColor }]}>{especialidad}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={[styles.label, { color: theme.colors.text }]}>Fecha:</Text>
              <Text style={[styles.value, { color: valueColor }]}>{fecha}</Text>
            </View>
            <View style={styles.column}>
              <Text style={[styles.label, { color: theme.colors.text }]}>Hora:</Text>
              <Text style={[styles.value, { color: valueColor }]}>{hora}</Text>
            </View>
          </View>

          <Text style={[styles.subtitle, { color: theme.colors.text }]}>Motivo de la consulta:</Text>
          <TextInput
            style={[styles.input, {
              borderColor: theme.colors.inputBorder,
              color: theme.colors.text,
            }]}
            placeholder="Escriba aquí el motivo de su consulta..."
            placeholderTextColor={theme.colors.greyText}
            value={motivoConsulta}
            onChangeText={text => setMotivoConsulta(text.slice(0, 500))}
            multiline
            numberOfLines={5}
          />
          <Text style={[styles.charCounter, { color: valueColor }]}>Caracteres: {motivoConsulta.length}/500</Text>
        </View>

        <View style={styles.buttonWrapper}>
          <CustomButton
            title="Confirmar Turno"
            onPress={handleSubmit}
            disabled={!isValid}
            style={[styles.button, {
              backgroundColor: !isValid
                ? theme.colors.unauthorizedButton
                : theme.colors.button,
            }]}
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
  subtitle: {
    fontSize: 24,
    fontWeight: "normal",
    alignSelf: "flex-start",
    marginTop: 20,
    marginBottom: 20,
    width: 308,
  },
  input: {
    height: 120,
    width: 308,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    textAlignVertical: "top",
  },
  charCounter: {
    alignSelf: "flex-end",
    marginTop: 4,
    fontSize: 12,
    width: 308,
    textAlign: "right",
  },
  buttonWrapper: {
    paddingBottom: 30,
    alignItems: "center",
  },
  button: {
    width: 308,
    height: 58,
    borderRadius: 8,
  },
});

export default BookAppointment;