'use strict'

const Package = require("./Package")

class Manager {
    constructor() {
        this.name = ""; 
        this.packages = [];
    }
    static initWithName(name, packages) {
        let manager = new Manager();
        manager.name = name;
        manager.packages = packages;
        return manager;
    }

    static initWithData(managerData) {
        let manager = new Manager();
        manager.name = managerData.name;

        var packages = [];
        managerData.packages.forEach(function(packageData) {
            var pkg = Package.initWithData(packageData);
            packages.push(pkg);
        }, this);

        manager.packages = packages;

        return manager;
    }

    getPackagesString() {
        return this.packages.map(x => x.name).join(',').replace(/,/g, ' ');
    }

    static unionPackages(newPackages, packages) {
        newPackages.forEach(function(pkg) {
            packages.forEach(function(pkgInArr) {
                if (pkg.name === pkgInArr.name) {
                    let index = packages.indexOf(pkgInArr)
                    packages.splice(index, 1);
                }
            });
            packages.push(pkg);
        });
        
        return packages;
    }
}

module.exports = Manager;
