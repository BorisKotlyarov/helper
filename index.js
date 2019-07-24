const {app, Menu, Tray, nativeImage} = require('electron');
const robot = require("robotjs");
const ioHook = require("iohook");
const path = require('path');

const settings = require('./settings');
const ScreenshotMonitor = require('./screenshotMonit')
const WsServer = require('./ws-server')


const CTRL = 29;
//const ALT = 56;
const F7 = 65;

const ICONS = {
    enabled: path.join(__dirname, 'asserts', 'on.png'),
    disabled: path.join(__dirname, 'asserts', 'off.png'),
}

switch (process.platform) {
    case 'linux':

        break;

    case 'win32':
        ICONS.enabled = path.join(__dirname, 'asserts', 'on.ico');
        ICONS.disabled = path.join(__dirname, 'asserts', 'off.ico');
        break;

    default:

        break
}

class Clicker {

    constructor(config = {}) {
        this.isEnabled = false;
        this.timeoutId = null;
        this.tray = null;
        this.app = app;

        this.screenshotMonitor = new ScreenshotMonitor();
        this.WsServer = new WsServer();

        app.on('ready', () => {
            this.init()
        })

    }

    _getIcon() {
        return nativeImage.createFromPath(this.isEnabled ? ICONS.enabled : ICONS.disabled);
    }

    init() {
        try {
            // tray.setTitle('xcvxcv');
            //tray.setImage(image);  //use for set new tray icon

            this.tray = new Tray(this._getIcon());

            const menuTemplate = [
                {
                    label: 'turn on/off',
                    click: this.toggleWorker.bind(this)
                },
                /* {
                     label: 'Exit',
                     click: () => {
                         ioHook.stop();
                         app.quit()
                         return;
                     }
                 },*/
            ]

            this.contextMenu = Menu.buildFromTemplate(menuTemplate)

            this.tray.setContextMenu(this.contextMenu);

            // hot key registration
            ioHook.start();

            ioHook.registerShortcut([CTRL, F7], (keys) => {
                this.toggleWorker();
            });

        } catch (e) {
            console.log(e)
            this.exit()
            ioHook.stop();
            return;
        }
    }

    exit() {
        app.exit(1)
    }

    toggleWorker() {

        this.isEnabled = !this.isEnabled;
        console.log(this.isEnabled ? `enabled` : `disabled`);

        if (!this.isEnabled) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
            this.screenshotMonitor.stop();
        } else {
            this.screenshotMonitor.start(() => {
                // send event to ws socket
                let date = new Date();
                console.log(`screenshot at: `, date)
                this.WsServer.actions.send('screenshot', {time: date.getTime()})
            });
            this.doClick();
        }
        this.tray.setImage(this._getIcon());  //use for set new tray icon
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
        rand = Math.round(rand * 1000);
        return rand;
    }
}

module.exports = Clicker;
