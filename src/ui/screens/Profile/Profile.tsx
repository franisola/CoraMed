// screens/ProfileScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  Switch,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { useAppDispatch } from "@redux/hooks";

import { logoutUser, deleteAccount } from "@slices/authSlice";
import { useToast } from "react-native-toast-notifications";

import { useTheme } from "@themes/ThemeContext";
import { useTranslation } from "react-i18next";

const ProfileScreen = () => {
  const { theme, toggleTheme, isDark } = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const confirmLogout = () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Está seguro que desea cerrar sesión?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Cerrar Sesión",
          onPress: () => dispatch(logoutUser()),
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  const confirmDeleteAccount = () => {
    Alert.alert(
      "Borrar Cuenta",
      "Esta acción eliminará su cuenta y todos sus datos.\n¿Está seguro que desea continuar?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Borrar Cuenta",
          style: "destructive",
          onPress: async () => {
            try {
              await dispatch(deleteAccount()).unwrap();
              dispatch(logoutUser()); // limpia token y navegación
            } catch (err: any) {
              toast.show(
                err?.error || "Ocurrió un error al eliminar la cuenta",
                { type: "danger" }
              );
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const ProfileItem = ({ iconName, text, onPress }) => (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <View style={styles.itemLeft}>
        <View style={styles.iconContainer}>
          <FontAwesome5 name={iconName} size={25} color={theme.colors.icons} />
        </View>
        <Text style={[styles.itemText, { color: theme.colors.text }]}>
          {text}
        </Text>
      </View>
      <FontAwesome5 name="angle-right" size={20} color={theme.colors.icons} />
    </TouchableOpacity>
  );

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ProfileItem
        iconName="database"
        text={t("settings.data")}
        onPress={() =>
          navigation.navigate("ProfileStack", { screen: "AccountInfo" })
        }
      />
      <ProfileItem
        iconName="id-card"
        text={t("settings.myHealthInsurance")}
        onPress={() =>
          navigation.navigate("ProfileStack", { screen: "Insurance" })
        }
      />
      <ProfileItem
        iconName="globe"
        text={t("settings.language")}
        onPress={() =>
          navigation.navigate("ProfileStack", { screen: "Language" })
        }
      />

      {/* Modo oscuro */}
      <View style={styles.item}>
        <View style={styles.itemLeft}>
          <View style={styles.iconContainer}>
            <FontAwesome5 name="moon" size={25} color={theme.colors.icons} />
          </View>
          <Text style={[styles.itemText, { color: theme.colors.text }]}>
            {t("settings.darkMode")}
          </Text>
        </View>
        <Switch value={isDark} onValueChange={toggleTheme} />
      </View>

      <View
        style={[styles.separator, { backgroundColor: theme.colors.text }]}
      />

      <ProfileItem
        iconName="lock"
        text={t("settings.logOut")}
        onPress={confirmLogout}
      />
      <ProfileItem
        iconName="trash"
        text={t("settings.deleteAccount")}
        onPress={confirmDeleteAccount}
      />
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
    lineHeight: 24,
    fontSize: 20,
    flexShrink: 1,
  },
  separator: {
    width: "80%",
    height: 0.5,
    marginVertical: 20,
  },
  iconContainer: {
    width: 30,
    alignItems: "center",
  },
});

export default ProfileScreen;
