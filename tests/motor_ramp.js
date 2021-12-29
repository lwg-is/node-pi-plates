const MOTORplate = require('../MOTORplate');

MP3 = new MOTORplate(3);

MP3.send({cmd: "dcCONFIG", args: {addr: MP3.addr, motor: 1, dir: 'ccw', speed: 0, acceleration: 0}}, (reply) => {
    console.log('motor configured');
});

on_obj = {cmd: "dcSTART", args: {motor: 1}};
off_obj = {cmd: "dcSTOP", args: {motor: 1}};
speed_obj = {cmd: "dcSPEED", args: {motor: 1, speed: 0}};

// increase motor speed every 4 seconds

let i = 0;
MP3.send(on_obj, (reply) => {});
setInterval( () => {
    if (i >= 100) {
        i = 0;
    } else {
        i = i + 10;
    }

    speed_obj.args.speed = i;
    MP3.send(speed_obj, (reply) => {
        console.log('speed set to: ' + i);
    });
}, 4000);
