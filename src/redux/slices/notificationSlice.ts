import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchNotifications as fetchNotificationsAPI,
  markNotificationAsRead as markNotificationAsReadAPI,
  deleteNotification as deleteNotificationAPI,
  clearReadNotifications as clearReadNotificationsAPI,
} from "@api/notifications";

interface Notification {
  _id: string;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
}

interface NotificationState {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
}

const initialState: NotificationState = {
  notifications: [],
  loading: false,
  error: null,
};

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchNotificationsAPI();
      console.log("API notifications payload:", res);
      // Si res ya es un array, úsalo directamente; si viene bajo res.notifications, úsalo
      const notifications = Array.isArray(res)
        ? res
        : res.notifications;
      return notifications;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Error al obtener notificaciones"
      );
    }
  }
);


export const markNotificationAsRead = createAsyncThunk(
  "notifications/markAsRead",
  async (notificationId: string, { rejectWithValue }) => {
    try {
      await markNotificationAsReadAPI(notificationId);
      return notificationId;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Error al marcar como leída"
      );
    }
  }
);

export const deleteNotification = createAsyncThunk(
  "notifications/delete",
  async (notificationId: string, { rejectWithValue }) => {
    try {
      await deleteNotificationAPI(notificationId);
      return notificationId;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Error al eliminar notificación"
      );
    }
  }
);

export const clearReadNotifications = createAsyncThunk(
  "notifications/clearRead",
  async (_, { rejectWithValue }) => {
    try {
      await clearReadNotificationsAPI();
      return;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Error al limpiar notificaciones"
      );
    }
  }
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        const noti = state.notifications.find((n) => n._id === action.payload);
        if (noti) noti.read = true;
      })
      .addCase(deleteNotification.fulfilled, (state, action) => {
        state.notifications = state.notifications.filter(
          (n) => n._id !== action.payload
        );
      })
      .addCase(clearReadNotifications.fulfilled, (state) => {
        state.notifications = state.notifications.filter((n) => !n.read);
      });
  },
});

export default notificationSlice.reducer;
