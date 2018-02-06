process.env.NODE_ENV = 'test';

const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect

var jsonfile = require('jsonfile')
var storage = require('../tools/storage')
var read = require('./read')

describe('Read.packages(os, callback)', () => {
    before(function() {
        sinon
            .stub(jsonfile, 'readFile')
            .yields(null, JSON.parse('{ "apt": { "packages": [ "curl", "perl" ] }, "brew cask": { "packages": [ "android-studio" ] } }'));
    });

    it('should call get once', (done) => {
        var storage_get = sinon.spy(storage, 'get')

        var managers = ["apt"]

        read.packages(managers, (err) => {
            storage_get.restore()
            if (err) {
                throw err
            }
            sinon.assert.calledOnce(storage_get)

            done();
        })

    });
    it('should return illigal arguments when passes wrong values', (done) => {
        var storage_read = sinon.spy(storage, 'get')
    
        var managers = "apt"
        
        read.packages(managers, (err) => {
            storage_read.restore()
            if (err) {
                expect(err.describe).to.equal(new Error("Illegal Arguments").describe)
                done()
            }

            throw new Error("Should be an error")
        })
   
    });
    it('should return empty array if not passed any managers', (done) => {
        sinon
            .stub(storage, 'get')
            .yields(null, JSON.parse('{ "apt": { "packages": [ "curl", "perl" ] }, "brew cask": { "packages": [ "android-studio" ] } }'));
        var managers = []
        
        read.packages(managers, (err, managersArray) => {
            storage.get.restore()
            expect(err).to.equal(null)
            expect(managersArray.length).to.equal(0)
            done()
        })
   
    });
    it('should return apt managerArray', (done) => {
        var managers = [ 'apt' ]
        sinon
            .stub(storage, 'get')
            .yields(null, JSON.parse('{ "apt": { "packages": [ "curl", "perl" ] }, "brew cask": { "packages": [ "android-studio" ] } }'));
        
        read.packages(managers, (err, managersArray) => {
            storage.get.restore()
            expect(err).to.equal(null)
            expect(managersArray.length).to.equal(1)
            expect(managersArray[0]['apt'][0]).to.equal(JSON.parse('[{"apt":[ "curl", "perl" ]}]')[0]['apt'][0])
            done()
        })
   
    });
    after(function() {
        jsonfile.readFile.restore()
    });
});

