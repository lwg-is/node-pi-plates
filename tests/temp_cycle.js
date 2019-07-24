// Poll for temperature readings on Thermocouple input 8
// and DS18B20 input 9

const THERMOplate = require('../THERMOplate');

TP0 = new THERMOplate(0);

const obj_tc = {cmd: "getTEMP", args: {channel: 8}};
const obj_ds = {cmd: "getTEMP", args: {channel: 9}};

setInterval( () => {
    TP0.send(obj_tc, (reply) => {
        console.log('thermocouple(8) is ' + reply.value + ' degrees C');
    });
    TP0.send(obj_ds, (reply) => {
        console.log('DS18B20(9) is ' + reply.value + ' degrees C');
    });
}, 1000);
