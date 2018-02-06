process.env.NODE_ENV = 'test';

const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect

var dist = require('./dist')
const getos = require('../config/getos')
const config = require('../config/config')


describe('Dist.isSupported(managerSupportedOn, callback)', () => {
    before(function() {
    });
    it('should return illigal arguments when passes wrong values', (done) => {
        var managerSupportedOn = [ 1, [ 'Ubuntu Linux' ]]

        dist.getManagerIfSupported(managerSupportedOn, (err) => {
            if (err) {
                expect(err.describe).to.equal(new Error("Illegal Arguments").describe)
                done()
            }

            throw new Error("Should be an error")
        })
   
    });
    it('should call getos once', (done) => {
        var getos_getos = sinon.spy(getos, 'getos')

        sinon
            .stub(config, 'get')
            .returns(JSON.parse('{"packageDir":"/home/dirionz/.config/nlpm/packages.json","gitAppDir":"/home/dirionz/Apps/","aptDistros":["Ubuntu Linux"],"aptExtraDistros":["Linux Mint"],"pacmanDistros":["Arch Linux"],"pacmanExtraDistros":[]}'))

        var managerSupportedOn = [ 'apt', [ 'Ubuntu Linux' ]]

        dist.getManagerIfSupported(managerSupportedOn, (err, data) => {
            config.get.restore()
            getos_getos.restore()
            if (err) {
                throw new Error("Should not be an error")
            }

            sinon.assert.calledOnce(getos_getos)

            done()
        })

    });
    it('should return apt manager if distro is defined', (done) => {

        sinon
            .stub(config, 'get')
            .returns(JSON.parse('{"packageDir":"/home/dirionz/.config/nlpm/packages.json","gitAppDir":"/home/dirionz/Apps/","aptDistros":["Ubuntu Linux"],"aptExtraDistros":["Linux Mint"],"pacmanDistros":["Arch Linux"],"pacmanExtraDistros":[]}'))

        var os = JSON.parse('{"os":"linux","dist":"Ubuntu Linux","codename":"xenial","release":"16.04"}')

        sinon
        .stub(getos, 'getos')
        .yields(null, os);

        var managerSupportedOn = [ 'apt', [ 'Ubuntu Linux' ]]

        dist.getManagerIfSupported(managerSupportedOn, (err, data) => {
            config.get.restore()
            getos.getos.restore()
            if (err) {
                throw new Error("Should not be an error")
            }

            expect(data).to.equal(managerSupportedOn[0])

            done()
        })

    });
    it('should return apt manager if user distro is defined', (done) => {

        sinon
        .stub(config, 'get')
        .returns(JSON.parse('{"packageDir":"/home/dirionz/.config/nlpm/packages.json","gitAppDir":"/home/dirionz/Apps/","aptDistros":["Ubuntu Linux"],"aptExtraDistros":["Linux Mint"],"pacmanDistros":["Arch Linux"],"pacmanExtraDistros":[]}'))

        var os = JSON.parse('{"os":"linux","dist":"Linux Mint","codename":"xenial","release":"16.04"}')

        sinon
        .stub(getos, 'getos')
        .yields(null, os);

        var managerSupportedOn = [ 'apt', [ 'Ubuntu Linux' ]]

        dist.getManagerIfSupported(managerSupportedOn, (err, data) => {
            config.get.restore()
            getos.getos.restore()
            if (err) {
                throw new Error("Should not be an error")
            }

            expect(data).to.equal(managerSupportedOn[0])

            done()
        })

    });
    it('should return brew manager if distro is defined (macos)', (done) => {

        sinon
            .stub(config, 'get')
            .returns(JSON.parse('{"packageDir":"/home/dirionz/.config/nlpm/packages.json","gitAppDir":"/home/dirionz/Apps/","aptDistros":["Ubuntu Linux"],"aptExtraDistros":["Linux Mint"],"pacmanDistros":["Arch Linux"],"pacmanExtraDistros":[]}'))

        var os = JSON.parse('{"os":"darwin"}')

        sinon
        .stub(getos, 'getos')
        .yields(null, os);

        var managerSupportedOn = [ 'brew', [ 'darwin' ]]

        dist.getManagerIfSupported(managerSupportedOn, (err, data) => {
            config.get.restore()
            getos.getos.restore()
            if (err) {
                throw new Error("Should not be an error")
            }

            expect(data).to.equal(managerSupportedOn[0])

            done()
        })

    });
    it('should return npn manager if all distos is ok', (done) => {

        sinon
        .stub(config, 'get')
        .returns(JSON.parse('{"packageDir":"/home/dirionz/.config/nlpm/packages.json","gitAppDir":"/home/dirionz/Apps/","aptDistros":["Ubuntu Linux"],"aptExtraDistros":["Linux Mint"],"pacmanDistros":["Arch Linux"],"pacmanExtraDistros":[]}'))

        var os = JSON.parse('{"os":"linux","dist":"Ubuntu Linux","codename":"xenial","release":"16.04"}')

        sinon
        .stub(getos, 'getos')
        .yields(null, os);

        var managerSupportedOn = [ 'npm', [ '-' ]]

        dist.getManagerIfSupported(managerSupportedOn, (err, data) => {
            config.get.restore()
            getos.getos.restore()
            if (err) {
                throw new Error("Should not be an error")
            }

            expect(data).to.equal(managerSupportedOn[0])

            done()
        })

    });
    it('should return not return pacman manager if on ubuntu', (done) => {

        sinon
        .stub(config, 'get')
        .returns(JSON.parse('{"packageDir":"/home/dirionz/.config/nlpm/packages.json","gitAppDir":"/home/dirionz/Apps/","aptDistros":["Ubuntu Linux"],"aptExtraDistros":["Linux Mint"],"pacmanDistros":["Arch Linux"],"pacmanExtraDistros":[]}'))

        var os = JSON.parse('{"os":"linux","dist":"Ubuntu Linux","codename":"xenial","release":"16.04"}')

        sinon
        .stub(getos, 'getos')
        .yields(null, os);

        var managerSupportedOn = [ 'pacman', [ 'Arch Linux' ]]

        dist.getManagerIfSupported(managerSupportedOn, (err, data) => {
            config.get.restore()
            getos.getos.restore()
            if (err) {
                throw new Error("Should not be an error")
            }

            expect(data).to.be.undefined

            done()
        })

    });
});

