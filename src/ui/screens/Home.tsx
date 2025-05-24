import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";


export default function HomeScreen({ navigation }: any) {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenida Silvana!</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Próximo Turno</Text>
        <Text>Profesional: Valentino Vacchini</Text>
        <Text>Especialidad: Dermatología</Text>
        <Text>Fecha: 17/08/2025</Text>
        <Text>Hora: 09:00</Text>
      </View>

      <Button title="Abrir Menú" onPress={() => navigation.openDrawer()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  card: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#f1f1f1",
    elevation: 2,
  },
  cardTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
});
