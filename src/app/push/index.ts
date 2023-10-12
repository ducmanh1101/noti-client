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
        "BEZcQJ9SJXvyJsEudUoQ6Un6JAay37bJJbTAfeSGXErN2xPGJPyLfzP8SgymNvDaqrvN94aFc4TIKvdILpE4xIg",
    });
    return deviceToken;
  } catch (error: any) {
    console.log(error);
  }
};
