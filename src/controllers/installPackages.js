// 'use strict'
// var async = require('async');
// var getos = require('getos');
// const displayer = require('../views/displayer');
// const brew = require('../tools/brew');
// const npm = require('../tools/npm');
// const pacman = require('../tools/pacman');
// const aur = require('../tools/aur');
// const apt = require('../tools/apt');
// const git = require('../tools/git');
// const storage = require('../tools/storage');
// const Manager = require('../models/Manger')
// const Package = require('../models/Package')
// const config = require("../config/config")

// // TODO: Dont install packages one buy one if we send in multiple packages...

// var mOS = undefined;

// // Install package using brew
// // Save if we have save flag
// exports.install = (packages, shouldSave, shouldLockOs, manager, callback) => {
//     if (!packages) { return displayer.error({'msg': 'pkg cannot be null'}) }

//     getos(function(e,os) { 
//         if (shouldLockOs) {
//             mOS = os.os;
//         }
//         var installTasks = [];
//         installTasks.push(function(callback) {
//             callback(null, packages, shouldSave, manager, []);
//         });
//         for(var pkg in packages) {
//             installTasks.push(installTask);
//         }
//         installTasks.push(saveTask);

//         async.waterfall(installTasks, function(err, result) {
//             if (err) {
//                 exitCode = 1;
//                 displayer.error(err);
//             } else {
//                 // TODO: Mby give another msg here.
//                 if(result) { displayer.success(JSON.stringify(result, null, 2)); }
//             }
//             if(callback) {
//                 callback();
//             } else {
//                 process.exitCode = exitCode;
//             }
//         });
//     });
// }

// function installTask(packages, shouldSave, manager, successPackages, callback) {
//     var pkg = packages.pop();
//     switch(manager) {
//         case 'npm':
//             npm.install(pkg, function(err) {
//                 if (!err) {
//                     successPackages.push(Package.initWithName(pkg));
//                 }
//                 callback(null, packages, shouldSave, manager, successPackages);
//             });
//             break;
//         case 'pacman':
//             pacman.install(pkg, function(err) { 
//                 if (!err) {
//                     successPackages.push(Package.initWithName(pkg));
//                 }
//                 callback(null, packages, shouldSave, manager, successPackages);
//             })
//             break;
//         case 'aur':
//             aur.install(pkg, function(err) { 
//                 if (!err) {
//                     successPackages.push(Package.initWithName(pkg));
//                 }
//                 callback(null, packages, shouldSave, manager, successPackages);
//             })
//             break;
//         case 'apt':
//             apt.install(pkg, function(err) { 
//                 if (!err) {
//                     successPackages.push(Package.initWithName(pkg));
//                 }
//                 callback(null, packages, shouldSave, manager, successPackages);
//             })
//             break;
//         case 'git':
//             git.install(pkg, function(err) { 
//                 if (!err) {
//                     successPackages.push(Package.initWithName(pkg));
//                 }
//                 callback(null, packages, shouldSave, manager, successPackages);
//             })
//             break;
//         default:
//             brew.install(pkg, function(err) {
//                 if (!err) {
//                     successPackages.push(Package.initWithName(pkg, mOS));
//                 }
//                 callback(null, packages, shouldSave, manager, successPackages);
//             });
//     }
// }

// function saveTask(emptyPkgArr, shouldSave, managerName, successPackages, callback) {
//     if (shouldSave) {
//         async.waterfall([
//             function(callback) {
//                 storage.get(function(err, managersData) {
//                     var didAddPackages = false;
//                     var managers = [];
//                     if (managersData) {
//                         managersData.forEach(function(managerData) {
//                             let manager = Manager.initWithData(managerData);
//                             if (manager.name === managerName) {
//                                 manager.packages = Manager.unionPackages(successPackages, manager.packages);
//                                 didAddPackages = true;
//                             }
//                             managers.push(manager);
//                         });
//                     }

//                     if (!didAddPackages) {
//                         let manager = Manager.initWithName(managerName, successPackages);
//                         managers.push(manager);
//                     }
//                     callback(null, managers);
//                 });
//             },
//             function(managers, callback) {
//                 storage.save(managers, function(err) { 
//                     callback(err, managers);
//                 });
//             }
//         ], function(err, managers) {
//             callback(err, managers);
//         });
//      } else {
//         callback(null);
//      }
//  }

// var exitCode = 0;
// function notifyUser(err, pkg) {
//     if(err) { 
//         exitCode = 1;
//         displayer.error(err);
//     } else {
//         displayer.success("Successfully installed: " + pkg);
//     }
// }

