import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

export const getDeviceToken = async () => {
  try {
    const firebaseConfig = {
      apiKey: "AIzaSyCucFTNq-u6rKBs1pdFa8BbwLu9TJMszIk",
      authDomain: "desig-6034e.firebaseapp.com",
      projectId: "desig-6034e",
      storageBucket: "desig-6034e.appspot.com",
      messagingSenderId: "377775905449",
      appId: "1:377775905449:web:89828aae0b5638a360a7b8",
      measurementId: "G-BVRJNF6SWY",
    };

    const permission = await Notification.requestPermission();
    if (permission !== "granted") throw new Error("permission denied!");
    const messaging = getMessaging(initializeApp(firebaseConfig));
    const deviceToken = await getToken(messaging, {
      vapidKey:
        "BOoVFkMylGaLMQyAP0NNgC5SLTu7Q-9UsMN07oTc-MM0G4heXHx_WQntePm4zKy7hPzEmL_X-ZI-DLlrnCWIMPM",
    });

    return deviceToken;
  } catch (error: any) {
    console.log("error", error);
  }
};
