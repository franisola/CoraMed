import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NavigationTab from "@/navigation/BottomTab/NavigationTab";
import DrawerNavigator from "@navigation/DrawerNavigator/DrawerNavigator"

const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="Tabs" component={NavigationTab} headerShown={false} /> */}
      <Stack.Screen name="Drawer" component={DrawerNavigator} />
    </Stack.Navigator>
  );
}
