import Page1Design from "generated/pages/page1";
import Share from "@smartface/native/global/share";
import { Route, Router } from "@smartface/router";

import * as PushNotification from "firebase/pushnotification";

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

  onShow() {
    super.onShow();
  }

  onLoad() {
    super.onLoad();
  }
}
