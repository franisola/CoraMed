// screens/ProfileScreen.js
import React, { useState } from "react";
import { View, Text, Switch, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

import { useAppDispatch } from "@redux/hooks";

import { logoutUser } from "@slices/authSlice";
import { useToast } from "react-native-toast-notifications";


import { useTheme } from "@themes/ThemeContext";

const ProfileScreen = () => {
  const { theme, toggleTheme, isDark } = useTheme();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    dispatch(logoutUser());
  };


  const ProfileItem = ({ iconName, text, onPress }) => (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <View style={styles.itemLeft}>
        <View style={styles.iconContainer}>
          <FontAwesome5 name={iconName} size={25} color={theme.colors.icons} />
        </View>
        <Text style={[styles.itemText, {color: theme.colors.text}]}>{text}</Text>
      </View>
      <FontAwesome5 name="angle-right" size={20} color={theme.colors.icons} />
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ProfileItem iconName="database" text="Mis datos" onPress={() => navigation.navigate("ProfileStack", { screen: "AccountInfo" })} />
      <ProfileItem
        iconName="id-card"
        text="Mi Obra Social"
        onPress={() => navigation.navigate("ProfileStack", { screen: "Insurance" })}
      />
      <ProfileItem iconName="globe" text="Idioma" onPress={() => navigation.navigate("ProfileStack", { screen: "Language" })} />

      {/* Modo oscuro */}
      <View style={styles.item}>
        <View style={styles.itemLeft}>
          <View style={styles.iconContainer}>
            <FontAwesome5 name="moon" size={25} color={theme.colors.icons} />
          </View>
          <Text style={[styles.itemText, {color: theme.colors.text}]}>Modo Oscuro</Text>
        </View>
        <Switch value={isDark} onValueChange={toggleTheme} />
      </View>

      <View style={[styles.separator, {backgroundColor: theme.colors.text}]} />

      <ProfileItem iconName="lock" text="Cerrar Sesión" onPress={handleLogOut} />
      <ProfileItem iconName="trash" text="Borrar Cuenta" onPress={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    width: "80%",
    flexDirection: "row",
    paddingVertical: 25,
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemText: {
    marginLeft: 15,
    lineHeight: 20,
    fontSize: 20,
  },
  separator: {
    width: "80%",
    height: 0.5,
    marginVertical: 20,
  },
  iconContainer: {
    width: 30, // o 32 si algún ícono es muy ancho
    alignItems: "center",
  },
});

export default ProfileScreen;
