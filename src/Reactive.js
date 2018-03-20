import {Computation} from "./Computation";

Reactive.trackingActive = true;
Reactive.isRecomputing = false;

function Reactive(handler, thisObject) {
    if (Reactive.active) {
        Reactive.currentComputation = new Computation(handler, thisObject);
        Reactive.currentComputation.execute();
        Reactive.currentComputation = null;
    } else {
        handler();
    }
}

function notReactive(handler, thisObject) {

    if (Reactive.isRecomputing) {
        return;
    }

    const previousState = Reactive.trackingActive;

    Reactive.trackingActive = false;

    handler.call(thisObject);

    Reactive.trackingActive = previousState;

}

Reactive.active = true;
Reactive.currentComputation = null;

export {Reactive, notReactive};