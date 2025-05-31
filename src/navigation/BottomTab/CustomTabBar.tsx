import React from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import { useTheme } from "@themes/ThemeContext";

const ICONS: Record<string, string> = {
  HomeStack: "home",
  Notifications: "bell",
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

  return (
    <SafeAreaView
      style={{
        flexDirection: "row",
        backgroundColor: inactiveBg,
      }}
    >
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const iconName = ICONS[route.name] ?? "question-circle";

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            if (route.name === "ProfileStack") {
              navigation.navigate("ProfileStack", { screen: "Profile" });
            } else {
              navigation.navigate(route.name);
            }
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
