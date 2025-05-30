import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "@themes/ThemeContext";
import { useTranslation } from "react-i18next";

import { updateUserProfileSchema } from "@validations/editProfileSchema";

import CustomInput from "@components/Inputs/InputData";
import CustomButton from "@components/Buttons/NormalButton";
import CustomPicker from "@components/Inputs/CustomPicker";

import FechaNacimientoInput from "@components/Inputs/FechaNacimientoInput";
import TabsPerfil from "@components/Header/TabsPerfil";

const EditarPerfil = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState(route.params?.tab);

  // Campos personales
  const [nombreCompleto, setNombreCompleto] = useState("Silvana Ardisson");
  const [dni, setDni] = useState("24980182");
  const [genero, setGenero] = useState("Femenino");
  const [telefono, setTelefono] = useState("1136610049");
  const [direccion, setDireccion] = useState("La gaviota");
  const [fechaNacimiento, setFechaNacimiento] = useState(new Date());

  // Campos cuenta
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { t } = useTranslation();

  const handleCancel = () => navigation.goBack();

  const [errors, setErrors] = useState({
    nombreCompleto: "",
    dni: "",
    genero: "",
    telefono: "",
    direccion: "",
    fechaNacimiento: "",
    password: "",
    confirmPassword: "",
  });

  const validateFields = () => {
    const data = {
      nombreCompleto,
      dni,
      genero,
      telefono,
      direccion,
      fechaNacimiento,
      password,
      confirmPassword,
    };

    const result = updateUserProfileSchema.safeParse(data);

    if (!result.success) {
      const fieldErrors: any = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0];
        fieldErrors[field] = issue.message;
      });
      setErrors((prev) => ({ ...prev, ...fieldErrors }));
      return false;
    }

    setErrors({
      nombreCompleto: "",
      dni: "",
      genero: "",
      telefono: "",
      direccion: "",
      fechaNacimiento: "",
      password: "",
      confirmPassword: "",
    });

    return true;
  };

  const handleInputChange = (field: string, value: string) => {
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));

    switch (field) {
      case "nombre":
        setNombreCompleto(value);
        break;
      case "dni":
        setDni(value);
        break;
      case "telefono":
        setTelefono(value);
        break;
      case "direccion":
        setDireccion(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
    }
  };

  const handleSave = () => {
    if (!validateFields()) return;

    const formData = {
      nombreCompleto,
      dni,
      genero,
      telefono,
      direccion,
      fechaNacimiento,
      password,
      confirmPassword,
    };

    // Tu lógica de guardado...
    // navigation.goBack();
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* Tabs */}
      <TabsPerfil
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        // disableSwitching={true}
      />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        scrollEnabled={activeTab === "personal"}
      >
        {activeTab === "personal" ? (
          <>
            <CustomInput
              label={true}
              labelText="Nombre completo"
              placeholder="Nombre completo"
              value={nombreCompleto}
              onChangeText={(value) => handleInputChange("nombre", value)}
              error={errors.nombreCompleto}
            />

            <CustomInput
              label={true}
              labelText="DNI"
              placeholder="DNI"
              value={dni}
              onChangeText={(value) => handleInputChange("dni", value)}
              error={errors.dni}
            />

            <FechaNacimientoInput
              value={fechaNacimiento}
              onChange={setFechaNacimiento}
              error={errors.fechaNacimiento}
            />

            <CustomPicker
              label
              labelText={t("inputPlaceholder.gender")}
              selectedValue={genero}
              onValueChange={(itemValue) => {
                setGenero(itemValue as "Masculino" | "Femenino" | "Otro");
                setErrors((prev) => ({ ...prev, genero: "" }));
              }}
              error={errors.genero}
              items={[
                { label: t("inputPlaceholder.gender"), value: "" },
                { label: t("genderPick.male"), value: "Masculino" },
                { label: t("genderPick.female"), value: "Femenino" },
                { label: t("genderPick.other"), value: "Otro" },
              ]}
            />

            <CustomInput
              label={true}
              labelText="Teléfono"
              placeholder="Teléfono"
              value={telefono}
              onChangeText={(value) => handleInputChange("telefono", value)}
              error={errors.telefono}
            />

            <CustomInput
              label={true}
              labelText="Dirección"
              placeholder="Dirección"
              value={direccion}
              onChangeText={(value) => handleInputChange("direccion", value)}
              error={errors.direccion}
            />
          </>
        ) : (
          <>
            <CustomInput
              label={true}
              labelText="Nueva contraseña"
              placeholder="Nueva contraseña"
              value={password}
              onChangeText={(value) => handleInputChange("password", value)}
              secureTextEntry={true}
              error={errors.password}
            />


            <CustomInput
              label={true}
              labelText="Confirme la contraseña"
              placeholder="Confirme la contraseña"
              value={confirmPassword}
              onChangeText={(value) =>
                handleInputChange("confirmPassword", value)
              }
              secureTextEntry={true}
              error={errors.confirmPassword}
            />
          </>
        )}

        <View
          style={[
            styles.buttonRow,
            activeTab !== "personal"
              ? {
                  marginHorizontal: "auto",
                  alignSelf: "center",
                  position: "absolute",
                  bottom: 30,
                }
              : "",
          ]}
        >
          <CustomButton
            title="Editar datos"
            onPress={handleSave}
            style={{ width: "48%" }}
          />
          <CustomButton
            title="Cancelar"
            onPress={handleCancel}
            style={{ backgroundColor: theme.colors.errorButton, width: "48%" }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    padding: 20,
    paddingLeft: 40,
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
  buttonRow: {
    width: 308,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    marginBottom: 4,
    fontSize: 14,
  },
});

export default EditarPerfil;
