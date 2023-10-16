import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

export const getDeviceToken = async () => {
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
    measurementId: process.env.REACT_APP_measurementId,
  };

  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") throw new Error("permission denied!");
    const messaging = getMessaging(initializeApp(firebaseConfig));
    const deviceToken = await getToken(messaging, {
      vapidKey: process.env.REACT_APP_VAPIDKEY,
    });
    return deviceToken;
  } catch (error: any) {
    console.log(error);
  }
};
