'use strict'
var storage = require('../tools/storage')

exports.packages = (managers, callback) => {
    if (!isArrayOfStrings(managers)) {
        callback(new Error("Illegal Arguments"))
    } else {
        storage.get((err, json) => {
            if (err) {
                callback(err)
            } else {
                callback(null, filter(json, managers))
            }
        })
    }
}

function filter(json, managers) {
    var filteredManagers = []

    var pJson = JSON.parse(json)
    if (pJson) {
        for (var key in pJson) {
            if (pJson.hasOwnProperty(key)) {
                //console.log(key + " -> " + pJson[key]);
                if (hasKey(managers, key)) {
                    filteredManagers.push({
                        [key]: pJson[key]['packages']
                    })
                }
            }
        }
    }

    return filteredManagers
}

function hasKey(managers, key) {
    var b = false
    if (managers.length > 0) {
        managers.forEach(function(manager) {
            if (manager === key) {
                b = true
                return
            }
        })
    }

    return b
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
