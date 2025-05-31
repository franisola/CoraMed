import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SelectSpecialty from "@screens/Appointments/Book/SelectSpecialty";
import SelectDoctor from "@screens/Appointments/Book/SelectDoctor";
import SelectDate from "@screens/Appointments/Book/SelectDate";
import BookAppointment from "@screens/Appointments/Book/BookAppointment";

import { useTranslation } from "react-i18next";
import { useTheme } from "@themes/ThemeContext";
import { getDefaultHeaderOptions } from "@navigation/options/headerOptions";

export type BookStackParamList = {
  SelectSpecialty: undefined;
};




const Stack = createNativeStackNavigator<BookStackParamList>();

const BookStack = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <Stack.Navigator
      initialRouteName="SelectSpecialty"
      screenOptions={getDefaultHeaderOptions(theme)}
    >
      <Stack.Screen
        name="SelectSpecialty"
        component={SelectSpecialty}
        options={{ title: t("screenTitles.addAppointment") }}
      />
      <Stack.Screen
        name="SelectDoctor"
        component={SelectDoctor}
        options={{ title: t("screenTitles.addAppointment") }}
      />

      <Stack.Screen
        name="SelectDate"
        component={SelectDate}
        options={{ title: t("screenTitles.addAppointment") }}
      />

      <Stack.Screen
        name="BookAppointment"
        component={BookAppointment}
        options={{ title: t("screenTitles.addAppointment") }}
      />

    </Stack.Navigator>
  );
};

export default BookStack;
