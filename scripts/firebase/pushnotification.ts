import Firebase from "@smartface/plugin-firebase";
import Notifications from "@smartface/native/global/notifications";
export let notificationReceiveString = "EMPTY";
export let notificationClick = "EMPTY";
let fcmToken = "";

export function getFcmToken(): string {
  return fcmToken;
}

Notifications.on("notificationReceive", (e) => {
  alert(JSON.stringify(e, null, 4));
  notificationReceiveString = JSON.stringify(e);
  return [
    Notifications.iOS.NotificationPresentationOptions.SOUND,
    Notifications.iOS.NotificationPresentationOptions.ALERT,
  ]; // or []
});

Notifications.on("notificationClick", (e) => {
  notificationClick = JSON.stringify(e);
  alert(JSON.stringify(e, null, 4));
});

Firebase.messaging.subscribeToTopic("all"); //this triggers register for notifications

Firebase.messaging.getToken((e) => {
  alert("FCM Token : " + JSON.stringify(e, null, "\t"));
  fcmToken = e;
});

Notifications.registerForPushNotifications(
  (e: { token: string }): void => {
    alert("Successfully registered. The token is: " + e.token);
    // fcmToken = e.token;
  },
  (): void => {
    alert("Register failed.");
  }
);
