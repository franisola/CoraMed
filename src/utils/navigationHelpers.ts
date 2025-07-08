import { NavigationProp } from "@react-navigation/native";

type NestedNavigateParams = {
  tabName: string;
  stackName: string;
  nestedStackName?: string;  // Opcional, para 4to nivel
  screenName: string;
  params?: object;
};

export function navigateToNestedScreen(
  navigation: NavigationProp<any>,
  tabName: string,
  stackName: string,
  screenOrNestedStackName: string,
  screenOrParams?: string | object,
  paramsMaybe?: object
) {
  // Si pasaron 4 niveles: tab -> stack -> nestedStack -> screen
  if (typeof screenOrParams === "string") {
    navigation.navigate(tabName, {
      screen: stackName,
      params: {
        screen: screenOrNestedStackName,
        params: {
          screen: screenOrParams,
          params: paramsMaybe,
        },
      },
    });
  } else {
    // 3 niveles: tab -> stack -> screen
    navigation.navigate(tabName, {
      screen: stackName,
      params: {
        screen: screenOrNestedStackName,
        params: screenOrParams,
      },
    });
  }
}
