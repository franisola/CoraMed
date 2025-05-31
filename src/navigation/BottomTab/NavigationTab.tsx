import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "@themes/ThemeContext";
import { useTranslation } from "react-i18next";

import CustomTabBar from "./CustomTabBar";
import { getDefaultHeaderOptions } from "@navigation/options/headerOptions";

import HomeStack from "@navigation/StackNavigation/HomeStack";
import Notifications from "@screens/Notifications";
import ProfileStack from "@navigation/StackNavigation/ProfileStack";
import { head } from "axios";

const Tab = createBottomTabNavigator();

export default function NavigationTab() {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const defaultHeaderOptions = getDefaultHeaderOptions(theme);

  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
      inicialRouteName="HomeStack"
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{ title: t("screenTitles.home") }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{ title: t("screenTitles.notifications") }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{ title: t("screenTitles.profile") }}
      />
    </Tab.Navigator>
  );
}
