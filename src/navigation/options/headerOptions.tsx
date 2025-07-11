import React from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@themes/ThemeContext";

export const getDefaultHeaderOptions = (theme: any) => {
  const screenHeight = Dimensions.get("window").height;
  const headerHeight = screenHeight * 0.18;
  const { isDark } = useTheme();

  return ({ navigation }: { navigation: any }) => ({
    headerShown: true,
    headerTitleAlign: "center",
    headerTintColor: theme.colors.primary,
    headerStyle: {
      backgroundColor: theme.colors.details,
      height: headerHeight,
    },
    headerTitleStyle: {
      color: theme.colors.text,
      fontSize: 18,
      textAlign: "center",
      flexWrap: "wrap",
    },
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => {
          const parent = navigation.getParent?.();
          if (parent && parent.openDrawer) {
            parent.openDrawer();
          }
        }}
        style={{
          marginLeft: 15,
          width: 40,
          height: 40,
          justifyContent: "center",
          alignItems: "center",
        }}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Ionicons
          name="menu-outline"
          size={28}
          color={theme.colors.icons}
        />
      </TouchableOpacity>
    ),
  });
};
