'use strict'

class Package {
    constructor() {
        this.name = ""; 
        this.os = undefined;
        //this.repo = "";
        // TODO: repos? this.repo = "";
    }
    static initWithName(name) {
        let pkg = new Package();
        pkg.name = name;
        return pkg;
    }
    static initWithName(name, os) {
        let pkg = new Package();
        pkg.name = name;
        pkg.os = os;
        //pkg.repo = repo;
        return pkg;
    }

    static initWithData(packageData) {
        let pkg = new Package();
        pkg.name = packageData.name;
        pkg.os = packageData.os;
        //pkg.repo = packageData.repo;
        return pkg;
    }
}

module.exports = Package;
