const BASEplate = require('./BASEplate');

class ADCplate extends BASEplate {
    constructor (addr) {
        super(addr, "ADC");
    }
}

module.exports = ADCplate;
