process.env.NODE_ENV = 'test';
const request = require('supertest');
const sinon = require('sinon')
const chai = require('chai');
const expect = chai.expect
const restoreController = require('../controllers/restorePackages');
const storage = require('../tools/storage');
const brew = require('../tools/brew');
const npm = require('../tools/npm');
const pacman = require('../tools/pacman');

describe('Controller Method restore should succeed', () => {
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
            .stub(brew, 'restore')
            .yields(null);
        sinon
            .stub(npm, 'restore')
            .yields(null);
        sinon
            .stub(pacman, 'restore')
            .yields(null);
    });

    after(function(){
        storage.get.restore();
        brew.restore.restore();
        npm.restore.restore();
        pacman.restore.restore();
    });

    it('restore should be succeed', (done) => {
        restoreController.restore(function(err) {
            expect(err).to.be.undefined;
            done();
        });
    });
});
