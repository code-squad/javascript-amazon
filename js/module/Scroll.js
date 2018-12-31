class Scroll{
    constructor(baseEl = window){
        this.baseEl = baseEl;
    }

    addEvent(...evtListeners){
        evtListeners.forEach(evtListener => this.baseEl.addEventListener("scroll", evtListener));
    }
}

export { Scroll };