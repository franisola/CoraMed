import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useTranslation } from "react-i18next";
import { useTheme } from "@themes/ThemeContext";
import { getDefaultHeaderOptions } from "@navigation/options/headerOptions";

import MyAppointments from "@screens/Appointments/Schedule/MyAppointments";
import AppointmentDetails from "@screens/Appointments/Schedule/AppointmentDetails";
import AppointmentResults from "@screens/Appointments/Schedule/AppointmentResults";
import PdfViewerScreen from "@screens/Appointments/Schedule/PdfViewerScreen";

export type AppointmentStackParamList = {
  MyAppointments: undefined;
  AppointmentDetails: undefined;
  AppointmentResults: undefined;
  PdfViewerScreen: { pdfUrl: string; pdfName: string };
};

const Stack = createNativeStackNavigator<AppointmentStackParamList>();

const AppointmentStack = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <Stack.Navigator
      initialRouteName="MyAppointments"
      screenOptions={getDefaultHeaderOptions(theme)}
    >
      <Stack.Screen
        name="MyAppointments"
        component={MyAppointments}
        options={{ title: t("screenTitles.myAppointments") }}
      />

      <Stack.Screen
        name="AppointmentDetails"
        component={AppointmentDetails}
        options={{ title: t("screenTitles.myAppointments") }}
      />

      <Stack.Screen
        name="AppointmentResults"
        component={AppointmentResults}
        options={{ title: t("screenTitles.myAppointments") }}
      />

      <Stack.Screen
        name="PdfViewerScreen"
        component={PdfViewerScreen}
        options={{ title: "PDF" }}
      />
    </Stack.Navigator>
  );
};

export default AppointmentStack;
