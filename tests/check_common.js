if (process.argv.length != 4) {
    console.log('usage: node ./check_common.js <Plate Type> <Plate ID>')
    process.exit(0)
}

const plate_type = process.argv[2];
const plate_id = parseInt(process.argv[3]);

switch (plate_type) {
    case 'DAQC':
        const DAQCplate = require('../DAQCplate');
        var PP = new DAQCplate(plate_id);
        break;
    case 'DAQC2':
        const DAQC2plate = require('../DAQC2plate');
        var PP = new DAQC2plate(plate_id);
        break;
    case 'MOTOR':
        const MOTORplate = require('../MOTORplate');
        var PP = new MOTORplate(plate_id);
        break;
    case 'THERMO':
        const THERMOplate = require('../THERMOplate');
        var PP = new THERMOplate(plate_id);
        break;
    case 'RELAY':
        const RELAYplate = require('../RELAYplate');
        var PP = new RELAYplate(plate_id);
        break;
    case 'RELAY2':
        const RELAYplate2 = require('../RELAYplate2');
        var PP = new RELAYplate2(plate_id);
        break;
    case 'DIGI':
        const DIGIplate = require('../DIGIplate');
        var PP = new DIGIplate(plate_id);
        break;
    case 'ADC':
        const ADCplate = require('../ADCplate');
        var PP = new ADCplate(plate_id);
        break;
    case 'CURRENT':
        const CURRENTplate = require('../CURRENTplate');
        var PP = new CURRENTplate(plate_id);
        break;
    case 'POWER24':
        const POWERplate24 = require('../POWERplate24');
        var PP = new POWERplate24(plate_id);
        break;
    default:
}

let cmds = ['getID', 'getFWrev', 'getHWrev', 'getVersion', 'getADDR', 'VERIFY',
            'setLED', 'clrLED', 'toggleLED', 'getLED', 'RESET'];

let index = 0;

let loop = setInterval(function (cmd) {
    if (index >= cmds.length - 1) {
        clearInterval(loop);
        process.exit(0);
    }

    this_cmd = cmds[index];

    PP.send({cmd: this_cmd, args: {}}, (reply) => {
        console.log(this_cmd + ': ' + JSON.stringify(reply));
    })

    index++;
}, 1000);
