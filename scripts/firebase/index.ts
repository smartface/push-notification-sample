import System from "@smartface/native/device/system";
import File from "@smartface/native/io/file";
import Firebase, { Crashlytics } from "@smartface/plugin-firebase";
import Path from "@smartface/native/io/path";
import Invocation from "@smartface/native/util/iOS/invocation.js";

const config = System.OS === System.OSType.IOS && {
  iosFile: new File({
    path: `${Path.AssetsUriScheme}GoogleService-Info.plist`,
  }),
};

/**
 * WORKAROUND: SUPDEV-2372
 * Removes clipboard entry on first app open to prevent alert showing up
 */

if (System.OS === "iOS") {
  const arg1 = new Invocation.Argument({
    type: "NSString",
    value: "",
  });

  const arg2 = new Invocation.Argument({
    type: "NSString",
    value: "com.apple.UIKit.pboard.general",
  });
  Invocation.invokeInstanceMethod(
    global.__SF_UIPasteboard.generalPasteboard(),
    "setValue:forPasteboardType:",
    [arg1, arg2]
  );
}

if (Firebase.apps().length === 0) {
  const firebaseApp = Firebase.initializeApp(config);
  const auth = firebaseApp.auth();
  auth?.createUserWithEmailAndPassword(
    "test@testmail.com",
    "testPass123!.",
    () => {}
  );
  const user = auth?.getCurrentUser();
  console.log("User's Email", user?.getEmail());
  Crashlytics.ios.with([new Crashlytics()]);
}

import "./pushnotification";
