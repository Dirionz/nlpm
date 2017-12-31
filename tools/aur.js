'use strict'
var cmd=require('./cmd');
const constants = require('../constants/tools');

// Install package using pacman
exports.install = (pkg, callback) => {
    if (!pkg) { callback({'msg': 'Pkg cannot be null'}); }
    // Call cli to install with pacman
    cmd.start("./tools/trizen", ['-S', pkg, '--nocolors'], function(err, data) {
        if (err) { 
            callback({'msg': 'Error when trying to install: ' + pkg + " -> " + err }); // TODO: Not needed?
        } else {
            callback();
        }
    });
}

// Install package using pacman
exports.restore = (pkgs, callback) => {
    if (!pkgs) { callback({'msg': 'Pkgs cannot be null'}); }
    // Call cli to install with pacman
    //cmd.run(constants.TRIZEN_RESTORE_COMMAND + pkg, function(err, data) {
    //    if (err) { 
    //        callback({'msg': 'Error when trying to install: ' + pkg + " -> " + err});
    //    } else {
    //        callback(); // TODO: Send the data back?
    //    }
    //});
    cmd.start("./tools/trizen", ['-Sy', '--noconfirm', '--nocolors'].concat(pkgs.map(x => x.name)), function(err, data) {
        if (err) { 
            callback({'msg': 'Error when trying to install: ' + pkg + " -> " + err });
        } else {
            callback();
        }
    });
}

// Update package using pacman
exports.update = (callback) => {
    //Call cli to update with apt
    //cmd.run(constants.TRIZEN_UPDATE_COMMAND, function(err, data) {
    //    if (err) { 
    //        callback({'msg': 'Error when trying to update with trizen' + " -> " + err });
    //    } else {
    //        callback();
    //    }
    //});
    cmd.start("./tools/trizen", ['-Syu', '--noconfirm', '--nocolors'], function(err, data) {
        console.log("Back from trizen!")
        if (err) { 
            callback({'msg': 'Error when trying to update with tryzen: ' + " -> " + err });
        } else {
            callback();
        }
    });
}
