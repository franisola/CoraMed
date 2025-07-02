import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import API from "@api/index"; // Tu instancia de axios con token automático

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

    // 👉 Enviamos solo el token. El user lo identifica el backend por el JWT ya agregado automáticamente por Axios
    await API.post("/user/push-token", {
      token: expoPushToken,
    });
  } catch (error) {
    console.error("Error al registrar push token:", error);
  }
};
