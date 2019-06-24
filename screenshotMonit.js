const {spawn} = require('child_process');

class ScreenshotMonitor {

    constructor() {
        this.dbus = null;
    }

    start(callback) {
        let args = [`interface='org.freedesktop.Notifications'`];

        this.dbus = spawn('dbus-monitor', args);

        this.dbus.stdout.on('data', (data) => {
            data = data.toString();
            if (data.indexOf(`Screenshot taken`) !== -1) {
                callback(data)
            }
        });
    }

    stop() {
        this.dbus.kill();
    }

}

module.exports = ScreenshotMonitor;
