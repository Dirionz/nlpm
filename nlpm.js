#!/usr/bin/env node
'use strict'
process.env.NODE_ENV = 'debug';

const Commands = require('./src/models/Commands.js')

const commander = require('./src/tools/commander.js')
const parsecmd = require('./src/tools/parsecmd.js')
const dist = require('./src/dist/dist')

const fs = require('fs');
const yaml = require('js-yaml');
const HashMap = require('hashmap');

var data = yaml.safeLoad(fs.readFileSync('./nlpm.yml', 'utf8'));

// TODO: read user yml and append it to data.

let space = '      ';
let help_command_title = '\n  Commands:\n\n'
var help_str = help_command_title

var map_managers = new HashMap()
var map_alias_managers = new HashMap()
var map_managers_os = new HashMap()

for (var k in data) {

    let commands = new Commands()

    let cmds = k.split('|')
    let fullname = cmds[0]
    let alias = cmds[1]
    map_alias_managers.set(alias, fullname);
    var count = 0
    help_str = help_str + space + fullname + '\n'
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
                help_str = help_str + space.repeat(2) + sub_fullname + '|' + sub_alias + '\t' + sub_description + '\n'
                if (sub_save) {
                    help_str = help_str + space.repeat(3) + '\t--save\t' + sub_save + '\n'
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
            console.log(require('./package.json').version)
            process.exitCode = 0
            break
        case '--help':
            console.log(help_str)
            break
        case 'restore':
            //console.log('restore')
            //console.log(map_managers_os)

            restoreWithAllManagers().then(
                () => {
                    process.exitCode = 0
                    console.log("Done restoring packages!")
            }).catch(error => {
                console.log(error)
                process.exitCode = 1
            }) 
            break
        default:

            let manager = map_alias_managers.get(commandStr)
            if (manager === undefined) {
                manager = commandStr
            }

            let os = map_managers_os.get(manager)

            // FIXME check os here

            let sub_commandStr = process.argv[3]

            let command = map_managers.get(commandStr);

            var str = command.map_commands.get(sub_commandStr)
            if (str === undefined)
                str = command.map_commands.get(command.map_full_names.get(sub_commandStr))


            let pkgs = process.argv.slice(4, process.argv.length)

            commander.cmd(parsecmd.parse(str, pkgs)).then((result) => {
                process.exitCode = 0
                // FIXME Save pkgs
            }, (err) => {
                console.log(err)
                process.exitCode = 1
            })

    }
}

// Restore --------------------------------------------------------------------------
async function restoreWithAllManagers() {

    var c = 0
    map_managers_os.entries().forEach(element => {
        console.log(element)

        dist.getManagerIfSupported()

        if (true || isSupported(element)) {
            console.log(element[0])
        }
        var l = afterTwoSeconds(10)
        await l
        console.log(l)
        c++
        console.log(c)
    });


            // FIXME: get array like managers = [ 'apt', 'npm' ]
            // pass it to read.packages(managers)

    //return sumTwentyAfterTwoSeconds(20)
}
async function sumTwentyAfterTwoSeconds(value) {
  const remainder = afterTwoSeconds(20)
  return value + await remainder
}
function afterTwoSeconds(value) {
  return new Promise(resolve => {
    setTimeout(() => { resolve(value) }, 2000);
  });
}
//-----------------------------------------------------------------------------------