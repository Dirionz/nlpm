var exec = require('child_process').exec;
const spawn = require('child_process').spawn;
var logger = require('../views/displayer');

var commandline={
    run:runCommand,
    start:startCommand,
    runEvent:runEventCommand
};

function runCommand(command,callback){
    exec(
        command,
        (
            function(){
                return function(err,data,stderr){
                    logger.verbose(err);
                    logger.verbose(data);
                    logger.verbose(stderr);
                    
                    if(!callback)
                        return;
                    callback(stderr, data);
                }
            }
        )(callback)
    );
}

function startCommand(command, args, callback) {
    const ls = spawn(command, args, { stdio: 'inherit' });

    ls.on('close', (code) => {
        //logger.verbose('Exit code: ' + code.toString());
        if (code == 0) {
            callback();
        }
    });

    ls.on('error', (err) => {
        callback(err);
    })

    process.on('SIGINT', function() {
        ls.kill('SIGINT');
    });

}

function runEventCommand(command, args, callback) {
    const ls = spawn(command, args);
    ls.stdout.on('data', (data) => {
        logger.verbose(data.toString());
    });

    ls.stderr.on('data', (data) => {
        logger.verbose(data.toString());
    });

    ls.on('close', (code) => {
        logger.verbose('Exit code: ' + code.toString());
    });
}

module.exports=commandline;



