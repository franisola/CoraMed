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
  const { theme, isDark } = useTheme();
  const { t } = useTranslation();

  // Colores según modo
  const tabContainerBg = isDark ? theme.colors.background : theme.colors.primary;
  // En dark mode, invertimos los colores de los tabs
  const tabActiveBg = isDark ? theme.colors.background : theme.colors.primary;
  const tabInactiveBg = isDark ? theme.colors.details : theme.colors.details;
  const tabActiveText = isDark ? theme.colors.text : theme.colors.textSecondary;
  const tabInactiveText = isDark ? theme.colors.textSecondary : theme.colors.text;

  return (
    <View style={[styles.tabContainer, { backgroundColor: tabContainerBg }]}> 
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[ 
            styles.tab,
            {
              backgroundColor:
                activeTab === tab ? tabActiveBg : tabInactiveBg,
            },
          ]}
          onPress={() => !disableSwitching && setActiveTab(tab)}
          disabled={disableSwitching}
        >
          <Text
            style={{
              color: activeTab === tab ? tabActiveText : tabInactiveText,
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