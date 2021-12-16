import Firebase, { Analytics, Crashlytics } from '@smartface/plugin-firebase';
import PageCrashlyticsDesign from 'generated/pages/pageCrashlytics';
export default class PageCrashlytics extends PageCrashlyticsDesign {
	constructor() {
		super();
		// Overrides super.onShow method
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		// Overrides super.onLoad method
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
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
}

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(this: PageCrashlytics, superOnShow: () => void) {
	superOnShow();
    this.InitCrashlytics();
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(this: PageCrashlytics, superOnLoad: () => void) {
	superOnLoad();
}
