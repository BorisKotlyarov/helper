const Clicker = require("./index");

// https://github.com/octalmage/robotjs/releases
// https://github.com/wilix-team/iohook/releases

const pjson = require('./package.json');
let argv = process.argv.slice();

argv.splice(0, 2);

switch (argv[0]) {

    case new RegExp('^-(v||version)$', 'i').test(argv[0]) && argv[0]:
        console.log('helper version', pjson.version);
        break;

    default:
        new Clicker();
}


// const image = nativeImage.createFromPath(path.join(__dirname, '/home.png'));
// console.log(app)

// const Clicker = require('./index');


