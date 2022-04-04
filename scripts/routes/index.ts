import { NativeRouter, NativeStackRouter, Route } from '@smartface/router';
import Application from '@smartface/native/application';
import Page1 from 'pages/page1';
import PageCrashlytics from 'pages/pageCrashlytics';

Application.on('backButtonPressed', () => {
    NativeRouter.getActiveRouter()?.goBack();
});


const router = NativeRouter.of({
    path: "/",
    isRoot: true,
    routes: [
        NativeStackRouter.of({
            path: "/pages",
            routes: [
                Route.of({
                    path: "/pages/page1",
                    build(router, route) {
                        return new Page1(router, route)
                    }
                }),
                Route.of({
                    path: "/pages/crashlytics",
                    build(router, route) {
                        return new PageCrashlytics(router, route)
                    }
                })
            ]
        })
    ]
});

export default router;
