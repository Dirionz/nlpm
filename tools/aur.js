'use strict'
var cmd=require('./cmd');
const constants = require('../constants/tools');

// Install package using pacman
exports.install = (pkg, callback) => {
    if (!pkg) { callback({'msg': 'Pkg cannot be null'}); }
    // Call cli to install with pacman
    cmd.start("./tools/trizen", ['-S', pkg], function(err, data) {
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
    cmd.run(constants.TRIZEN_RESTORE_COMMAND + pkg, function(err, data) {
        if (err) { 
            callback({'msg': 'Error when trying to install: ' + pkg + " -> " + err});
        } else {
            callback(); // TODO: Send the data back?
        }
    });
}

// Update package using pacman
exports.update = (callback) => {
    //Call cli to update with apt
    cmd.run(constants.TRIZEN_UPDATE_COMMAND, function(err, data) {
        if (err) { 
            callback({'msg': 'Error when trying to update with trizen' + " -> " + err });
        } else {
            callback();
        }
    });
}
