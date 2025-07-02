import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "@themes/ThemeContext";
import { useTranslation } from "react-i18next";

interface TabsProps {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  disableSwitching?: boolean;
  labelMap?: Record<string, string>; // Mapeo opcional si querés mostrar texto personalizado
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  setActiveTab,
  disableSwitching = false,
  labelMap = {},
}) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <View style={[styles.tabContainer, { backgroundColor: theme.colors.primary }]}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[
            styles.tab,
            {
              backgroundColor:
                activeTab === tab ? theme.colors.primary : theme.colors.details,
            },
          ]}
          onPress={() => !disableSwitching && setActiveTab(tab)}
          disabled={disableSwitching}
        >
          <Text
            style={{
              color: activeTab === tab ? theme.colors.textSecondary : theme.colors.text,
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            {labelMap[tab] || t(`screenTitles.subtitle${capitalize(tab)}`)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

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

export default Tabs;