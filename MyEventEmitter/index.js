import type from "./constants/type.js";
import errMsgs from "./constants/errMsgs.js";

class EventEmitter {
  constructor() {
    this._events = {};
  }

  on(evt, listener) {
    if(typeof listener !== type.FUNCTION) throw new TypeError(errMsgs.LISTENER_TYPE);

    (this._events[evt] || (this._events[evt] = [])).push(listener);
  }

  emit(evt, arg) {
    try {
      (this._events[evt] || []).slice().forEach(lsn => lsn(arg));
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default EventEmitter;