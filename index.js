const robot = require("robotjs");
const ioHook = require("iohook");
const settings = require('./settings');

const CTRL = 29;
//const ALT = 56;
const F7 = 65;

class Clicker {
    constructor() {
        this.isEnabled = false;
        this.timeoutId = null;

        ioHook.start();

        ioHook.registerShortcut([CTRL, F7], (keys) => {
            console.clear();
            this.isEnabled = !this.isEnabled;
            console.log(this.isEnabled ? `enabled` : `disabled`);
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
            let pause = (this.randomMilliseconds(settings.frequency.min, settings.frequency.max));
            this.timeoutId = setTimeout(() => {
                robot.keyTap('alt');
                this.doClick();
            }, pause);
        }
    }

    randomMilliseconds(min, max) {
        let rand = min - 0.5 + Math.random() * (max - min + 1)
        rand = Math.round(rand* 1000);
        return rand;
    }
}

console.clear();
new Clicker();
