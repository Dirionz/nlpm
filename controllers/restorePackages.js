'use strict'
var async = require('async');
var getos = require('getos');
const displayer = require('../views/displayer');
const brew = require('../tools/brew');
const npm = require('../tools/npm');
const pacman = require('../tools/pacman');
const apt = require('../tools/apt');
const git = require('../tools/git');
const storage = require('../tools/storage');
const Manager = require('../models/Manger')
const Package = require('../models/Package')
const config = require("../config/config")

// Dependencys for Trizen
// git diffutils perl>=5.20.0 perl-libwww perl-term-ui perl-json perl-data-dump perl-lwp-protocol-https

var mOS = undefined;

// Restore packages from package.json
exports.restore = (callback) => { 
    getos(function(e,os) {
        if(e) return console.log(e) // TODO: Give better error?
        //console.log("Your OS is:" +JSON.stringify(os))
        mOS = os;

        storage.get(function(err, managersData) {
            var managers = [];
            if (managersData) {
                managersData.forEach(function(managerData) {
                    let manager = Manager.initWithData(managerData);
                    if (manager.name === 'apt') {
                        if (config.get().hasApt(os)) {
                            managers.push(manager);
                        }
                    } else if(manager.name === 'pacman') {
                        //if (config.get().pacmanDistros.includes(os.dist)) {
                        if (config.get().hasPacman(os)) {
                            managers.push(manager);
                        }
                    } else if(manager.name === 'aur') {
                        if (config.get().hasPacman(os)) {
                            managers.push(manager);
                        }
                    } else {
                        managers.push(manager);
                    }
                });
            } else {
                console.log('~/.packages.json file is empty.') // TODO: Refer to the correct file (if its configured in config.yml)
                return;
            }
            let order = ['git', 'brew', 'npm', 'apt', 'pacman'];
            managers = managers.sort(function(a,b) {
                return order.indexOf( a.name ) > order.indexOf( b.name );
            });

            var managerTasks = [];
            managerTasks.push(function(callback) {
                callback(null, managers);
            });
            managers.forEach(function(manager) {
                managerTasks.push(managerTask);
            });

            async.waterfall(managerTasks, function(err, result) {
                if (err) {
                    displayer.error(err);
                } else {
                    // TODO: Mby give another msg here.
                    //if(result) { displayer.success(JSON.stringify(result, null, 2)); }
                    displayer.stopSpinner();
                    displayer.success('Done installing packages!');
                }
                if(callback) {
                    callback();
                } else {
                    process.exitCode = exitCode;
                }
            });


        });
    });
 }

function managerTask(managers, callback) {
    let manager = managers.pop(); 

    var restoreTasks = [];
    restoreTasks.push(function(callback) {
        callback(null, manager.packages, manager, managers);
    });
    manager.packages.forEach(function(pkg) {
        restoreTasks.push(restoreTask);
    });

    async.waterfall(restoreTasks, function(err, packages, manager, managers) {
        if(callback) callback(err, managers);
    });
}

function restoreTask(packages, manager, managers, callback) { // TODO: Add "After scripts" to packages object
    var pkg = packages.pop();
    switch(manager.name) { // TODO: Handle error with put in logfile?
        case 'npm':
            displayer.infoLoader("Restoring package "+pkg.name+" with npm")
            npm.restore(pkg.name, function(err) { // TOOD: Change to restore funcitons!
                notifyUser(err, pkg.name);
                callback(null, packages, manager, managers);
            });
            break;
        case 'pacman':
            displayer.infoLoader("Restoring package "+pkg+" with pacman") // FIXME: Cannot do sudo user input
            pacman.restore(pkg.name, function(err) { 
                notifyUser(err, pkg.name);
                callback(null, packages, manager, managers);
            })
            break;
        case 'apt':
            displayer.infoLoader("Restoring package "+pkg.name+" with apt") // FIXME: Cannot do sudo user input
            apt.restore(pkg.name, function(err) { 
                notifyUser(err, pkg.name);
                callback(null, packages, manager, managers);
            })
            break;
        case 'git':
            displayer.infoLoader("Restoring package "+pkg.name+" with git")
            git.restore(pkg.name, function(err) { 
                //notifyUser(err, pkg.name);
                displayer.success(err.msg); // Always returns error..
                callback(null, packages, manager, managers);
            })
            break;
        default:
            if (pkg.os && pkg.os !== mOS) {
                //console.log("Did not install pkg: "+pkg.name)
                callback(null, packages, manager, managers);
            } else {
                displayer.infoLoader("Restoring package "+pkg.name+" with brew")
                brew.restore(pkg.name, function(err) {
                    notifyUser(err, pkg.name);
                    callback(null, packages, manager, managers);
                });
            }
    }
}

var exitCode = 0;
function notifyUser(err, pkg) {
    if(err) { 
        exitCode = 1;
        displayer.error(err);
    } else {
        displayer.success("Successfully installed: " + pkg);
    }
}

