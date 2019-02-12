const robot = require("robotjs");
const ioHook = require("iohook");
const settings = require('./settings');
const pjson = require('./package.json');

const CTRL = 29;
//const ALT = 56;
const F7 = 65;

class Clicker {

    constructor() {
        this.isEnabled = false;
        this.timeoutId = null;

        let argv = process.argv.slice();
        argv.splice(0, 2);

        switch (argv[0]) {

            case new RegExp('^-(v||version)$', 'i').test(argv[0]) && argv[0]:
                console.log('helper.js version', pjson.version);
                break;

            default:
                this.init();
        }

    }

    init() {
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
            console.log(pause)
            this.timeoutId = setTimeout(() => {
                robot.keyTap('alt');
                this.doClick();
            }, pause);
        }
    }

    randomMilliseconds(min, max) {
        let rand = min - 0.5 + Math.random() * (max - min + 1)
        rand = Math.round(rand * 1000);
        return rand;
    }
}

console.clear();
new Clicker();
