import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Home from "@screens/Home";
// import ProfileStack from "@/navigation/StackNavigation/ProfileStack";
import Notifications from "@screens/Notifications";

const Drawer = createDrawerNavigator();

export default function AppDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,  // O true si querés header propio
        drawerActiveTintColor: "#e91e63",
        drawerLabelStyle: { fontSize: 16 },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{ title: "Inicio" }}
      />
      <Drawer.Screen
        name="Notifications"
        component={Notifications}
        options={{ title: "Notificaciones" }}
      />
      {/* <Drawer.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{ title: "Perfil" }}
      /> */}
    </Drawer.Navigator>
  );
}
