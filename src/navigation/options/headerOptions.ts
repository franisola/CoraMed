import { Dimensions } from "react-native";

export const getDefaultHeaderOptions = (theme) => {
  const screenHeight = Dimensions.get("window").height;
  const headerHeight = screenHeight * 0.12;

  return {
    headerShown: true,
    headerTitleAlign: "center" as const,
    headerTintColor: theme.colors.primary,
    headerStyle: {
      backgroundColor: theme.colors.details,
      height: headerHeight,
    },
    headerTitleStyle: {
      color: theme.colors.text,
    },
    // headerRight: () => <HeaderMenu /> // si querés agregarlo globalmente
  };
};
