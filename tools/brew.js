'use strict'
var cmd=require('./cmd');

// Install package using brew
exports.install = (pkg, callback) => {
    if (!pkg) { callback({'msg': 'Pkg cannot be null'}); }
    // Call cli to install with brew
    cmd.start('brew', ['install', pkg], function(err, data) {
        if (err) { 
            callback({'msg': 'Error when trying to install: ' + pkg + " -> " + err }); // TODO: Not needed?
        } else {
            callback();
        }
    });
}

// Restore package using brew
exports.restore = (pkgs, callback) => {
    if (!pkgs) { callback({'msg': 'Pkgs cannot be null'}); }
    //Call cli to install with brew
    cmd.start('brew', ['install'].concat(pkgs.map(x => x.name)), function(err, data) {
        if (err) { 
            callback({'msg': 'Error when trying to install: ' + pkgs + " -> " + err }); // TODO: Not needed?
        } else {
            callback();
        }
    });
    //cmd.run('brew install ' + pkg, function(err, data) {
    //    if (err) { 
    //        callback({'msg': 'Error when trying to install: ' + pkg + " -> " + err });
    //    } else {
    //        callback();
    //    }
    //});
}

// Update package using brew
exports.update = (callback) => {
    //Call cli to update with brew
    //cmd.run('brew update && brew upgrade', function(err, data) {
    //    if (err) { 
    //        callback({'msg': 'Error when trying to update with brew' + " -> " + err });
    //    } else {
    //        callback();
    //    }
    //});
    cmd.start('brew', ['update'], function(err, data) {
        if (err) { 
            callback({'msg': 'Error when trying to update: ' + " -> " + err }); // TODO: Not needed?
        } else {
            cmd.start('brew', ['upgrade'], function(err, data) {
                if (err) { 
                    callback({'msg': 'Error when trying to update: ' + " -> " + err }); // TODO: Not needed?
                } else {
                    callback();
                }
            });
        }
    });
}
