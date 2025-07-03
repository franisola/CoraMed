
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import API from "@api/index"; 


export const registerPushToken = async () => {
  try {
    if (!Device.isDevice) return;

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") return;

    const tokenData = await Notifications.getExpoPushTokenAsync();
    const expoPushToken = tokenData.data;

    await API.post("/user/push-token", { token: expoPushToken });
  } catch (error) {
    console.error("Error al registrar push token:", error);
  }
};


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
