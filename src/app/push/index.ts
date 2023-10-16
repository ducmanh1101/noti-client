import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { firebaseConfig } from "../../constants";

export const getDeviceToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") throw new Error("permission denied!");
    const messaging = getMessaging(initializeApp(firebaseConfig));
    const deviceToken = await getToken(messaging, {
      vapidKey:
        "BBKxJZRRYndX-cfcZhPMO25T0MpslNC4Ndwsy5wUx3tjYMIhqNoqQo8cAo8DsHgKC1VP2x6eXwzJ8bzVYtVOpPA",
    });
    return deviceToken;
  } catch (error: any) {
    console.log(error);
  }
};
