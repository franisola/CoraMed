import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { useTheme } from "@themes/ThemeContext";
import { getDefaultHeaderOptions } from "@navigation/options/headerOptions";
import Notifications from "@screens/Notifications";


export type NotificationsStackParamList = {
  Notifications: undefined;
};

const Stack = createNativeStackNavigator<NotificationsStackParamList>();

const NotificationsStack = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  
  return (
    <Stack.Navigator
      initialRouteName="Notifications"
      screenOptions={getDefaultHeaderOptions(theme)}
    >
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{ title: t("screenTitles.notifications") }}
      />
    </Stack.Navigator>
  );
};

export default NotificationsStack;
