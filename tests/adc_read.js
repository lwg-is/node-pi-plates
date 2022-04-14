const ADCplate = require('../ADCplate');

ADC2 = new ADCplate(2);

ADC2.send({cmd: "VERIFY", args: {}}, (reply) => {
    console.log('VERIFY: ' + reply.state);
});

ADC2.send({cmd: "setLED", args: {}}, (reply) => {
    console.log('setLED: ' + reply.state);
});

ADC2.send({cmd: "getDINbit", args: {bit: 3}}, (reply) => {
    console.log('getDINbit: ' + reply.state);
});

ADC2.send({cmd: "getDINall", args: {}}, (reply) => {
    console.log('getDINall: ' + reply.states);
});

setTimeout( () => {
    ADC2.send({cmd: "clrLED", args: {}}, (reply) => {
        console.log('clrLED: ' + reply.state);
    });
}, 3000);
