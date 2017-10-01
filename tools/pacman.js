'use strict'
var cmd=require('./cmd');
const constants = require('../constants/tools');

// Install package using pacman
exports.install = (pkg, callback) => {
    if (!pkg) { callback({'msg': 'Pkg cannot be null'}); }
    // Call cli to install with pacman
    cmd.start('pacman', ['-S', pkg], function(err, data) {
        if (err) { 
            callback({'msg': 'Error when trying to install: ' + pkg + " -> " + err }); // TODO: Not needed?
        } else {
            callback();
        }
    });
}

// Install package using pacman
exports.restore = (pkg, callback) => {
    if (!pkg) { callback({'msg': 'Pkg cannot be null'}); }
    // Call cli to install with pacman
    cmd.run(constants.PACMAN_RESTORE_COMMAND + pkg, function(err, data) {
        if (err) { 
            callback({'msg': 'Error when trying to install: ' + pkg + " -> " + err});
        } else {
            callback(); // TODO: Send the data back?
        }
    });
}

exports.exists = (callback) => {
    cmd.run("pacman -h", function(err) {
        if (err) callback(false);
        else callback(true);
    })
}
