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
  const { theme, isDark } = useTheme();

  // Modo claro: igual que antes
  const activeBgLight = theme.colors.details;
  const inactiveBgLight = theme.colors.primary;
  // El icono activo en light mode como antes
  const activeIconLight = theme.colors.primary;
  const inactiveIconLight = theme.colors.details;

  // Modo oscuro: icono claro sobre fondo oscuro, tab seleccionado con fondo destacado
  const activeBgDark = theme.colors.details;
  const inactiveBgDark = theme.colors.background;
  // El icono activo en dark mode debe ser claro para contrastar con details
  const activeIconDark = theme.colors.text; // Usar color de texto principal en dark mode
  const inactiveIconDark = theme.colors.greyText;

  // No hace falta CommonActions, usamos reset directo
  // Color de fondo del tab bar según modo
  const tabBarBgColor = isDark ? inactiveBgDark : inactiveBgLight;

  return (
    <SafeAreaView
      style={{
        flexDirection: "row",
        backgroundColor: tabBarBgColor,
      }}
    >
      {state.routes.map((route: any, index: number) => {
        const isFocused: boolean = state.index === index;
        const iconName: string = ICONS[route.name] ?? "question-circle";

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (route.name === "ProfileStack") {
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

        // Colores según modo y selección (sin ternarios anidados)
        let bgColor: string;
        let iconColor: string;
        if (isDark) {
          bgColor = isFocused ? activeBgDark : inactiveBgDark;
          iconColor = isFocused ? activeIconDark : inactiveIconDark;
        } else {
          bgColor = isFocused ? activeBgLight : inactiveBgLight;
          iconColor = isFocused ? activeIconLight : inactiveIconLight;
        }

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
              backgroundColor: bgColor,
              height: 60,
            }}
          >
            <FontAwesome5
              name={iconName}
              size={25}
              color={iconColor}
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
