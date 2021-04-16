import Application from "sf-core/application";
import Firebase from 'sf-plugin-firebase';
import Notifications from 'sf-core/global/notifications';

Notifications.onNotificationReceive = (e) => {
    const alertMessage = {
        'onNotificationReceive': e
    }
    alert(JSON.stringify(e, null, 4));
    return [Notifications.iOS.NotificationPresentationOptions.SOUND, Notifications.iOS.NotificationPresentationOptions.ALERT]; // or []
};

Firebase.messaging.subscribeToTopic("all"); //this triggers register for notifications

Notifications.registerForPushNotifications(
    //@ts-ignore
    (e: { token: string }): void => {
        //@ts-ignore
        Firebase.messaging.getToken((e) => {
            alert("Firebase Token : " + JSON.stringify(e, null, '\t'));
        })
        //@ts-ignore
        alert("FCM Token : " + JSON.stringify(Firebase.messaging.ios.native.FCMToken(), null, '\t'))
        alert("Successfully registered. The token is: " + e.token);
    },
    (): void => {
        alert("Register failed.");
    });