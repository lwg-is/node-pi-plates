const BASEplate = require('./BASEplate');

class DIGIplate extends BASEplate {
    constructor (addr) {
        super(addr, "DIGI");
    }
}

module.exports = DIGIplate;
