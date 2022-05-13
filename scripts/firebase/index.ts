import System from "@smartface/native/device/system";
import File from "@smartface/native/io/file";
import Firebase, { Crashlytics } from "@smartface/plugin-firebase";
import Path from "@smartface/native/io/path";

try {
  const config = System.OS === System.OSType.IOS && {
    iosFile: new File({
      path: `${Path.AssetsUriScheme}GoogleService-Info.plist`,
    }),
  };

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
} catch (error) {
  alert(error.message, { stack: error.stack });
}

import "./pushnotification";
