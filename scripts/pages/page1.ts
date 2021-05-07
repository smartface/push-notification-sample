import Page1Design from 'generated/pages/page1';
import Share from 'sf-core/global/share';

import * as PushNotification from 'firebase/pushnotification';

export default class Page1 extends Page1Design {
	router: any;
	constructor() {
		super();
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
		this.btnGetTokens.onPress = () => this.initLabels();
	}

	initLabels() {
		const fcmToken = PushNotification.getFcmToken();
		const firebaseToken = PushNotification.getFirebaseToken();
		this.lblFcmToken.onTouchEnded = () => Share.share({
			page: this,
			items: [fcmToken],
			blacklist: []
		});
		this.lblFirebaseToken.onTouchEnded = () => Share.share({
			page: this,
			items: [firebaseToken],
			blacklist: []
		});
		this.lblFcmToken.text = `Fcm Token : ${fcmToken}`;
		this.lblFirebaseToken.text = `Firebase Token : ${firebaseToken}`;
	}
}

function onShow(superOnShow: () => void) {
	superOnShow();

}


function onLoad(superOnLoad: () => void) {
	superOnLoad();
}
