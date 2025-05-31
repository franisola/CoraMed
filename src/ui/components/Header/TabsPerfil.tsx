// @components/Tabs/TabsPerfil.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "@themes/ThemeContext";
import { useTranslation } from "react-i18next";



const TabsPerfil = ({ activeTab, setActiveTab, disableSwitching = false }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  return (
    <View style={[styles.tabContainer, { backgroundColor: theme.colors.primary }]}>
      {["personal", "cuenta"].map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[
            styles.tab,
            {
              backgroundColor:
                activeTab === tab ? theme.colors.details : theme.colors.primary,
            },
          ]}
          onPress={() => {
            if (!disableSwitching) setActiveTab(tab);
          }}
          disabled={disableSwitching}
        >
          <Text
            style={{
              color:
                activeTab === tab ? theme.colors.text : theme.colors.textSecondary,
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            {tab === "personal" ? t("screenTitles.subtitlePersonal") : t("screenTitles.subtitleAccount") }
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    height: 50,
  },
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TabsPerfil;
