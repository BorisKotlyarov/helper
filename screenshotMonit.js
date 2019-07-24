const {spawn} = require('child_process');
const OS = require('os');

class ScreenshotMonitor {

    constructor() {
        this.stop = () => {
        }

    }

    start(callback) {
        if (this.hasOwnProperty(process.platform)) {
            this[process.platform](callback)
        }
    }

    linux(callback) {
        this.dbus = null;
        console.log(`ScreenshotMonitor started`)

        this.stop = () => {
            this.dbus.kill();
        };

        let args = [`interface='org.freedesktop.Notifications'`];

        this.dbus = spawn('dbus-monitor', args);

        this.dbus.stdout.on('data', (data) => {
            data = data.toString();
            if (data.indexOf(`Screenshot taken`) !== -1) {
                callback(data)
            }
        });
    }

    win32() {
        console.log(`coming soon`)
    }


}

module.exports = ScreenshotMonitor;