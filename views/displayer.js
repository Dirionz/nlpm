'use strict'
var Spinner = require('cli-spinner').Spinner;
var spinner = undefined;

exports.infoLoader = (msg) => {
    if (spinner) {
        spinner.stop();
    }
    spinner = new Spinner(msg+'.. %s      ');
    spinner.setSpinnerString('|/-\\');
    spinner.start();
}

exports.stopSpinner = () => {
    spinner.stop();
}

exports.info = (msg) => {
    return logger(msg);
}

exports.success = (msg) => {
    return logger(msg);
}

// Display error
exports.error = (err) => {
    var msg = err.msg;
    if (msg) {
        msg = msg.replace(/(\r\n|\n|\r)/gm,"");
    }
    return logger(msg);
}

exports.debug = (msg) => {
    if (process.env.NODE_ENV === 'debug') {
        return logger(msg);
    }
}

exports.verbose = (msg) => {
    return;
    return logger(msg);
}

function logger(string) {
    if (process.env.NODE_ENV !== 'test') {
        console.log(string);
    }
}
