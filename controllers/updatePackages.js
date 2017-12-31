'use strict'
var async = require('async');
var getos = require('getos');
const displayer = require('../views/displayer');
const brew = require('../tools/brew');
const npm = require('../tools/npm');
const pacman = require('../tools/pacman');
const aur = require('../tools/aur');
const apt = require('../tools/apt');
const git = require('../tools/git');
const storage = require('../tools/storage');
const Manager = require('../models/Manger')
const Package = require('../models/Package')
const config = require("../config/config")

var mOS = undefined;

// Update packages
exports.update = (callback) => { // TODO: Update all? Not just the ones in the packages.json
    getos(function(e,os) {
        if(e) return console.log(e) // TODO: Give better error?
        //console.log("Your OS is:" +JSON.stringify(os))
        mOS = os;

        var managers = [];
        let managersData = [
            {name: 'brew', packages: []},
            {name: 'apt', packages: []},
            {name: 'pacman', packages: []},
            {name: 'npm', packages: []},
            {name: 'git', packages: []},
            {name: 'aur', packages: []}
        ]
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
                    //if (config.get().pacmanDistros.includes(os.dist)) {
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
        let order = ['git', 'brew', 'npm', 'apt', 'pacman', 'aur'];
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
                //displayer.stopSpinner();
                displayer.success('Done updating packages!');
            }
            if(callback) {
                callback();
            } else {
                process.exitCode = exitCode;
            }
        });
    });
}

function managerTask(managers, callback) {
    let manager = managers.pop(); 
    
    //displayer.debug(manager);
    // TODO: Switch case here and call update command on the manager..
    //callback(null, managers);



    displayer.info("Updating with manager: " + manager.name);
    switch(manager.name) {
        case 'npm':
            //npm.update(function(err) { // TOOD: Change to restore funcitons!
            //    callback(null, managers);
            //});
            callback(null, managers);
            break;
        case 'pacman':
            pacman.update(function(err) { 
                callback(null, managers);
            })
            break;
        case 'aur':
            aur.update(function(err) { 
                callback(null, managers);
            })
            break;
        case 'apt':
            apt.update(function(err) { 
                callback(null, managers);
            })
            break;
        case 'git':
            //git.update(pkg.name, function(err) { 
            //    //notifyUser(err, pkg.name);
            //    displayer.success(err.msg); // Always returns error..
            //    callback(null, packages, manager, managers);
            //})
            callback(null, managers);
            break;
        default:
            brew.update(function(err) {
                callback(null, managers);
            });
    }
}

var exitCode = 0;
