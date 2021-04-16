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
        alert("Successfully registered. The token is: " + e.token);
    },
    (): void => {
        alert("Register failed.");
    });