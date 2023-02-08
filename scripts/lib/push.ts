/* globals requireClass */
import System from '@smartface/native/device/system';
import { Notifications } from '@smartface/native/global';

export const getDeviceToken = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        if (System.isEmulator) {
            return reject();
        }
        pushNotificationsAreEnabled()
            .then(() => {                
                Notifications.registerForPushNotifications(
                    (e: { token: string }) =>  resolve(e.token),
                    () => reject(alert('notificationCanotGetToken'))
                );
            })
            .catch(() => reject(alert('notificationsDisabled')));
    });
};

 const pushNotificationsAreEnabled = () => {
    return new Promise<void>((resolve, reject) => {
        if (System.isEmulator) {
            return reject();
        }
        if (System.OS === System.OSType.IOS) {
            resolve();
        } else {
            //@ts-ignore TODO: FW-1025
            const NativeCompatNoficationManager = requireClass('android.app.NotificationManager');
            const Activity = require('@smartface/native/util/Android/androidconfig').activity;
            const enabled = NativeCompatNoficationManager.from(Activity).areNotificationsEnabled();
            enabled ? resolve() : reject();
        }
    });
};

