import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import NavigationTab from "@/navigation/BottomTab/NavigationTab";
import CustomDrawerContent from "./CustomDrawerContent"; // este lo creamos abajo

const Drawer = createDrawerNavigator();

export default function AppDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: "front",
        overlayColor: "transparent",
        drawerStyle: {
          backgroundColor: "#D1DEF2", 
          width: 220, 
        },
      }}
    >
      <Drawer.Screen name="Tabs" component={NavigationTab} />
    </Drawer.Navigator>
  );
}