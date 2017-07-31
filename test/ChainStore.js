import {Apis} from "gxbjs-ws";
import {ChainStore} from "gxbjs";

Apis.instance("wss://node5.gxb.io", true).init_promise.then((res) => {
    console.log(res);
    ChainStore.init().then(() => {
        ChainStore.subscribe(updateState);
        Apis.instance().db_api().exec("get_objects", [["2.1.0"]]);
    });
});

let dynamicGlobal = null;
function updateState(object) {
    dynamicGlobal = ChainStore.getObject("2.1.0");
    console.log("ChainStore object update\n", dynamicGlobal ? dynamicGlobal.toJS() : dynamicGlobal);
}
