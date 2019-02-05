const robot = require("robotjs");
const ioHook = require("iohook");

const CTRL = 29;
const ALT = 56;
const F7 = 65;

class Clicker {
    constructor() {
        this.isEnabled = false;
        this.timeoutId = null;

        ioHook.start();

        ioHook.registerShortcut([CTRL, ALT, F7], (keys) => {

            this.isEnabled = !this.isEnabled;
            if (!this.isEnabled) {
                clearTimeout(this.timeoutId);
                this.timeoutId = null;
            } else {
                this.doClick();
            }
        });
    }

    doClick() {
        if (this.isEnabled) {
            let pause = (this.randomInteger(1, 10) * 1000);
            this.timeoutId = setTimeout(() => {
                console.clear();
                robot.mouseClick();
                this.doClick();
            }, pause);
        }
    }

    randomInteger(min, max) {
        let rand = min - 0.5 + Math.random() * (max - min + 1)
        rand = Math.round(rand);
        return rand;
    }
}

new Clicker();
