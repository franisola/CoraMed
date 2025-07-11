import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useTheme } from "@themes/ThemeContext";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import {
  fetchNotifications,
  deleteNotification,
} from "@slices/notificationSlice";
import { t } from "i18next";

interface NotificationItem {
  _id: string;
  titulo: string;
  mensaje: string;
  leida: boolean;
  tipo: string;
  turno?: {
    _id: string;
    especialidad: string;
    fecha?: string;
    hora?: string;
    profesional:
      | string
      | {
          nombre?: string;
          apellido?: string;
          nombreCompleto?: string;
          name?: string;
        };
  };
}

const NotificationsScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();
  const { theme } = useTheme();
  const { notifications, loading, error } = useAppSelector(
    (state) => state.notification
  );

  // Recarga cada vez que la pantalla recibe foco
  useFocusEffect(
    useCallback(() => {
      dispatch(fetchNotifications());
    }, [dispatch])
  );

  const handleDelete = (id: string) => {
    Alert.alert(
      t("notificationsTxt.deleteNotification"),
      t("notificationsTxt.deleteSure"),
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => dispatch(deleteNotification(id)),
        },
      ]
    );
  };

  const renderIcon = (tipo: string) => {
    const key = tipo.toLowerCase();
    const iconMap: Record<string, string> = {
      turno_agendado: "calendar-outline",
      turno_cancelado: "close-circle-outline",
      resultados_subidos: "document-text-outline",
      recordatorio: "time-outline",
      otro: "notifications-outline",
    };
    return iconMap[key] || iconMap["otro"];
  };

  const getColorByType = (tipo: string) => {
    const type = tipo.toLowerCase();
    if (type === "turno_cancelado") return theme.colors.error;
    if (type === "resultados_subidos") return theme.colors.confirmationColor;
    if (type === "turno_agendado" || type === "recordatorio")
      return theme.colors.primary;
    return theme.colors.greyText;
  };

  const renderItem = ({ item }: { item: NotificationItem }) => {
    const cleanMensaje = item.mensaje;

    let doctorName = "";
    const prof = item.turno?.profesional;
    if (prof) {
      doctorName =
        typeof prof === "string"
          ? prof
          : `${prof.nombre ?? ""} ${prof.apellido ?? ""}`.trim() ||
            prof.nombreCompleto ||
            prof.name ||
            "";
    }

    // Colores temáticos para el borde y los íconos según tipo
    let borderColor;
    let iconColor;
    const type = item.tipo.toLowerCase();
    if (type === "turno_cancelado") {
      borderColor = theme.colors.error;
      iconColor = theme.colors.error;
    } else if (type === "resultados_subidos") {
      borderColor = theme.colors.confirmationColor;
      iconColor = theme.colors.confirmationColor;
    } else if (type === "turno_agendado" || type === "recordatorio") {
      borderColor = theme.dark ? theme.colors.textSecondary : theme.colors.primary;
      iconColor = theme.dark ? theme.colors.textSecondary : theme.colors.primary;
    } else {
      borderColor = theme.colors.greyText;
      iconColor = theme.colors.greyText;
    }

    // Fondo de la card adaptado a dark/light
    const cardBg = theme.dark ? theme.colors.details : theme.colors.white;

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          if (item.turno?._id) {
            const tabNav = navigation.getParent();
            tabNav?.navigate("HomeStack", {
              screen: "ScheduleStack",
              params: {
                screen: "AppointmentDetails",
                params: { id: item.turno._id },
              },
            });
          }
        }}
      >
        <View
          style={[
            styles.card,
            {
              backgroundColor: cardBg,
              borderLeftColor: borderColor,
              borderLeftWidth: 4,
            },
          ]}
        >
          <Ionicons
            name={renderIcon(item.tipo) as any}
            size={24}
            color={iconColor}
            style={styles.icon}
          />
          <View style={styles.content}>
            <Text style={[styles.title, { color: iconColor }]}>
              {item.titulo}
            </Text>
            <Text style={[styles.body, { color: iconColor }]}>
              {cleanMensaje}
            </Text>
            {item.turno && (
              <>
                <Text style={[styles.info, { color: theme.colors.greyText }]}>
                  Especialidad: {item.turno.especialidad}
                </Text>
                {doctorName ? (
                  <Text style={[styles.info, { color: theme.colors.greyText }]}>
                    Doctor: {doctorName}
                  </Text>
                ) : null}
              </>
            )}
          </View>
          <TouchableOpacity
            onPress={() => handleDelete(item._id)}
            style={styles.actionButton}
          >
            <Ionicons
              name="trash-outline"
              size={20}
              color={theme.colors.error}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View
        style={[
          styles.loadingContainer,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={[
          styles.errorContainer,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <Text style={{ color: theme.colors.error }}>{error}</Text>
      </View>
    );
  }

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <FlatList
        data={notifications}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={[styles.emptyText, { color: theme.colors.greyText }]}>
            {t("notificationsTxt.noNotifications")}
          </Text>
        }
      />
    </View>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: 8 },
  card: {
    flexDirection: "row",
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 4,
    borderRadius: 8,
    elevation: 1,
  },
  icon: { marginRight: 12, alignSelf: "center" },
  content: { flex: 1 },
  title: { fontSize: 16, fontWeight: "600", marginBottom: 4 },
  body: { fontSize: 14, marginBottom: 4 },
  info: { fontSize: 14, marginBottom: 2 },
  actionButton: { justifyContent: "center", paddingHorizontal: 8 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { textAlign: "center", marginTop: 40 },
});
