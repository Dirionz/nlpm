'use strict'

const gos = require('../config/getos')
const config = require('../config/config')

exports.getManagerIfSupported = (managerSupportedOn, callback) => {
    if (!(Array.isArray(managerSupportedOn) 
        && managerSupportedOn.length >= 2
        && isString(managerSupportedOn[0])
        && isArrayOfStrings(managerSupportedOn[1]))) {
        callback(new Error("Illegal Arguments"))
    } else {
        gos.getos(function(e,os) {
            if(e) return callback(e)
            
            const cfg = config.get()
            const dist = config.translateIfPossible(os.dist, cfg)
            if (dist)
                os.dist = dist

            const distArr = managerSupportedOn[1]

            var manager = undefined

            if (distArr.length == 1 && distArr[0] === '-') {
                manager = managerSupportedOn[0]
            } else if (arrayContains(os.dist, distArr)) {
                manager = managerSupportedOn[0]
            }

            callback(null, manager)
        })
    }
}

function arrayContains(needle, arrhaystack) {
    return (arrhaystack.indexOf(needle) > -1);
}

function isArrayOfStrings(arr) {
    if (!Array.isArray(arr)) {
        return false
    }
    arr.forEach(function(value) {
        if (!isString(value)) {
            return false
        }
    });

    return true
}

function isString(str) {
    return typeof str === 'string' || str instanceof String
}