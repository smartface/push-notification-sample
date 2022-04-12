import Page1Design from 'generated/pages/page1';
import Share from '@smartface/native/global/share';

import * as PushNotification from 'firebase/pushnotification';

export default class Page1 extends Page1Design {
	router: any;
	constructor() {
		super();
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
		this.btnGetTokens.onPress = () => this.initLabels();
        this.btnGoCrashlytics.onPress = () => this.router.push('crashlytics')
	}

	initLabels() {
		const fcmToken = PushNotification.getFcmToken();
		this.lblFcmToken.onTouchEnded = () => Share.share({
			page: this,
			items: [fcmToken],
			blacklist: []
		});
		this.lblFcmToken.text = `Fcm or Firebase Token : ${fcmToken}`;
	}
}

function onShow(superOnShow: () => void) {
	superOnShow();

}


function onLoad(superOnLoad: () => void) {
	superOnLoad();
}
