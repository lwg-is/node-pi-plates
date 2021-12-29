const MOTORplate = require('../MOTORplate');

MP3 = new MOTORplate(3);

MP3.send({cmd: "dcCONFIG", args: {addr: MP3.addr, motor: 1, dir: 'ccw', speed: 50.0, acceleration: 2.5}}, (reply) => {
    console.log('motor configured');
});

on_obj = {cmd: "dcSTART", args: {motor: 1}};
off_obj = {cmd: "dcSTOP", args: {motor: 1}};

// cycle DC motor on and off every 5 seconds

setInterval( () => {
    MP3.send(on_obj, (reply) => {});
    console.log('turning motor ON');
    setTimeout( () => {
        MP3.send(off_obj, (reply) => {});
        console.log('turning motor OFF');
    }, 5000);
}, 10000);
