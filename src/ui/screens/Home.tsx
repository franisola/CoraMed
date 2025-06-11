import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@themes/ThemeContext";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";
import { User } from "@models/User";
import NextAppointmentCard from "@components/Appointments/NextAppointmentCard";

const IconButton = ({
  icon,
  label,
  onPress,
}: {
  icon: any;
  label: string;
  onPress: () => void;
}) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity style={styles.iconButton} onPress={onPress}>
      <View
        style={[styles.iconWrapper, { borderColor: theme.colors.inputBorder, backgroundColor: theme.colors.details }]}
      >
        <FontAwesome name={icon} size={28} color={theme.colors.icons} />
      </View>
      <Text style={[styles.iconLabel, { color: theme.colors.text }]}>{label}</Text>
    </TouchableOpacity>
  );
};

const Home = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();

  const user = useSelector((state: RootState) => state.auth.user) as User;

  const getSaludo = (genero?: string) => {
    if (!genero) return "Bienvenide";
    const g = genero.toLowerCase();
    if (g === "masculino" || g === "m" || g === "male") return "Bienvenido";
    if (g === "femenino" || g === "f" || g === "female") return "Bienvenida";
    return "Bienvenide";
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.welcomeText, { color: theme.colors.text }]}>
        {user ? `${getSaludo(user.genero)} ${user.nombreCompleto}!` : "Bienvenide!"}
      </Text>

      <View style={styles.buttonsRow}>
        <IconButton
          icon="calendar"
          label="Solicitar Turno"
          onPress={() =>
            navigation.navigate("BookStack", { screen: "SelectSpecialty" })
          }
        />
        <IconButton
          icon="book"
          label="Mis Turnos"
          onPress={() =>
            navigation.navigate("ScheduleStack", { screen: "MyAppointments" })
          }
        />
        <IconButton
          icon="id-card"
          label="Mi Obra Social"
          onPress={() =>
            navigation.navigate("ProfileStack", { screen: "Insurance" })
          }
        />
      </View>

      <NextAppointmentCard />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: "bold",
    marginVertical: 50,
    marginHorizontal: 20,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 50,
  },
  iconButton: {
    alignItems: "center",
  },
  iconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconLabel: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 6,
  },
});

export default Home;
