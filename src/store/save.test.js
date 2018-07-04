process.env.NODE_ENV = 'test';

const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect

var jsonfile = require('jsonfile')
var storage = require('../tools/storage')
var save = require('./save')

describe('Save.packages(manager, pkgs, callback)', () => {
    before(function() {
        sinon
            .stub(jsonfile, 'readFile')
            .yields(null, '{ "apt": { "packages": [ "curl", "perl" ] }, "brew cask": { "packages": [ "android-studio" ] } }');
    });

    it('should call save once', (done) => {
        var storage_save = sinon.spy(storage, 'save')

        var manager = "apt"
        var pkgs = ["node"]

        save.packages(manager, pkgs, (err) => {
            storage_save.restore()
            if (err) {
                throw err
            }
            sinon.assert.calledOnce(storage_save)

            done();
        })

    });
    it('should pass object with correct values to storage.save', (done) => {
        var storage_save = sinon.spy(storage, 'save')
        var packages = JSON.parse('{ "apt": { "packages": [ "curl", "perl", "node" ] }, "brew cask": { "packages": [ "android-studio" ] } }')

        var manager = "apt"
        var pkgs = ["node"]


        save.packages(manager, pkgs, (err) => {
            storage_save.restore()
            if (err) {
                throw err
            }
            sinon.assert.calledWith(storage_save, packages)

            done()
        })

    });
    it('should create new manager if not exist' , (done) => {
        var storage_save = sinon.spy(storage, 'save')
        var packages = JSON.parse('{ "apt": { "packages": [ "curl", "perl" ] }, "brew cask": { "packages": [ "android-studio" ] }, "brew": { "packages": [ "node" ] } }')

        var manager = "brew"
        var pkgs = ["node"]

        save.packages(manager, pkgs, (err) => {
            storage_save.restore()
            if (err) {
                throw err
            }

            sinon.assert.calledWith(storage_save, packages)
            
            done()
        })
    });
    it('should create new manager if not exist (empty file)' , (done) => {
        var storage_save = sinon.spy(storage, 'save')
        sinon
            .stub(storage, 'get')
            .yields(null, '""');
        var packages = JSON.parse('{"brew": { "packages": [ "node" ] } }');

        var manager = "brew"
        var pkgs = ["node"]

        save.packages(manager, pkgs, (err) => {
            storage_save.restore()
            storage.get.restore()
            if (err) {
                throw err
            }

            sinon.assert.calledWith(storage_save, packages)
            
            done()
        })
    });
    it('should return illigal arguments when passes wrong values', (done) => {
        var storage_save = sinon.spy(storage, 'save')
    
        var manager = ["asdfasdf"]
        var pkgs = "node"
        
        save.packages(manager, pkgs, (err) => {
            storage_save.restore()
            if (err) {
                expect(err.describe).to.equal(new Error("Illegal Arguments").describe)
                done()
            }

            throw new Error("Should be an error")
        })
   
    });
    after(function() {
        jsonfile.readFile.restore()
    });
});
