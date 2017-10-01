'use strict'
var cmd=require('./cmd');

// Install package using npm
exports.install = (pkg, callback) => {
    if (!pkg) { callback({'msg': 'Pkg cannot be null'}); }
    // Call cli to install with npm
    cmd.start('npm', ['install', '-g', pkg], function(err, data) {
        if (err) { 
            callback({'msg': 'Error when trying to install: ' + pkg + " -> " + err }); // TODO: Not needed?
        } else {
            callback();
        }
    });
}

// Install package using npm
exports.restore = (pkg, callback) => {
    if (!pkg) { callback({'msg': 'Pkg cannot be null'}); }
    // Call cli to install with npm
    cmd.run('npm install -g ' + pkg, function(err, data) {
        if (err) { 
            callback({'msg': 'Error when trying to install: ' + pkg + " -> " + err });
        } else {
            callback(); // TODO: Send the data back?
        }
    });
}
