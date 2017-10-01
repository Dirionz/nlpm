'use strict'
var cmd=require('./cmd');
const mkdirp = require('mkdirp');
const getDirName = require('path').dirname;
const config = require("../config/config")

exports.install = (pkg, callback) => {
    if (!pkg) { callback({'msg': 'Pkg cannot be null'}); }

    mkdirp(getDirName(config.get().gitAppDir+pkg), function (err) {
        if (err) return callback(err);

        cmd.start('git', ['clone', 'https://github.com/'+pkg, config.get().gitAppDir+pkg], function(err, data) {
            if (err) { 
                callback({'msg': 'Error when trying to install: ' + pkg + " -> " + err });
            } else {
                callback();
            }
        });
        
    });

}

exports.restore = (pkg, callback) => {
    mkdirp(getDirName(config.get().gitAppDir+pkg), function (err) {
        if (err) return callback(err);

        cmd.run('git clone https://github.com/' + pkg + " " + config.get().gitAppDir+pkg, function(err, data) {
            if (err) { 
                callback({'msg': pkg + " -> " + err });
            } else {
                callback();
            }
        });
        
    });
}
