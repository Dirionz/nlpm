'use strict'
var fs = require('fs')
var jsonFile = require("jsonfile");
const mkdirp = require('mkdirp');
const getDirName = require('path').dirname;
const config = require("../config/config")

// Store packages to packages.json
exports.save = (packages, callback) => {
    if (!packages) { return callback(new Error("Packages cannot be null")); }
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
    if (!fs.existsSync(packageDir)) {
        mkdirp(getDirName(packageDir), function (err) {
            if (err) return callback(err);
            var contents = "";
            fs.writeFile(packageDir, contents, (err) => {});
            callback(null, JSON.parse('""'))
        });   
    } else {
        try {
            var file = jsonFile.readFileSync(packageDir, 'utf8');
            callback(null, file);
        } catch (err) {
            callback(err)
        }
    }
}
