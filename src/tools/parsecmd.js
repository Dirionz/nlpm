'use strict'
var path = require("path")

exports.parse = (command, pkgs) => {
    let pluginsdir = path.resolve(__dirname, '..') + '/plugins'
    //console.log(command)
    return command.replace(/<pkgs>/g, pkgs.join(' ').trim())
                  .replace(/<plugins>/g, pluginsdir)
                  .replace(/--save/g, "")
                  .replace(/  /g, " ")
}

exports.hasSave = (pkgs) => {
    let matched = pkgs.join(' ').trim().match(/--save/g)
    if (matched) {
        return matched.length > 0
    } else {
        return false
    }
}
exports.cleanPkgs = (pkgs) => {
    let pkgsStr = pkgs.join(' ').trim()

    return pkgsStr.replace(/--save/g, "")
                  .replace(/  /g, " ")
                  .trim()
                  .split(" ")
}
