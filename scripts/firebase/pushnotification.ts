import Application from "sf-core/application";
import Firebase from 'sf-plugin-firebase';
import Notifications from 'sf-core/global/notifications';

let firebaseToken = '';
let fcmToken = '';

export function getFirebaseToken(): string {
	return firebaseToken;
}

export function getFcmToken(): string {
	return fcmToken;
}

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
			alert("FCM Token : " + JSON.stringify(e, null, '\t'));
			fcmToken = e;
		})
		//@ts-ignore
		alert("Successfully registered. The token is: " + e.token);
		firebaseToken = e.token;
	},
	(): void => {
		alert("Register failed.");
	});