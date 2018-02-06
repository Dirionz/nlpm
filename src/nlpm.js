#!/usr/bin/env node
'use strict'
process.env.NODE_ENV = 'debug';

const Commands = require('./models/Commands.js')

const commander = require('./tools/commander.js')
const parsecmd = require('./tools/parsecmd.js')
const dist = require('./dist/dist')
const read = require('./store/read')
const save = require('./store/save')

const fs = require('fs');
const yaml = require('js-yaml');
const HashMap = require('hashmap');

var path = require('path');
let yml = path.resolve(__dirname) + '/nlpm.yml'
var data = yaml.safeLoad(fs.readFileSync(yml, 'utf8'));

// TODO: read user yml and append it to data.

let space = '      ';
let help_example = '\n  Usage:\n      nlpm <manager|alias> <command|alias> <pkgs> [--save]\n\n'
let help_command_title = '\n  Commands:\n\n'
var help_str = help_example + help_command_title

help_str = help_str + space + "restore"+ '\n'
help_str = help_str + space.repeat(3) + "Install all packages in packages.json file" + '\n'
help_str = help_str + space + "version"+ '\n'
help_str = help_str + space.repeat(3) + "Show version number" + '\n'

var map_managers = new HashMap()
var map_alias_managers = new HashMap()
var map_managers_os = new HashMap()
var arr_manager_has_save = []

for (var k in data) {

    let commands = new Commands()

    let cmds = k.split('|')
    let fullname = cmds[0]
    let alias = cmds[1]
    map_alias_managers.set(alias, fullname);
    var count = 0
    help_str = help_str + space + fullname+"|"+alias+ '\n'
    for (var nk in data[k]) {

        if (nk == "os") {
            map_managers_os.set(fullname, data[k][nk])
        } else {
            let sub_commands = nk.split('|')
            let sub_fullname = sub_commands[0]
            let sub_alias = sub_commands[1]
            commands.map_full_names.set(sub_alias, sub_fullname)

            let sub_command = undefined
            let sub_description = undefined
            let sub_save = undefined
            for (var nnk in data[k][nk]) {

                switch (nnk) {
                    case 'cmd':
                        sub_command = data[k][nk][nnk]
                        break
                    case 'description':
                        sub_description = data[k][nk][nnk]
                        break
                    case 'save':
                        sub_save = data[k][nk][nnk]
                        break
                }
            }

            if (sub_command && sub_description) {
                commands.map_commands.set(sub_fullname, sub_command)
                help_str = help_str + space.repeat(3) + sub_fullname + '|' + sub_alias + space.repeat(1) + '\t' + sub_description + '\n'
                if (sub_save) {
                    help_str = help_str + space.repeat(6) + '\t--save\t' + sub_save + '\n'
                    arr_manager_has_save.push(fullname+sub_command)
                }
            }
        }
    }

    map_managers.set(fullname, commands)
    map_managers.set(alias, commands)
}

if (!process.argv.slice(2).length) {
    console.log(help_str)
} else {
    let commandStr = process.argv[2]
    switch (commandStr) {
        case '--version':
            console.log(require('../package.json').version)
            process.exitCode = 0
            break
        case '--help':
            console.log(help_str)
            break
        case 'restore':
            // TODO: Static export to sh file?
            restoreWithAllManagers().then(
                () => {
                    process.exitCode = 0
                    console.log("\nDone restoring packages!")
            }).catch(error => {
                console.log(error)
                process.exitCode = 1
            }) 
            break
        default:        
            managerCmd(commandStr).then(
                () => {
                    process.exitCode = 0
            }).catch(error => {
                console.log(error)
                process.exitCode = 1
            })
    }
}

process.on('unhandledRejection', function(reason, promise) {
    console.log(reason)
    process.exitCode = 1
});

// Restore --------------------------------------------------------------------------
async function restoreWithAllManagers() {
    return new Promise(async resolve => {

        const managers = await getMangers()
        //console.log(managers)

        const packages = await readPackages(managers)
        //console.log(packages)

        if (packages && packages.length > 0) {
            for(const i in packages) {
                console.log(packages[i])
                const manager = Object.keys(packages[i])[0]

                let command = map_managers.get(manager);

                var str = command.map_commands.get('install-auto')
                if (!str)
                    str = command.map_commands.get('install')
                console.log(str)

                const pkgs = packages[i][manager]
                //console.log(pkgs)
                const res = await commander.cmd(parsecmd.parse(str, pkgs))
            }
        }

        resolve()
    })
}
function getMangers() {
    return new Promise(resolve => {
        var managers = []
        var c = 0
        map_managers_os.entries().forEach(async element => {
            //console.log(element)
            
            const manager = await getManagerIfSupported(element)

            if (manager) {
                //console.log(manager)
                managers.push(manager)
            }
            c++
            if (c == map_managers_os.entries().length) {
                resolve(managers)
            }
        });
    })
}
function readPackages(managers) {
    return new Promise(resolve => {
        read.packages(managers, (error, data) => {
            if (error) 
                throw new Error("Read packages failed")
            
            resolve(data)
        })
    })
}
//-----------------------------------------------------------------------------------
// Manager --------------------------------------------------------------------------
async function managerCmd(commandStr) {
    return new Promise(async resolve => {

        let manager = map_alias_managers.get(commandStr)

        if (manager === undefined) {
            manager = commandStr
        }
        let os = map_managers_os.get(manager)
        let osSupportedOn = [manager, os]
        const suppManager = await getManagerIfSupported(osSupportedOn)
        if (!suppManager)
            throw new Error("Manager is not supported here.")

        let sub_commandStr = process.argv[3]

        let command = map_managers.get(commandStr);

        var str = command.map_commands.get(sub_commandStr)
        if (str === undefined)
            str = command.map_commands.get(command.map_full_names.get(sub_commandStr))


        let pkgs = process.argv.slice(4, process.argv.length)

        let shouldSave = parsecmd.hasSave(pkgs)

        if (shouldSave && !arr_manager_has_save.includes(manager+str))
            throw new Error("Save option is not supported for this command.")

        const res = await commander.cmd(parsecmd.parse(str, pkgs))

        if (shouldSave)
            await savePkgs(manager, parsecmd.cleanPkgs(pkgs))

        resolve()
    })
}
function savePkgs(manager, pkgs) {
    return new Promise(resolve => {
        save.packages(manager, pkgs, async (error) => {
            console.log('Saving')
            if (error)
                throw new Error("Save failed")

            resolve()
        })
    })
}
//-----------------------------------------------------------------------------------
function getManagerIfSupported(managerSupportedOn) {
    return new Promise(resolve => {
        dist.getManagerIfSupported(managerSupportedOn, async (error, data) => {
            if (error)
                throw new Error("Get supported manager failed")

            resolve(data)
        })
    })
}