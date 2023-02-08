import Page1Design from "generated/pages/page1";
import Share from "@smartface/native/global/share";
import { Route, Router } from "@smartface/router";

import * as PushNotification from "firebase/pushnotification";
import System from "@smartface/native/device/system";
import Application from '@smartface/native/application';
import { PermissionResult, Permissions } from '@smartface/native/device/permission/permission';
import Permission from "@smartface/native/device/permission";
import Screen from "@smartface/native/device/screen";

const isAndroid = System.OS === System.OSType.ANDROID;

export default class Page1 extends Page1Design {
    fcmToken: string;
    constructor(private router?: Router, private route?: Route) {
        super({});
        this.btnGetTokens.onPress = () => this.initLabels();
        this.btnGoCrashlytics.onPress = () => this.router.push("crashlytics");
        this.tvFcmToken.on("touch", () =>
            Share.share({
                page: this,
                items: [this.fcmToken],
                blacklist: [],
            })
        );
        this.button1.on('press',()=>{
            this.lblShareInfo.text = Screen.height.toString();
        })
        this.button2.on('press',()=>{
            this.lblShareInfo.text = Screen.width.toString();
        })
        this.btnGetInfo.on("press", () => {
            this.lblNotificationClick.text = PushNotification.notificationClick;
            this.lblNotificationReceive.text =
                PushNotification.notificationReceiveString;
        });
    }

    initLabels() {
        this.fcmToken = PushNotification.getFcmToken();
        this.tvFcmToken.text = `Fcm or Firebase Token : ${this.fcmToken}`;
    }
    async requestPermissionForAndroid() {
        const doesHavePermission = Permission.android.checkPermission(Permissions.ANDROID.POST_NOTIFICATIONS);
        if (!doesHavePermission) {
            const result = await Permission.android.requestPermissions(Permissions.ANDROID.POST_NOTIFICATIONS);
        }
    }
    onShow() {
        super.onShow();
        if (isAndroid) {
            this.requestPermissionForAndroid();
        }
    }

    onLoad() {
        super.onLoad();
    }
}
