import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
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
    <TouchableOpacity style={{ alignItems: "center" }} onPress={onPress}>
      <View
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          borderWidth: 1,
          borderColor: theme.colors.inputBorder,
          backgroundColor: theme.colors.details,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FontAwesome name={icon} size={28} color={theme.colors.icons} />
      </View>
      <Text
        style={{
          color: theme.colors.text,
          fontSize: 12,
          textAlign: "center",
          marginTop: 6,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const Home = () => {
  const navigation = useNavigation();
  const { theme, isDark } = useTheme();

  const user = useSelector((state: RootState) => state.auth.user) as User;

  const getSaludo = (genero?: string) => {
    if (!genero) return "Bienvenide";
    const g = genero.toLowerCase();
    if (g === "masculino" || g === "m" || g === "male") return "Bienvenido";
    if (g === "femenino" || g === "f" || g === "female") return "Bienvenida";
    return "Bienvenide";
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingHorizontal: 16,
        paddingTop: 24,
      }}
    >
      <Text
        style={{
          fontSize: 32,
          color: theme.colors.text,
          fontWeight: "bold",
          marginVertical: 50,
          marginHorizontal: 20,
        }}
      >
        {user
          ? `${getSaludo(user.genero)} ${user.nombreCompleto}!`
          : "Bienvenide!"}
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginBottom: 50,
        }}
      >
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

export default Home;
