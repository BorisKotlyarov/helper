const { app, Menu, Tray, nativeImage } = require('electron');
const path = require('path');
const robot = require("robotjs");



const image = nativeImage.createFromPath(path.join(__dirname, '/home.png'));
// console.log(app)

// const Clicker = require('./index');

let tray = null;

app.on('ready', () => {
    try {
        // new Clicker();
        tray = new Tray(image);
        // tray.setTitle('xcvxcv');



        //tray.setImage(image);  //use for set new tray icon
        // const contextMenu = Menu.buildFromTemplate([
        //     { label: 'Item1'}
        // ])
        //
        // tray.setContextMenu(contextMenu)

        console.log(`gggg`)

    } catch (e) {
        console.log(e)
        app.exit()
    }
})
