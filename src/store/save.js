'use strict'
var storage = require('../tools/storage')

exports.packages = (manager, pkgs, callback) => {
    if (!(isString(manager) && isArrayOfStrings(pkgs))) {
        callback(new Error("Illegal Arguments"))
    } else {
        storage.get((err, json) => {
            if (err) {
                callback(err)
            } else {
                var packages = addPackages(manager, pkgs, json)
                storage.save(packages, (err) => {
                    if (err) {
                        callback(err)
                    } else {
                        callback()
                    }
                })
            }
        })
    }

}

function addPackages(manager, pkgs, json) {
    var newJson = undefined
    var pJson = json
    var pManager = undefined
    if (pJson) {
        var pManager = pJson[manager];

        if (pManager) {
            var managerPackes = pManager['packages']
        
            if (managerPackes) {
                var union = unionPackages(pkgs, managerPackes)
        
                managerPackes = union
        
                newJson = pJson
            }
        } else { 
            pJson[manager] = { 
                "packages": pkgs
            }

            newJson = pJson
        }
    } else {
        pJson = {
            [manager]: {
                "packages": pkgs
            }
        }

        newJson = pJson
    }


    return newJson
}

function unionPackages(newPackages, packages) {
    newPackages.forEach(function(pkg) {
        packages.forEach(function(pkgInArr) {
            if (pkg === pkgInArr) {
                let index = packages.indexOf(pkgInArr)
                packages.splice(index, 1);
            }
        });
        packages.push(pkg);
    });
    
    return packages;
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
