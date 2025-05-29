import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from '@screens/Home';
import ProfileScreen from '@screens/Profile/Profile';


const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Inicio"
      screenOptions={{
        headerShown: true,
        drawerActiveTintColor: '#007AFF',
        drawerInactiveTintColor: '#555',
        drawerStyle: {
          backgroundColor: '#E0EBFF',
        },
      }}
    >
      <Drawer.Screen name="Inicio" component={HomeScreen} />
      <Drawer.Screen name="Mi perfil" component={ProfileScreen} />

    </Drawer.Navigator>
  );
}
