'use strict'
var jsonFile = require("jsonfile");
const mkdirp = require('mkdirp');
const getDirName = require('path').dirname;
const config = require("../config/config")

// Store packages to packages.json
exports.save = (packages, callback) => {
    if (!packages) { callback({'msg': 'Packages cannot be null'}); }
    let packageDir = config.get().packageDir;
    mkdirp(getDirName(packageDir), function (err) {
        if (err) return callback(err);
        jsonFile.writeFile(packageDir, packages, {spaces: 2}, function(err) {
            callback(err);
        })
    });

}

// Get packages from package.json
exports.get = (callback) => {
    let packageDir = config.get().packageDir;
    jsonFile.readFile(packageDir, function(err, file) {
        callback(err, file);
    })
}
