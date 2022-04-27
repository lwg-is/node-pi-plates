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
    default:
}

    PP.send({cmd: 'clrLED', args: {}}, (reply) => {
        console.log('clrLED' + ': ' + JSON.stringify(reply));
    });
