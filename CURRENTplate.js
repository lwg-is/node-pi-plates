const BASEplate = require('./BASEplate');

class CURRENTplate extends BASEplate {
    constructor (addr) {
        super(addr, "CURRENT");
    }
}

module.exports = CURRENTplate;
