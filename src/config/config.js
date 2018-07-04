'use strict'

const _ = require('underscore');
const yaml = require('js-yaml');
const fs = require('fs');
const mkdirp = require('mkdirp');
const getDirName = require('path').dirname;
const configFilePath=process.env.HOME+'/.config/nlpm/config.yml';


var config;

exports.get = () => {
    if (config) {
        return config;
    }
    try {
        var configData = yaml.safeLoad(fs.readFileSync(configFilePath, 'utf8'));
        //console.log(configData.packageDir);
        config = Config.initWithData(configData);
        //console.log(config.packageDir);
        return config;
    } catch (err) {
        //console.log('Error:'+err.code);
        if (err.code === 'ENOENT') {
            console.log('File not found!');
            mkdirp(getDirName(configFilePath), function (err) {
                if (err) return callback(err);
                var contents = "";
                fs.writeFile(configFilePath, contents, (err) => {});
            });
        } else {
            console.log('Error in config file!');
            throw err;
        }
    }
    return new Config();
}

class Config {
    constructor() {
        this.packageDir = process.env.HOME+"/.packages.json"; 
        this.gitAppDir = process.env.HOME+"/Apps/"; 
        this.aptDistros = ["Ubuntu Linux"];
        this.aptExtraDistros = [];
        this.pacmanDistros = ["Arch Linux"];
        this.pacmanExtraDistros = [];
    }

    static initWithData(configData) {
        let config = new Config();
        if (configData) {
            if (configData.packageDir) {
                config.packageDir = configData.packageDir.replace('~', process.env.HOME);
            } else {
                config.packageDir = process.env.HOME+"/.packages.json";
            }

            if (configData.gitAppDir) {
                config.gitAppDir = configData.gitAppDir.replace('~', process.env.HOME);
            } else {
                config.gitAppDir = process.env.HOME+"/Apps/"; 
            }

            config.aptExtraDistros = configData.aptExtraDistros || [];
            config.pacmanExtraDistros = configData.pacmanExtraDistros || [];
        }
        return config;
    }

    hasApt(os) {
        Array.prototype.push.apply(this.aptDistros, this.aptExtraDistros);
        return _.contains(this.aptDistros, os.dist)
    }

    hasPacman(os) {
        Array.prototype.push.apply(this.pacmanDistros, this.pacmanDistros);
        return _.contains(this.pacmanDistros, os.dist)
    }
    
}

exports.translateIfPossible = (dist, cfg) => {
    if (arrayContains(dist, cfg.aptDistros) || arrayContains(dist, cfg.aptExtraDistros)) {
        return 'Ubuntu Linux'
    } else if (arrayContains(dist, cfg.pacmanDistros) || arrayContains(dist, cfg.pacmanExtraDistros)) {
        return 'Arch Linux'
    } else {
        return undefined
    }
}

function arrayContains(needle, arrhaystack) {
    return (arrhaystack.indexOf(needle) > -1);
}
