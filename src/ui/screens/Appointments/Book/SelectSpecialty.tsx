import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";

interface Specialty {
  id: string;
  nombre: string;
}

export const SelectSpecialty = () => {
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [selected, setSelected] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigation = useNavigation();

  useEffect(() => {
    // Simula llamada al backend
    const fetchSpecialties = async () => {
      try {
        setLoading(true);
        // Reemplazá esto con tu fetch real al backend
        const response = await new Promise<Specialty[]>((resolve) =>
          setTimeout(
            () =>
              resolve([
                { id: "1", nombre: "Cardiología" },
                { id: "2", nombre: "Dermatología" },
                { id: "3", nombre: "Pediatría" },
                { id: "4", nombre: "Ginecología" },
                { id: "5", nombre: "Neurología" },
              ]),
            1000
          )
        );
        setSpecialties(response);
      } catch (error) {
        console.error("Error al obtener especialidades:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialties();
  }, []);

  const handleSelect = () => {
    if (selected) {
      // Llamar a tu endpoint para traer médicos de esa especialidad
      console.log("Especialidad seleccionada:", selected);
      // navegación o fetch aquí
      // navigation.navigate('MedicosPorEspecialidad', { especialidad: selected })
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Elija una Especialidad:</Text>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selected}
          onValueChange={(value) => setSelected(value)}
          style={styles.picker}
        >
          <Picker.Item label="Especialidad" value="" enabled={false} />
          {specialties.map((spec) => (
            <Picker.Item
              key={spec.id}
              label={spec.nombre}
              value={spec.nombre}
            />
          ))}
        </Picker>
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: selected ? "#7ba5d9" : "#a0b7d1" },
        ]}
        onPress={handleSelect}
        disabled={!selected}
      >
        <Text style={styles.buttonText}>Seleccionar Especialidad</Text>
      </TouchableOpacity>
    </View>
  );
};

// 💅 Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f9ff",
    padding: 20,
  },
  title: {
    fontSize: 18,
    color: "#3366cc",
    fontWeight: "500",
    marginVertical: 20,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginBottom: 40,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  button: {
    paddingVertical: 14,
    alignItems: "center",
    borderRadius: 6,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
