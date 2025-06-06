import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { useTheme } from "@themes/ThemeContext";
import { getDefaultHeaderOptions } from "@navigation/options/headerOptions";
import Home from "@screens/Home";
import BookStack from "./BookStack";
import ScheduleStack from "./ScheduleStack";

export type HomeStackParamList = {
  Home: undefined;
  BookStack: undefined;
  ScheduleStack: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStack = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={getDefaultHeaderOptions(theme)}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: t("screenTitles.home") }}
      />
      <Stack.Screen
        name="BookStack"
        component={BookStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ScheduleStack"
        component={ScheduleStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
