import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NavigationTab from "@navigation/TabNavigation/NavigationTab";

const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={NavigationTab}
        options={{ headerShown: false, headerTitle: "App" }}
      />
    </Stack.Navigator>
  );
}
