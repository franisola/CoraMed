import React from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import { useTheme } from "@themes/ThemeContext";
import { CommonActions } from "@react-navigation/native";

const ICONS: Record<string, string> = {
  HomeStack: "home",
  NotificationsStack: "bell",
  ProfileStack: "user",
};

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const { theme } = useTheme();

  const activeBg = theme.colors.details;
  const inactiveBg = theme.colors.primary;
  const activeIcon = theme.colors.primary;
  const inactiveIcon = theme.colors.details;

  // No hace falta CommonActions, usamos reset directo
  return (
    <SafeAreaView
      style={{
        flexDirection: "row",
        backgroundColor: inactiveBg,
      }}
    >
      {state.routes.map((route, index) => {
        // Tipado explícito para evitar warnings
        const isFocused: boolean = state.index === index;
        const iconName: string = ICONS[route.name] ?? "question-circle";

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (route.name === "ProfileStack") {
            // Si ya estoy en ProfileStack y el screen activo es Profile, no hago nada
            const profileRoute = state.routes.find(
              (r: typeof route) => r.name === "ProfileStack"
            );
            const lastRouteName = Array.isArray(profileRoute?.state?.routes)
              ? profileRoute.state.routes[profileRoute.state.routes.length - 1]
                  ?.name
              : undefined;
            const isOnProfile = isFocused && lastRouteName === "Profile";
            if (isOnProfile) return;

            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  {
                    name: "ProfileStack",
                    state: {
                      routes: [{ name: "Profile" }],
                    },
                  },
                ],
              })
            );
            return;
          }
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={
              descriptors[route.key].options.tabBarAccessibilityLabel
            }
            testID={descriptors[route.key].options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={() =>
              navigation.emit({ type: "tabLongPress", target: route.key })
            }
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
              name={iconName}
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
