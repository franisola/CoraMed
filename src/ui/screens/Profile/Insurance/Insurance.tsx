import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useTheme } from "@themes/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "@components/Buttons/NormalButton";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AuthStackParamList } from "@navigation/StackNavigation/ProfileStack";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import {
  fetchHealthInsurance,
  removeHealthInsurance,
} from "@slices/healthInsuranceSlice";

const Insurance = () => {
  const { theme } = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const dispatch = useAppDispatch();

  const {
    data: obraSocial,
    loading,
    error,
  } = useAppSelector((state) => state.healthInsurance);

  const user = useAppSelector((state) => state.auth.user);

  // Obtener obra social al montar
  useEffect(() => {
    dispatch(fetchHealthInsurance());
  }, [dispatch]);

  const handleEliminar = () => {
    dispatch(removeHealthInsurance());
  };

  const renderSinObra = () => (
    <View style={styles.centeredContent}>
      <Text style={[styles.subtitle, { color: theme.colors.text }]}>
        No tienes una obra social vinculada.
      </Text>
    </View>
  );

  const renderConObra = () => (
    <View style={styles.content}>
      <InsuranceCard
        nombre={user.nombreCompleto ?? ""}
        numeroSocio={obraSocial?.numero_socio_visible ?? ""}
        plan={obraSocial?.plan ?? ""}
        obraSocial={obraSocial?.nombre ?? ""}
      />
    </View>
  );

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {loading ? (
        <View style={styles.centeredContent}>
          <ActivityIndicator size="large" color={theme.colors.text} />
        </View>
      ) : error ? (
        <View style={styles.centeredContent}>
          <Text style={[styles.subtitle, { color: theme.colors.error }]}>
            {error}
          </Text>
        </View>
      ) : obraSocial ? (
        renderConObra()
      ) : (
        renderSinObra()
      )}

      {!loading && (
        <CustomButton
          title={obraSocial ? "Eliminar obra" : "Agregar Obra Social"}
          onPress={
            obraSocial
              ? handleEliminar
              : () => navigation.navigate("AddInsurance")
          }
          style={[
            styles.button,
            {
              backgroundColor: obraSocial
                ? theme.colors.error
                : theme.colors.button,
            },
          ]}
        />
      )}
    </View>
  );
};

const InsuranceCard = ({
  nombre,
  numeroSocio,
  plan,
  obraSocial,
}: {
  nombre: string;
  numeroSocio: string;
  plan: string;
  obraSocial: string;
}) => {
  const { theme } = useTheme();

  return (
    <View
      style={{
        backgroundColor: theme.colors.button,
        borderRadius: 12,
        paddingVertical: 24,
        paddingHorizontal: 20,
        width: 328,
        gap: 14,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          style={{ color: theme.colors.white, fontSize: 18, fontWeight: "600" }}
        >
          {nombre}
        </Text>
        <Text style={{ color: theme.colors.white, fontSize: 16 }}>
          {obraSocial}
        </Text>
      </View>

      <Text style={{ color: theme.colors.white, fontSize: 16 }}>
        {numeroSocio}
      </Text>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ color: theme.colors.white, fontSize: 14 }}>
          NRO. Socio
        </Text>
        <Text style={{ color: theme.colors.white, fontSize: 14 }}>
          {obraSocial} - {plan}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  content: {
    flex: 1,
    alignItems: "center",
    marginTop: 30,
  },
  centeredContent: {
    flex: 1,
    // justifyContent: "center",
    marginTop: 30,
    alignItems: "center",
    width: "100%",
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "normal",
    textAlign: "center",
    width: 308,
  },
  button: {
    width: 308,
    height: 58,
    borderRadius: 8,
  },
});

export default Insurance;
