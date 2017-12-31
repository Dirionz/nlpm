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
exports.restore = (pkgs, callback) => {
    if (!pkgs) { callback({'msg': 'Pkgs cannot be null'}); }
    // Call cli to install with pacman
    cmd.start('sudo', ['pacman', '-Sy', '--noconfirm'].concat(pkgs.map(x => x.name)), function(err, data) {
        if (err) { 
            callback({'msg': 'Error when trying to install: ' + pkgs + " -> " + err});
        } else {
            callback();
        }
    });
}

// Update package using pacman
exports.update = (callback) => {
    //Call cli to update with pacman
    cmd.start('sudo', ['pacman', '-Syu', '--noconfirm'], function(err, data) {
        if (err) { 
            callback({'msg': 'Error when trying to update with pacman' + " -> " + err });
        } else {
            callback();
        }
    });
}

exports.exists = (callback) => {
    cmd.run("pacman -h", function(err) {
        if (err) callback(false);
        else callback(true);
    })
}
