import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { getAllAppointments } from "@redux/slices/appointmentSlice";
import Tabs from "@components/Header/TabsPerfil";
import { useTheme } from "@themes/ThemeContext";
import { useTranslation } from "react-i18next";
import { FontAwesome } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";

import AppointmentCard from "@components/Appointments/AppointmentCard";

const MyAppointmentsScreen = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { theme } = useTheme();
  const navigation = useNavigation();

  const [activeTab, setActiveTab] = useState("proximos");

  const { pastAppointments, upcomingAppointments, loading, error } =
    useAppSelector((state) => state.appointment);

  useEffect(() => {
    dispatch(getAllAppointments());
  }, [dispatch]);

  const renderAppointment = ({ item }: { item: Appointment }) => (
    <AppointmentCard
      appointment={item}
      onPress={() => navigation.navigate("AppointmentDetails", { id: item._id })}
    />
  );

  const labelMap = {
    proximos: t("screenTitles.myNextAppointments"),
    anteriores: t("screenTitles.myPastAppointments"),
  };

  const dataToRender =
    activeTab === "proximos" ? upcomingAppointments : pastAppointments;

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Tabs
        tabs={["proximos", "anteriores"]}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        labelMap={labelMap}
      />

      {loading ? (
        <ActivityIndicator
          size="large"
          color={theme.colors.icons}
          style={styles.loader}
        />
      ) : error ? (
        <Text style={[styles.error, { color: theme.colors.error }]}>
          {error}
        </Text>
      ) : (
        <FlatList
          data={dataToRender}
          keyExtractor={(item) => item._id}
          renderItem={renderAppointment}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text style={[styles.empty, { color: theme.colors.greyText }]}>
              No hay turnos disponibles.
            </Text>
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    marginTop: 30,
  },
  list: {
    padding: 16,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  icon: {
    marginRight: 8,
  },
  info: {
    fontSize: 14,
  },
  estado: {
    fontSize: 14,
  },
  error: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 24,
  },
  empty: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});

export default MyAppointmentsScreen;
