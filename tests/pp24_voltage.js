const POWERplate24 = require('../POWERplate24');

POW = new POWERplate24(0);

POW.send({cmd: "VERIFY", args: {}}, (reply) => {
    console.log('VERIFY: ' + reply.state);
});

POW.send({cmd: "getADC", args: {channel: "getVin"}}, (reply) => {
    console.log('5v input voltage: ' + reply.voltage);
});
POW.send({cmd: "getADC", args: {channel: "getHVin"}}, (reply) => {
    console.log('high voltage input: ' + reply.voltage);
});
