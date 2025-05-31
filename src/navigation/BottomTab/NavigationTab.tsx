import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CustomTabBar from "./CustomTabBar";

import HomeStack from "@navigation/StackNavigation/HomeStack";
import ProfileStack from "@navigation/StackNavigation/ProfileStack";
import NotificationsStack from "../StackNavigation/NotificationsStack";

const Tab = createBottomTabNavigator();

export default function NavigationTab() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
      initialRouteName="HomeStack"
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        // options={{ title: t("screenTitles.home") }}
      />
      <Tab.Screen
        name="NotificationsStack"
        component={NotificationsStack}
        // options={{ title: t("screenTitles.notifications") }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        // options={{ title: t("screenTitles.profile") }}
      />
    </Tab.Navigator>
  );
}
