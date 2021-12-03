import buildExtender from "@smartface/extension-utils/lib/router/buildExtender";
import {
    NativeRouter as Router,
    NativeStackRouter as StackRouter,
    Route
} from "@smartface/router";
import "@smartface/extension-utils/lib/router/goBack"; // Implements onBackButtonPressed

const router = Router.of({
    path: "/",
    isRoot: true,
    routes: [
        StackRouter.of({
            path: "/pages",
            routes: [
                Route.of({
                    path: "/pages/page1",
                    build: buildExtender({ 
                        getPageClass: () => require("pages/page1").default, 
                        headerBarStyle: { visible: true } 
                    })
                }),
                Route.of({
                    path: "/pages/page2",
                    build: buildExtender({ 
                        getPageClass: () => require("pages/page2").default, 
                        headerBarStyle: { visible: true } 
                    })
                }),
            ]
        })
    ]
});

export default router;
