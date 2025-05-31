import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@themes/ThemeContext";
import CustomPicker from "@components/Inputs/CustomPicker";
import CustomButton from "@components/Buttons/NormalButton";

const Notifications = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const [specialties, setSpecialties] = useState<{ label: string; value: string }[]>([]);
  const [selected, setSelected] = useState("default");

  useEffect(() => {
    // Simulación de datos del backend
    const fetchSpecialties = async () => {
      const data = ["Cardiología", "Dermatología", "Pediatría", "Ginecología", "Neurología"];
      const formatted = [
        { label: "Especialidad", value: "default" }, // opción por defecto
        ...data.map((item) => ({ label: item, value: item })),
      ];
      setSpecialties(formatted);
    };

    fetchSpecialties();
  }, []);

  const handleSelect = (value: string) => {
    setSelected(value);
  };

  const handlePress = () => {
    navigation.navigate("ConfirmacionTurno", { especialidad: selected });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Elija una Especialidad:</Text>

      <CustomPicker
        selectedValue={selected}
        onValueChange={handleSelect}
        items={specialties}
        label={false}
      />

      <CustomButton
        title="Seleccionar Especialidad"
        onPress={handlePress}
        disabled={selected === "default"}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  button: {
    marginTop: 30,
  },
});

export default Notifications;
