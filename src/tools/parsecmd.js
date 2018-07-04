'use strict'
var path = require("path")

exports.parse = (command, pkgs) => {
    let pluginsdir = path.resolve(__dirname, '..') + '/plugins'
    //console.log(command)
    return command.replace(/<pkgs>/g, pkgs.join(' ').trim())
                  .replace(/<plugins>/g, pluginsdir)
}
