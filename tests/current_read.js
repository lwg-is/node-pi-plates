const CURRENTplate = require('../CURRENTplate');

CUR1 = new CURRENTplate(1);

CUR1.send({cmd: "setLED", args: {}}, (reply) => {
    console.log('setLED: ' + reply.state);
});

CUR1.send({cmd: "getI", args: {channel: 3}}, (reply) => {
    console.log('getI: ' + reply.milliamps);
});

CUR1.send({cmd: "getIall", args: {}}, (reply) => {
    console.log('getIall: ' + reply.currents);
});

setTimeout( () => {
    CUR1.send({cmd: "clrLED", args: {}}, (reply) => {
        console.log('clrLED: ' + reply.state);
    });
}, 3000);
