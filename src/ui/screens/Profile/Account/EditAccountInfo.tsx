import React, { useState, useEffect, useMemo } from "react";
import { View, ScrollView, StyleSheet, Text, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "@themes/ThemeContext";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { isEqual } from "lodash";

import {
  personalDataSchema,
  accountDataSchema,
} from "@validations/editProfileSchema";

import CustomInput from "@components/Inputs/InputData";
import CustomButton from "@components/Buttons/NormalButton";
import CustomPicker from "@components/Inputs/CustomPicker";
import FechaNacimientoInput from "@components/Inputs/FechaNacimientoInput";
import TabsPerfil from "@components/Header/TabsPerfil";

import { updateUser } from "@redux/slices/userSlice";

import { useToast } from "react-native-toast-notifications";

const EditarPerfil = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { theme } = useTheme();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { updateLoading, updateError } = useAppSelector((state) => state.user);

  const [activeTab, setActiveTab] = useState(route.params?.tab || "personal");

  const user = useAppSelector((state) => state.auth.user);

  const toast = useToast();

  const [initialValues, setInitialValues] = useState<any>(null);

  const [nombreCompleto, setNombreCompleto] = useState("");
  const [dni, setDni] = useState("");
  const [genero, setGenero] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState<Date | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

  useEffect(() => {
    if (user) {
      const defaults = {
        nombreCompleto: user.nombreCompleto || "",
        dni: user.dni || "",
        genero: user.genero || "",
        telefono: user.telefono || "",
        direccion: user.direccion || "",
        fechaNacimiento: user.fechaNacimiento
          ? new Date(user.fechaNacimiento)
          : null,
        password: "",
        confirmPassword: "",
      };
      setNombreCompleto(defaults.nombreCompleto);
      setDni(defaults.dni);
      setGenero(defaults.genero);
      setTelefono(defaults.telefono);
      setDireccion(defaults.direccion);
      setFechaNacimiento(defaults.fechaNacimiento);
      setInitialValues(defaults);
    }
  }, [user]);

  const handleCancel = () => navigation.goBack();

  const validateFields = () => {
    let result;

    if (activeTab === "personal") {
      result = personalDataSchema.safeParse({
        nombreCompleto,
        dni,
        genero,
        telefono,
        direccion,
        fechaNacimiento,
      });
    } else {
      result = accountDataSchema.safeParse({
        password,
        confirmPassword,
      });
    }

    if (!result.success) {
      const fieldErrors: any = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0];
        fieldErrors[field] = issue.message;
      });
      setErrors((prev) => ({ ...prev, ...fieldErrors }));
      return false;
    }

    return true;
  };

  const handleInputChange = (field: string, value: string) => {
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));

    switch (field) {
      case "nombreCompleto":
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

  const isModified = useMemo(() => {
    if (!initialValues) return false;

    if (activeTab === "personal") {
      return !isEqual(
        {
          nombreCompleto: initialValues.nombreCompleto,
          dni: initialValues.dni,
          genero: initialValues.genero,
          telefono: initialValues.telefono,
          direccion: initialValues.direccion,
          fechaNacimiento: initialValues.fechaNacimiento,
        },
        {
          nombreCompleto,
          dni,
          genero,
          telefono,
          direccion,
          fechaNacimiento,
        }
      );
    } else if (activeTab === "account") {
      return password !== "" || confirmPassword !== "";
    }

    return false;
  }, [
    activeTab,
    initialValues,
    nombreCompleto,
    dni,
    genero,
    telefono,
    direccion,
    fechaNacimiento,
    password,
    confirmPassword,
  ]);

  const handleSubmit = () => {
    if (!validateFields()) return;
    if (!isModified) return;

    const payload: any = {};

    if (activeTab === "personal") {
      if (nombreCompleto !== initialValues.nombreCompleto)
        payload.nombreCompleto = nombreCompleto;
      if (dni !== initialValues.dni) payload.dni = dni;
      if (genero !== initialValues.genero) payload.genero = genero;
      if (telefono !== initialValues.telefono) payload.telefono = telefono;
      if (direccion !== initialValues.direccion) payload.direccion = direccion;

      if (
        (fechaNacimiento && !initialValues.fechaNacimiento) ||
        (fechaNacimiento &&
          initialValues.fechaNacimiento &&
          fechaNacimiento.getTime() !== initialValues.fechaNacimiento.getTime())
      ) {
        payload.fechaNacimiento = fechaNacimiento?.toISOString();
      }

      Alert.alert(
       t("notificationsEdit.confirmUpdate"),
        t("notificationsEdit.saveChangesQuestion"),
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Confirmar",
            onPress: () => {
              dispatch(updateUser(payload))
                .unwrap()
                .then(() => {
                  navigation.goBack();
                })
                .catch(() => {
                  // manejar error si querés
                });
            },
          },
        ],
        { cancelable: true }
      );
    } else if (activeTab === "account") {
      if (password !== "") payload.password = password;
      if (confirmPassword !== "") payload.confirmPassword = confirmPassword;

      Alert.alert(
        t("notificationsEdit.confirmUpdate"),
        t("notificationsEdit.updatePasswordQuestion"),
        [
          { text: t("editAccTxt.cancel"), style: "cancel" },
          {
            text: t("editAccTxt.editData"),
            onPress: () => {
              dispatch(updateUser(payload))
                .unwrap()
                .then(() => {
                  toast.show(t("notificationsEdit.passwordUpdatedSuccess"), {
                    type: "success",
                  });
                  setPassword("");
                  setConfirmPassword("");
                  navigation.goBack();
                })
                .catch(() => {
                  toast.show(t("notificationsEdit.passwordUpdateError"), {
                    type: "danger",
                  });
                });
            },
          },
        ],
        { cancelable: true }
      );
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <TabsPerfil
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setErrors((prev) => {
            const clean = { ...prev };
            if (tab === "personal") {
              clean.password = "";
              clean.confirmPassword = "";
            } else {
              clean.nombreCompleto = "";
              clean.dni = "";
              clean.genero = "";
              clean.telefono = "";
              clean.direccion = "";
              clean.fechaNacimiento = "";
            }
            return clean;
          });
        }}
        tabs={["personal", "account"]}
      />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        scrollEnabled={activeTab === "personal"}
      >
        {activeTab === "personal" ? (
          <>
            <CustomInput
              label
              labelText={t("myDataTxt.fullName")}
              placeholder="Nombre completo"
              value={nombreCompleto}
              onChangeText={(value) =>
                handleInputChange("nombreCompleto", value)
              }
              error={errors.nombreCompleto}
            />

            <CustomInput
              label
              labelText="DNI"
              placeholder="DNI"
              value={dni}
              onChangeText={(value) => handleInputChange("dni", value)}
              error={errors.dni}
            />

            <FechaNacimientoInput
              value={fechaNacimiento}
              onChange={(value) => {
                setFechaNacimiento(value);
                setErrors((prev) => ({ ...prev, fechaNacimiento: "" }));
              }}
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
              label
              labelText={t("myDataTxt.phone")}
              placeholder={t("myDataTxt.phone")}
              value={telefono}
              onChangeText={(value) => handleInputChange("telefono", value)}
              error={errors.telefono}
            />

            <CustomInput
              label
              labelText={t("myDataTxt.address")}
              placeholder={t("myDataTxt.address")}
              value={direccion}
              onChangeText={(value) => handleInputChange("direccion", value)}
              error={errors.direccion}
            />
          </>
        ) : (
          <>
            <CustomInput
              label
              labelText={t("inputPlaceholder.newPassword")}
              placeholder={t("inputPlaceholder.newPassword")}
              value={password}
              onChangeText={(value) => handleInputChange("password", value)}
              secureTextEntry
              error={errors.password}
            />

            <CustomInput
              label
              labelText={t("inputPlaceholder.confirmPassword")}
              placeholder={t("inputPlaceholder.confirmPassword")}
              value={confirmPassword}
              onChangeText={(value) =>
                handleInputChange("confirmPassword", value)
              }
              secureTextEntry
              error={errors.confirmPassword}
            />
          </>
        )}

        {updateError && (
          <Text style={[styles.errorText, { color: theme.colors.error }]}>
            {updateError}
          </Text>
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
              : {},
          ]}
        >
          <CustomButton
            title={updateLoading ? t("editAccTxt.saving") : t("editAccTxt.editData")}
            onPress={handleSubmit}
            style={{ width: "48%" }}
            disabled={!isModified || updateLoading}
          />
          <CustomButton
            title={t("editAccTxt.cancel")}
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
  buttonRow: {
    width: 308,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  errorText: {
    marginTop: 8,
    fontSize: 14,
  },
});

export default EditarPerfil;
