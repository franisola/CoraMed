import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@themes/ThemeContext";
import CustomPicker from "@components/Inputs/CustomPicker";
import CustomButton from "@components/Buttons/NormalButton";

const SelectSpecialty = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const [specialties, setSpecialties] = useState<{ label: string; value: string }[]>([]);
  const [selected, setSelected] = useState("default");

  useEffect(() => {
    const fetchSpecialties = async () => {
      const data = ["Cardiología", "Dermatología", "Pediatría", "Ginecología", "Neurología"];
      const formatted = [
        { label: "Especialidad", value: "default" },
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
    navigation.navigate("SelectDoctor", { especialidad: selected });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.subtitle, { color: theme.colors.text }]}>
          Elija una Especialidad:
        </Text>

        <CustomPicker
          selectedValue={selected}
          onValueChange={handleSelect}
          items={specialties}
          label={false}
        />
      </View>

      <CustomButton
        title="Seleccionar Especialidad"
        onPress={handlePress}
        disabled={selected === "default"}
        style={[styles.button, { backgroundColor: selected === "default" ? theme.colors.unauthorizedButton : theme.colors.button }]}
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
    marginTop: 30,
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

export default SelectSpecialty;