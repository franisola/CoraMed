import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import API from "@api/index";

export const fetchNotifications = async () => {
  const response = await API.get("/notifications");
  return response.data;
};

export const markNotificationAsRead = async (notificationId: string) => {
  const response = await API.patch(`/notifications/${notificationId}/read`);
  return response.data;
};

export const deleteNotification = async (notificationId: string) => {
  const response = await API.delete(`/notifications/${notificationId}`);
  return response.data;
};

export const clearReadNotifications = async () => {
  const response = await API.delete("/notifications/clear-read");
  return response.data;
};
