const {app} = require('electron')
const Clicker = require('./index')


app.on('ready', () => {
    try {
        new Clicker();
    } catch (e) {
        app.exit()
    }
})
