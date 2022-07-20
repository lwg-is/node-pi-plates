const ADCplate = require('../ADCplate');

ADC7 = new ADCplate(7);

ADC7.send({cmd: "VERIFY", args: {}}, (reply) => {
    console.log('VERIFY: ' + reply.state);
});

ADC7.send({cmd: "getADC", args: {channel: "S1"}}, (reply) => {
    console.log('getADC: ' + reply.voltage);
});

ADC7.send({cmd: "getADC", args: {channel: "D2"}}, (reply) => {
    console.log('getADC: ' + reply.voltage);
});

ADC7.send({cmd: "getADC", args: {channel: "I3"}}, (reply) => {
    console.log('getADC: ' + reply.milliamps);
});

setTimeout( () => {
    ADC7.send({cmd: "clrLED", args: {}}, (reply) => {
        console.log('clrLED: ' + reply.state);
    });
}, 3000);
