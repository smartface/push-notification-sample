import System from 'sf-core/device/system';
import File from 'sf-core/io/file';

import Crashlytics from 'sf-plugin-firebase/fabric/crashlytics';
import Fabric from 'sf-plugin-firebase/fabric';
import Answers from 'sf-plugin-firebase/fabric/answers';
import Firebase from 'sf-plugin-firebase';

const config = System.OS === "iOS" && {
    iosFile: new File({
        path: 'assets://GoogleService-Info.plist'
    })
};

/**
 * WORKAROUND: SUPDEV-2372
 * Removes clipboard entry on first app open to prevent alert showing up
 */
if (System.OS === 'iOS') {
    const Invocation = require('sf-core/util/iOS/invocation.js');
    const arg1 = new Invocation.Argument({
        type: "NSString",
        value: ""
    });
    const arg2 = new Invocation.Argument({
        type: "NSString",
        value: "com.apple.UIKit.pboard.general"
    });
    Invocation.invokeInstanceMethod(global.__SF_UIPasteboard.generalPasteboard(), "setValue:forPasteboardType:", [arg1, arg2]);
}

if (Firebase.apps().length === 0) {
    Firebase.initializeApp(config);
    Fabric.with([new Crashlytics(), new Answers()]);
}

import './pushnotification';