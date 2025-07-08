import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { useTheme } from "@themes/ThemeContext";
import { useAppDispatch } from "@redux/hooks";
import { logoutUser } from "@slices/authSlice";
import { navigateToNestedScreen } from "@/utils/navigationHelpers";
import { useTranslation } from "react-i18next";

type MenuItem = {
  label: string;
  type: "simple" | "nested" | "action";
  screen?: string;
  tab?: string;
  stack?: string;
  params?: object;
  nestedStack?: string;
  action?: () => void;
};

const CustomDrawerContent = ({ navigation }: DrawerContentComponentProps) => {
  const { theme, toggleTheme } = useTheme();
  const dispatch = useAppDispatch();
  const { t } = useTranslation(); 

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
          text: "Cerrar sesión",
          onPress: () => dispatch(logoutUser()),
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  const menuSections: { title: string; items: MenuItem[] }[] = [
    {
      title: t("menuTxt.acc"),
      items: [
        {
          label: "Home",
          type: "nested",
          tab: "Tabs",
          stack: "HomeStack",
          screen: "Home",
        },
        {
          label: t("menuTxt.myProfile"),
          type: "nested",
          tab: "Tabs",
          stack: "ProfileStack",
          screen: "Profile",
        },
        {
          label: t("menuTxt.myData"),
          type: "nested",
          tab: "Tabs",
          stack: "ProfileStack",
          screen: "PersonalInfo",
        },
        {
          label: t("menuTxt.myHealthInsurance"),
          type: "nested",
          tab: "Tabs",
          stack: "AccountInfo",
          screen: "Insurance",
        },
      ],
    },
    {
      title: t("menuTxt.appointments"),
      items: [
        {
          label: t("menuTxt.myAppointments"),
          type: "nested",
          tab: "Tabs",
          stack: "HomeStack",
          nestedStack: "ScheduleStack",
          screen: "MyAppointments",
        },
        {
          label: t("menuTxt.newAppointment"),
          type: "nested",
          tab: "Tabs",
          stack: "HomeStack",
          nestedStack: "BookStack",
          screen: "SelectSpecialty",
        },
      ],
    },
    {
      title: t("menuTxt.preferences"),
      items: [
        {
          label: t("menuTxt.language"),
          type: "nested",
          tab: "Tabs",
          stack: "ProfileStack",
          screen: "Language",
        },
        {
          label: theme.dark ? t("menuTxt.lightMode") : t("menuTxt.darkMode"),
          type: "action",
          action: toggleTheme,
        },
      ],
    },
    {
      title: t("menuTxt.notifications"),
      items: [
        {
          label: t("menuTxt.myNotifications"),
          type: "nested",
          tab: "Tabs",
          stack: "NotificationsStack",
          screen: "Notifications",
        },
      ],
    },
  ];

  const logoutItem: MenuItem = {
    label: t("menuTxt.logOut"),
    type: "action",
    action: confirmLogout,
  };

  const handlePress = (item: MenuItem) => {
    navigation.closeDrawer();

    if (item.type === "action" && item.action) {
      item.action();
      return;
    }

    if (item.type === "simple" && item.screen) {
      navigation.navigate(item.screen);
    } else if (item.type === "nested" && item.tab && item.stack && item.screen) {
      if (item.nestedStack) {
        navigateToNestedScreen(
          navigation,
          item.tab,
          item.stack,
          item.nestedStack,
          item.screen,
          item.params
        );
      } else {
        navigation.navigate(item.tab, {
          screen: item.stack,
          params: {
            screen: item.screen,
            params: item.params,
          },
        });
      }
    } else {
      console.warn("Datos incompletos para navegar", item);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.primary }]}>
      {menuSections.map((section, sectionIndex) => (
        <View key={sectionIndex}>
          {section.title ? (
            <Text style={[styles.sectionTitle, { color: theme.colors.white }]}>
              {section.title}
            </Text>
          ) : null}

          {section.items.map((item, index) => (
            <View key={index}>
              <TouchableOpacity
                style={styles.item}
                onPress={() => handlePress(item)}
                activeOpacity={0.7}
              >
                <Text style={[styles.label, { color: theme.colors.white }]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
              <View style={[styles.separator, { backgroundColor: theme.colors.white }]} />
            </View>
          ))}
        </View>
      ))}

      {/* Cerrar sesión separado */}
      <View style={styles.logoutSection}>
        <TouchableOpacity
          style={styles.item}
          onPress={() => handlePress(logoutItem)}
          activeOpacity={0.7}
        >
          <Text style={[styles.label, { color: theme.colors.white }]}>
            {logoutItem.label}
          </Text>
        </TouchableOpacity>
        <View style={[styles.separator, { backgroundColor: theme.colors.white }]} />
      </View>
    </SafeAreaView>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 8,
    opacity: 0.7,
  },
  item: {
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
  },
  separator: {
    height: 1,
    marginHorizontal: 20,
    opacity: 0.2,
  },
  logoutSection: {
    marginTop: 40,
  },
});
