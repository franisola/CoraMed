import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@themes/ThemeContext";




import CustomButton from "@components/Buttons/NormalButton";

const BookAppointment = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();


  const route = useRoute();
  const { profesional, especialidad, fecha, hora } = route.params;

  const [motivoConsulta, setMotivoConsulta] = useState("");

  const handleSubmit = async () => {
    if (motivoConsulta.trim().length < 10) return;

    const payload = {
      profesional,
      especialidad,
      fecha,
      hora,
      motivo_consulta: motivoConsulta.trim(),
    };

    try {
      const res = await fetch("https://tu-backend.com/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Error al confirmar turno");

      Alert.alert("Turno confirmado");
      navigation.navigate("Home");
    } catch (err) {
      Alert.alert("Error", "No se pudo confirmar el turno");
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.content}>
        <Text style={[styles.subtitle, { color: theme.colors.text }]}>
          Elija una Especialidad:
        </Text>

        
      </View>

      <CustomButton
        title="Seleccionar Especialidad"
        onPress={handlePress}
        disabled={motivoConsulta === ""}
        style={[
          styles.button,
          {
            backgroundColor:
              motivoConsulta === "default"
                ? theme.colors.unauthorizedButton
                : theme.colors.button,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 30, // para que el botón quede a 30px del bottom
  },
  content: {
    marginTop: 40,
    alignItems: "center",
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "normal",
    alignSelf: "flex-start",
    marginBottom: 20,
    width: 308,
  },
  button: {
    width: 308,
    height: 58,
    borderRadius: 8,
  },
});

export default BookAppointment;
