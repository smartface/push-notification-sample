import Page1Design from 'generated/pages/page1';

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
		this.lblFcmToken.text = `Fcm Token : ${PushNotification.getFcmToken()}`;
		this.lblFirebaseToken.text = `Firebase Token : ${PushNotification.getFirebaseToken()}`;
	}
}

function onShow(superOnShow: () => void) {
	superOnShow();

}


function onLoad(superOnLoad: () => void) {
	superOnLoad();
}
