import React from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { FontAwesome5 } from "@expo/vector-icons";

import { useTheme } from "@themes/ThemeContext";
import { useTranslation } from "react-i18next";

import { useHeaderHeight } from "@react-navigation/elements";

import Home from "@/ui/screens/Home";
import Notifications from "@/ui/screens/Notifications";
import Profile from "@/ui/screens/Profile/Profile";

import HeaderMenu from "@components/Header/HeaderMenu";

import ProfileStack from "@/navigation/StackNavigation/ProfileStack";

const Tab = createBottomTabNavigator();

import { Dimensions } from "react-native";
const screenHeight = Dimensions.get("window").height;
const headerHeight20Percent = screenHeight * 0.12;

const ICONS: Record<string, string> = {
  Home: "home",
  ProfileStack: "user",
  Notifications: "bell",
};

function MyTabBar({ state, descriptors, navigation }) {
  const { theme } = useTheme();

  const activeBg = theme.colors.details;
  const inactiveBg = theme.colors.primary;
  const activeIcon = theme.colors.primary;
  const inactiveIcon = theme.colors.details;

  return (
    <SafeAreaView
      style={{
        flexDirection: "row",
        backgroundColor: inactiveBg,
        position: "relative",
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel ?? options.title ?? route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            if (route.name === "ProfileStack") {
              // Navega siempre a la pantalla principal del stack
              navigation.navigate("ProfileStack", { screen: "Profile" });
            } else {
              navigation.navigate(route.name, route.params);
            }
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 10,
              backgroundColor: isFocused ? activeBg : inactiveBg,
              height: 60,
            }}
          >
            <FontAwesome5
              name={ICONS[route.name] || "circle"}
              size={25}
              color={isFocused ? activeIcon : inactiveIcon}
              style={{
                marginBottom: 4,
                borderRadius: 8,
                padding: 6,
              }}
            />
          </TouchableOpacity>
        );
      })}
    </SafeAreaView>
  );
}

export default function NavigationTab() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      tabBar={(props) => <MyTabBar {...props} />}
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "center",
        headerTintColor: theme.colors.primary,
        headerStyle: {
          backgroundColor: theme.colors.details,
          height: headerHeight20Percent,
        },
        headerTitleStyle: {
          color: theme.colors.text,
        },
        headerRight: () => <HeaderMenu headerHeight={headerHeight20Percent} />,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
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
