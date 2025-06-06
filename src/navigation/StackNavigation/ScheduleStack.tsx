import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import { useTranslation } from "react-i18next";
import { useTheme } from "@themes/ThemeContext";
import { getDefaultHeaderOptions } from "@navigation/options/headerOptions";


import MyAppointments from "@screens/Appointments/Schedule/MyAppointments";

export type AppointmentStackParamList = {
  MyAppointments: undefined;
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

    </Stack.Navigator>
  );
};

export default AppointmentStack;
