import React, { act, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import dayjs from "dayjs";

import { useTheme } from "@themes/ThemeContext";

import { FontAwesome } from "@expo/vector-icons";

import CustomButton from "@components/Buttons/NormalButton";
import TabsPerfil from "@components/Header/TabsPerfil";

import { useAppSelector } from "@redux/hooks"; // o el path que uses para tus hooks

const { height } = Dimensions.get("window");

const Perfil = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const { theme } = useTheme();

  // 1. Seleccionamos el usuario del store
  const user = useAppSelector((state) => state.auth.user);

  // 2. Renderizamos con datos reales
  const renderPersonalData = () => (
    <>
      <Text style={[styles.label, { color: theme.colors.text }]}>
        Nombre Completo
      </Text>
      <Text
        style={[
          styles.value,
          {
            color: theme.dark
              ? theme.colors.textSecondary
              : theme.colors.greyText,
          },
        ]}
      >
        {user?.nombreCompleto || "Sin nombre"}
      </Text>

      <Text style={[styles.label, { color: theme.colors.text }]}>DNI</Text>
      <Text
        style={[
          styles.value,
          {
            color: theme.dark
              ? theme.colors.textSecondary
              : theme.colors.greyText,
          },
        ]}
      >
        {user?.dni || "Sin DNI"}
      </Text>

      <Text style={[styles.label, { color: theme.colors.text }]}>
        Fecha de nacimiento
      </Text>
      <Text
        style={[
          styles.value,
          {
            color: theme.dark
              ? theme.colors.textSecondary
              : theme.colors.greyText,
          },
        ]}
      >
        {user.fechaNacimiento
          ? dayjs(user.fechaNacimiento).isValid()
            ? dayjs(user.fechaNacimiento).format("DD/MM/YYYY")
            : "Sin fecha"
          : "Sin fecha"}
      </Text>

      <Text style={[styles.label, { color: theme.colors.text }]}>Género</Text>
      <Text
        style={[
          styles.value,
          {
            color: theme.dark
              ? theme.colors.textSecondary
              : theme.colors.greyText,
          },
        ]}
      >
        {user?.genero || "Sin género"}
      </Text>

      <Text style={[styles.label, { color: theme.colors.text }]}>Teléfono</Text>
      <Text
        style={[
          styles.value,
          {
            color: theme.dark
              ? theme.colors.textSecondary
              : theme.colors.greyText,
          },
        ]}
      >
        {user?.telefono || "Sin teléfono"}
      </Text>

      <Text style={[styles.label, { color: theme.colors.text }]}>
        Dirección
      </Text>
      <Text
        style={[
          styles.value,
          {
            color: theme.dark
              ? theme.colors.textSecondary
              : theme.colors.greyText,
          },
        ]}
      >
        {user?.direccion || "Sin dirección"}
      </Text>
    </>
  );

  const renderAccountData = () => (
    <>
      <Text style={[styles.label, { color: theme.colors.text }]}>Email</Text>
      <Text
        style={[
          styles.value,
          {
            color: theme.dark
              ? theme.colors.textSecondary
              : theme.colors.greyText,
          },
        ]}
      >
        {user?.email || "Sin email"}
      </Text>

      <Text style={[styles.label, { color: theme.colors.text }]}>
        Contraseña
      </Text>
      <View style={styles.passwordContainer}>
        <Text
          style={[
            styles.passwordValue,
            {
              color: theme.dark
                ? theme.colors.textSecondary
                : theme.colors.greyText,
            },
          ]}
        >
          {showPassword ? user?.password || "12345678" : "********"}

        </Text>
        {/* <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <FontAwesome
            name={showPassword ? "eye-slash" : "eye"}
            size={20}
            color={theme.dark ? theme.colors.textSecondary : theme.colors.icons}
          />
        </TouchableOpacity> */}
      </View>
    </>
  );

  const handleNavigation = () => {
    navigation.navigate("ProfileStack", {
      screen: "EditAccountInfo",
      params: { tab: activeTab },
    });
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* Tabs */}
      <TabsPerfil
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={["personal", "account"]}
      />

      {/* Contenido scrollable */}
      <View style={styles.scrollView}>
        <View style={styles.content}>
          {activeTab === "personal"
            ? renderPersonalData()
            : renderAccountData()}
        </View>
      </View>
      
        <CustomButton
          style={{
            marginHorizontal: "auto",
            alignSelf: "center",
            position: "absolute",
            bottom: 30,
          }}
          title="Editar Perfil"
          onPress={handleNavigation}
        />
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  tabContainer: {
    flexDirection: "row",
    height: 50,
  },
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
    padding: 20,
    paddingBottom: 120,
  },
  content: {
    flexGrow: 1,
  },
  label: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 16,
    paddingLeft: 20,
  },
  value: {
    fontSize: 18,
    marginBottom: 12,
    paddingLeft: 20,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    alignItems: "center",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 6,
    marginBottom: 12,
    paddingLeft: 20,
  },
  passwordValue: {
    fontSize: 18,
  },
});

export default Perfil;
