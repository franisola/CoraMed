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

  // Simplified menu definition with correct typing
  type BaseMenuItem = {
    section: string;
    label: string;
    stack?: string;
    screen?: string;
    nestedStack?: string;
  };

  const baseMenu: BaseMenuItem[] = [
    { section: "acc", label: "Home", stack: "HomeStack", screen: "Home" },
    {
      section: "acc",
      label: "myProfile",
      stack: "ProfileStack",
      screen: "Profile",
    },
    {
      section: "acc",
      label: "myData",
      stack: "ProfileStack",
      screen: "AccountInfo",
    },
    {
      section: "acc",
      label: "myHealthInsurance",
      stack: "ProfileStack",
      screen: "Insurance",
    },
    {
      section: "appointments",
      label: "myAppointments",
      stack: "HomeStack",
      nestedStack: "ScheduleStack",
      screen: "MyAppointments",
    },
    {
      section: "appointments",
      label: "newAppointment",
      stack: "HomeStack",
      nestedStack: "BookStack",
      screen: "SelectSpecialty",
    },
    {
      section: "preferences",
      label: "language",
      stack: "ProfileStack",
      screen: "Language",
    },
    {
      section: "notifications",
      label: "myNotifications",
      stack: "NotificationsStack",
      screen: "Notifications",
    },
  ];

  const menuSections: { title: string; items: MenuItem[] }[] = [
    "acc",
    "appointments",
    "preferences",
    "notifications",
  ].map((section) => {
    let items: MenuItem[] = baseMenu
      .filter((item) => item.section === section)
      .map((item) => ({
        label:
          item.label === "Home"
            ? "Home"
            : t(`menuTxt.${item.label}`) || item.label,
        type: "nested" as const,
        tab: "Tabs",
        stack: item.stack,
        screen: item.screen,
        ...(item.nestedStack ? { nestedStack: item.nestedStack } : {}),
      }));
    // Add theme toggle to preferences
    if (section === "preferences") {
      items.push({
        label: theme.dark ? t("menuTxt.lightMode") : t("menuTxt.darkMode"),
        type: "action",
        action: toggleTheme,
      });
    }
    return {
      title: t(`menuTxt.${section}`),
      items,
    };
  });

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
    } else if (
      item.type === "nested" &&
      item.tab &&
      item.stack &&
      item.screen
    ) {
      if (item.stack === "ProfileStack" && item.screen !== "Profile") {
        // Si navega a un screen secundario de perfil, forzar reset del stack
        navigation.navigate(item.tab, {
          screen: item.stack,
          params: {
            screen: item.screen,
            params: item.params,
          },
        });
      } else if (item.nestedStack) {
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
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.primary }]}
    >
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
              <View
                style={[
                  styles.separator,
                  { backgroundColor: theme.colors.white },
                ]}
              />
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
        <View
          style={[styles.separator, { backgroundColor: theme.colors.white }]}
        />
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
