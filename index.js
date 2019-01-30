const robot = require("robotjs");

function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}

setInterval(()=>{
    console.clear();
    robot.mouseClick();
}, (randomInteger(1, 20) * 1000))
