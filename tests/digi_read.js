const DIGIplate = require('../DIGIplate');

DIGI4 = new DIGIplate(4);

DIGI4.send({cmd: "VERIFY", args: {}}, (reply) => {
    console.log('VERIFY: ' + reply.state);
});

DIGI4.send({cmd: "setLED", args: {}}, (reply) => {
    console.log('setLED: ' + reply.state);
});

DIGI4.send({cmd: "getDINbit", args: {bit: 3}}, (reply) => {
    console.log('getDINbit: ' + reply.state);
});

DIGI4.send({cmd: "getDINall", args: {}}, (reply) => {
    console.log('getDINall: ' + reply.states);
});

setTimeout( () => {
    DIGI4.send({cmd: "clrLED", args: {}}, (reply) => {
        console.log('clrLED: ' + reply.state);
    });
}, 3000);
