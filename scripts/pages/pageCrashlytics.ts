import Firebase, { Analytics, Crashlytics } from '@smartface/plugin-firebase';
import PageCrashlyticsDesign from 'generated/pages/pageCrashlytics';
import { Route, Router } from '@smartface/router';
import { withDismissAndBackButton } from '@smartface/mixins'

export default class PageCrashlytics extends withDismissAndBackButton(PageCrashlyticsDesign) {
	constructor(private router?: Router, private route?: Route) {
		super({});
	}

    InitCrashlytics() {
        setTimeout(() => Analytics.setCurrentScreen('pageCrashlytics', null), 5);
        const customAttribute = new Firebase.analytics.CustomAttribute('newCustomKey', 'testAnalyticsCustomAttribute')
        setTimeout(() => Firebase.analytics.logEvent('testLogEvent', customAttribute), 5);
        const err = new Error('Test Error Message');
        const stackTrace = err.stack;
        delete err.stack; // Don't show those in direct logs
        stackTrace && Crashlytics.setString('Stack trace' , stackTrace);
        const stringError = typeof err === "object" ? JSON.stringify(err, null, '\t') : err;
        Crashlytics.logError({error: stringError, identifier: 'Exception'});
    }

    onShow() {
        super.onShow();
        this.initBackButton(this.router)
        this.InitCrashlytics();
    }

    onLoad() {
        super.onLoad();
    }
    
}