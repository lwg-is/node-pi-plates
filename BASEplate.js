const vasync = require('vasync');
const readline = require('readline');
const { spawn } = require('child_process');
const assert = require('assert');

class PlateIO {
    constructor () {
        this.statuses = [];

        this.create_process();
    }

    create_process () {
        this.process = spawn(__dirname + '/env/bin/python3', ['-u', __dirname + '/plate_io.py']);
        this.statuses.push(0);

        let exec_count = this.get_execution_count();

        console.log(`Starting pi-plates python co-process (count ${exec_count})`);

        this.process.on('error', (err) => {
            console.log('child error: ' + err);

            this.queue.close();
            setTimeout(() => this.create_process(), 1000);
        });

        this.process.on('exit', (code, signal) => {
            console.log(`pi-plates python co-process exited with code: ${code} and signal: ${signal}`);
            this.statuses[this.statuses.length - 1] = code;

            this.queue.close();
            setTimeout(() => this.create_process(), 1000);
        });

        this.process.stderr.on('data', (data) => {
            console.log('stderr: ' + data);
        });

        this.rl = readline.createInterface({
            input: this.process.stdout
        });

        this.queue = vasync.queue((task, cb) => this.do_cmd(task, cb), 1);
    }

    get_execution_count () {
        return this.statuses.length;
    }

    get_status () {
        return this.statuses[this.statuses.length - 1];
    }

    kill () {
        this.process.kill();
    }

    do_cmd (task, cb) {
        if (!this.get_status()) {
            const cmd_str = JSON.stringify(task) + '\n';
            try {
                this.process.stdin.write(cmd_str);
                assert.equal(this.rl.listenerCount('line'), 0);
                this.rl.once('line', (line) => {
                    try {
                        const reply = JSON.parse(line);
                        cb(reply);
                    } catch (e) {
                        console.log('invalid json received from pi-plates python co-process: ' + line);
                        cb();
                    }
                });
            } catch (e) {
                console.log('error writing to pi-plates python co-process');
            }
        }
    }
}

let plate_io = new PlateIO();

class BASEplate {
    constructor (addr, plate_type) {
        this.addr = addr;
        this.plate_type = plate_type;

        /* plate_status stores information about whether or not this plate can currently
         * be used, or if there is an issue:
         * 0 = no error
         * 1 = plate not found
         * 2 = missing python dependencies
         * 3 = unknown python error
         * 4 = unknown state
         */
        this.plate_status = 4;

        this.update_status();
    }

    // Updates this.plate_status.
    update_status () {
        let child_status = plate_io.get_status();
        if (child_status) {
            this.plate_status = child_status;
        } else {
            const verifier = {cmd: "VERIFY", args: {}};

            this.send(verifier, (reply) => {
                // If the plate was invalid and now works, the piplates library
                // needs that update as well. So, we activate the piplate:

                if (this.plate_status == 1 && !reply.state) {
                    const update = {cmd: "ACTIVATE", args: {}};

                    this.send(update, (reply) => {});
                }

                this.plate_status = reply.state;
            });
        }
    }

    send (obj, receive_cb) {
        // send a request to this plate using the form:
        // {cmd: <pi-plate command>, args: {<command-specific args>}
        // e.g. {cmd: "relayTOGGLE", args: { relay: 4}}

        obj['plate_type'] = this.plate_type;
        obj['addr'] = this.addr;

        if (!plate_io.get_status() && !plate_io.queue.closed) {
            plate_io.queue.push(obj, receive_cb);
        }
    }

    shutdown () {
        plate_io.kill();
    }
}

module.exports = BASEplate;
