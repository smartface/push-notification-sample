import Page1Design from 'generated/pages/page1';
import componentContextPatch from "@smartface/contx/lib/smartface/componentContextPatch";
import PageTitleLayout from "components/PageTitleLayout";
import System from "sf-core/device/system";

export default class Page1 extends Page1Design {
    router: any;
    constructor() {
        super();
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    }
}

function onShow(superOnShow: () => void) {
    superOnShow();
}


function onLoad(superOnLoad: () => void) {
    superOnLoad();
}
