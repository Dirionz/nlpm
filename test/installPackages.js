process.env.NODE_ENV = 'test';
const request = require('supertest');
const sinon = require('sinon')
const chai = require('chai');
const expect = chai.expect
const installController = require('../controllers/installPackages');
const storage = require('../tools/storage');
const brew = require('../tools/brew');
const npm = require('../tools/npm');
const pacman = require('../tools/pacman');

describe('Controller Method should exist', () => {
    it('install should be called', (done) => {
        installController.install(); // Returns pkg cannot be null
        done();
    });
});

describe('Controller Method install should succeed', () => {
    before(function() {
        sinon
            .stub(storage, 'get')
            .yields(null, [
                {
                    "name": "brew",
                    "packages": [
                    {
                        "name": "node"
                    },
                    {
                        "name": "curl"
                    }
                    ]
                }
                ]);
        sinon
            .stub(storage, 'save')
            .yields(null);
        sinon
            .stub(brew, 'install')
            .yields(null);
        sinon
            .stub(npm, 'install')
            .yields(null);
        sinon
            .stub(pacman, 'install')
            .yields(null);
    });

    after(function(){
        storage.get.restore();
        storage.save.restore();
        brew.install.restore();
        npm.install.restore();
        pacman.install.restore();
    });

    it('install should succeed', (done) => {
        installController.install(["packagethatdontexist"], true, false, "brew", function(err) {
            expect(err).to.be.not.null;
            done();
        });
    });
});
