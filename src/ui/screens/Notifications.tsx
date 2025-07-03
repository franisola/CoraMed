import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@themes/ThemeContext';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import {
  fetchNotifications,
  markNotificationAsRead,
  deleteNotification,
  clearReadNotifications,
} from '@slices/notificationSlice';

interface NotificationItem {
  _id: string;
  titulo: string;
  mensaje: string;
  leida: boolean;
  createdAt: string;
  tipo: string;
  turno?: { _id: string };
}

const NotificationsScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();
  const { theme } = useTheme();
  const { notifications, loading, error } = useAppSelector(
    state => state.notification
  );

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const handleMarkAsRead = (id: string) => dispatch(markNotificationAsRead(id));

  const handleDelete = (id: string) => {
    Alert.alert(
      'Eliminar notificación',
      '¿Estás seguro de que quieres eliminar esta notificación?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => dispatch(deleteNotification(id)) },
      ]
    );
  };

  const handleClearRead = () => dispatch(clearReadNotifications());

  const renderIcon = (tipo: string, leida: boolean) => {
    const iconMap: Record<string, string> = {
      recordatorio: 'time-outline',
      cancelado: 'close-circle-outline',
      resultado: 'document-text-outline',
      agendado: 'calendar-outline',
    };
    const name = iconMap[tipo] || 'notifications-outline';
    return (
      <Ionicons
        name={name as any}
        size={24}
        color={leida ? theme.colors.greyText : theme.colors.icons}
        style={styles.icon}
      />
    );
  };

  const renderItem = ({ item }: { item: NotificationItem }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        if (item.turno?._id) {
          const tabNav = navigation.getParent();
          tabNav?.navigate('HomeStack', {
            screen: 'ScheduleStack',
            params: {
              screen: 'AppointmentDetails',
              params: { id: item.turno._id },
            },
          });
        }
      }}
    >
      <View
        style={[
          styles.card,
          { backgroundColor: theme.colors.white },
          !item.leida && { borderLeftColor: theme.colors.primary, borderLeftWidth: 4 },
        ]}
      >
        {renderIcon(item.tipo, item.leida)}
        <View style={styles.content}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            {item.titulo}
          </Text>
          <Text style={[styles.body, { color: theme.colors.greyText }]}>
            {item.mensaje}
          </Text>
          <Text style={[styles.date, { color: theme.colors.greyText }]}>
            {new Date(item.createdAt).toLocaleString()}
          </Text>
        </View>
        <View style={styles.actions}>
          {!item.leida && (
            <TouchableOpacity
              onPress={() => handleMarkAsRead(item._id)}
              style={styles.actionButton}
            >
              <Ionicons
                name="checkmark-done-outline"
                size={20}
                color={theme.colors.primary}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => handleDelete(item._id)}
            style={styles.actionButton}
          >
            <Ionicons name="trash-outline" size={20} color={theme.colors.error} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background }]}>  
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.errorContainer, { backgroundColor: theme.colors.background }]}>  
        <Text style={{ color: theme.colors.error }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>  
      <View style={[styles.header, { backgroundColor: theme.colors.details }]}>  
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Notificaciones</Text>
        <TouchableOpacity onPress={handleClearRead}>
          <Text style={[styles.clearText, { color: theme.colors.primary }]}>Limpiar leídas</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={notifications}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={[styles.emptyText, { color: theme.colors.greyText }]}>No tienes notificaciones</Text>
        }
      />
    </View>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: { fontSize: 18, fontWeight: '600' },
  clearText: { fontWeight: '500' },
  list: { padding: 8 },
  card: {
    flexDirection: 'row',
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 4,
    borderRadius: 8,
    elevation: 1,
    borderLeftWidth: 4,
  },
  icon: { marginRight: 12, alignSelf: 'center' },
  content: { flex: 1 },
  title: { fontSize: 16, fontWeight: '600' },
  body: { fontSize: 14, marginVertical: 4 },
  date: { fontSize: 12 },
  actions: { flexDirection: 'row', alignItems: 'center' },
  actionButton: { marginLeft: 12 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { textAlign: 'center', marginTop: 40 },
});
