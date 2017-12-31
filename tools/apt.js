'use strict'
var cmd=require('./cmd');

// Install package using apt
exports.install = (pkg, callback) => {
    if (!pkg) { callback({'msg': 'Pkg cannot be null'}); }
    // Call cli to install with apt
    cmd.start('apt-get', ['install' , pkg], function(err, data) { // Test if we can use sudo here
        if (err) { 
            callback({'msg': 'Error when trying to install: ' + pkg + " -> " + err }); // TODO: Not needed?
        } else {
            callback();
        }
    });
}

// Restore package using apt 
exports.restore = (pkgs, callback) => {
    if (!pkgs) { callback({'msg': 'Pkgs cannot be null'}); }
    // Call cli to install with apt
    cmd.start('sudo', ['apt-get', 'install'].concat(pkgs.map(x => x.name)), function(err, data) {
        if (err) { 
            callback({'msg': 'Error when trying to install: ' + pkgs + " -> " + err }); // TODO: Not needed?
        } else {
            callback();
        }
    });
    //cmd.run('sudo apt-get -y install ' + pkg, function(err, data) {
    //    if (err) { 
    //        callback({'msg': 'Error when trying to install: ' + pkg + " -> " + err });
    //    } else {
    //        callback(); // TODO: Send the data back?
    //    }
    //});
}

// Update package using apt
exports.update = (callback) => {
    //Call cli to update with apt
    cmd.start('sudo', ['apt-get', '-y', 'update'].concat(pkgs.map(x => x.name)), function(err, data) {
        if (err) { 
            callback({'msg': 'Error when trying to update with apt' + " -> " + err });
        } else {
            callback();
        }
    });
    //cmd.run('sudo apt-get -y update', function(err, data) {
    //    if (err) { 
    //        callback({'msg': 'Error when trying to update with apt' + " -> " + err });
    //    } else {
    //        callback();
    //    }
    //});
}

exports.exists = (callback) => {
    cmd.run("apt-get -h", function(err) {
        if (err) callback(false);
        else callback(true);
    })
}
