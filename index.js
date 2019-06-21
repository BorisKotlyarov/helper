// const robot = require("robotjs");
// const ioHook = require("iohook");
const settings = require('./settings');
const pjson = require('./package.json');
// SysTray package using because Electron Tray doesn't work correctly in linux systems
const SysTray = require('systray').default;
const ks = require('node-key-sender');


const CTRL = 29;
//const ALT = 56;
const F7 = 65;

const icon_on = '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';
const icon_off = 'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4wUGCy4WQglAvAAAA8hJREFUWMPFl89PXFUUxz/nvjfMMDM+EGKwpbS8IWFiqlRxYUANaYxuqCtdNPGfgBV/A6vyZ7AxaROxK01IDJomNTi6cEhmHmopxUjrPIb5+e67LmaGXyUMVGC+m/cj957zvd977rnnCKeAueqQjzEgoUkbY6YNTAKjBvoBBLaBNYEVUbJkRLKpClvy1G9rW477uTHSw/O65p0/i6ynnLF6aOZMrTql4snByHUX680rWL2vo7rjgBBWyugX2wRPn1D/I4+pVTck0rUcUTI/nPczv15P0hexGMwV2hPwXAfXazDPu849bcyMcnpIfHqH2M0xEDlZLR1QefyI0vcPCWs1LFhIef7sUdvHElhPOQznfbyUkw6CYFE5ve/GP5wi9v4HYAxoDeYUmto2aE3ppx8oP1rB7BZXbdu66+b9bMvHSwRa7P4accYqQfijfeVqPHnnS1Q83nD+KhAhLBYpfvM1wdZmKWariaGcnzmohAA8SfVwLV/Ac510AD8rpyf+2udfoKKx42U+Iw8T1Cku3Uf/83fJFhl3PT/b8mkDPNcaAA2LhDoe/+h247tc5jwgIiRuf0bx4YO4LvqLwHstn3tbkHOde2EYznS99TbRm7cgDDlvhDs77H73LQoWRpqBKc39HwvgF5Qi8fEnSCzGhcAYKpnHBM82seGW6/kZ27gOOZgDULFuTL2GMee5enPoiFi9fQTPNtEwZ1znKzsPAwamGsESoAv/IpEuxLJAqX0jpk34HcgPJgggqDeeCGLbSDR6eAxM5WHAFkgDgwCmVqX2+29gRxDbQiJRVCKBJBKoaHdLxT0icsBgWC1jiruExR3CWhVqNUxQb4yLRFDxBFb/GwQvtltTBgXStoHpw5lMg9aYKsAuujXBslCJJKqrq6GMMYT1AFOtYCrl/VxxMFM2FTRao3d8tF84qsK03bxY2ksbhoR+gXBvX+XwmDYp+iVyDSuTNjB6lsx2wh32KhhVrSu1EzDQr+gwVLOY6AgEthWw1kEB1pTASgcVWFECSx0ksKQMZIGNDvjfMJBVKdgSWO7A6pdTsKXE87Fg/rIJWDAvno8CcD0/o2Dh0s4+LLien2m+Q+ZGkhHPnxVYvQTpV0c8fzZzI8kegT7LaslyFyhdoP9S08eeTwW0KmJcz8/GFBMXRKIUU0y4np/1XIdr+cI+gWYcsJ5yGMr5GRvGz3M7BFZtGB/K+Zn11OHuqH1rBjP/M9pP35od25w2Kua5Zt04eNokI7Bsw/ywd8bm9MT23JBulnCT5kh7Lo1LbUVgyQinbs//A50StI9tiuPVAAAAAElFTkSuQmCC';


class Clicker {

    constructor() {
        this.isEnabled = false;
        this.timeoutId = null;

        this.menu = {
            // you should using .png icon in macOS/Linux, but .ico format in windows
            icon: icon_off,
            title: '',
            tooltip: '',
            items: [{
                title: 'turn on/off',
                // tooltip: "bb",
                // checked is implement by plain text in linux
                // checked: true,
                enabled: true
            }]
        };

        this.systray = new SysTray({
            menu: this.menu,
            debug: false,
            copyDir: true, // copy go tray binary to outside directory, useful for packing tool like pkg.
        });

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

        // hot key registration
/*        ioHook.start();

        ioHook.registerShortcut([CTRL, F7], (keys) => {
            this.toggleWorker(0);
        });*/

        // system tray event registration
        this.systray.onClick(action => {
            this.toggleWorker(action.seq_id)

        })

    }

    toggleWorker(action=0) {

        this.isEnabled = !this.isEnabled;

        console.log(this.isEnabled ? `enabled` : `disabled`);

        switch (action) {
            case 0:

                if (!this.isEnabled) {
                    this.menu.icon = icon_off;
                    clearTimeout(this.timeoutId);
                    this.timeoutId = null;
                } else {
                    this.menu.icon = icon_on;
                    this.doClick();
                }

                this.systray.sendAction({
                    type: 'update-menu',
                    menu: this.menu,
                    seq_id: action,
                });

                break
            case 1:
                // this.systray.kill();
                break;
        }

    }

    doClick() {
        if (this.isEnabled) {
            let pause = (this.randomMilliseconds(settings.frequency.min, settings.frequency.max));
            this.timeoutId = setTimeout(() => {
                ks.sendKey('caps_lock');
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

module.exports = Clicker;
