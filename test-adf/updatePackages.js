process.env.NODE_ENV = 'test';
const request = require('supertest');
const sinon = require('sinon')
const chai = require('chai');
const expect = chai.expect
//const updateController = require('../controllers/updatePackages');
//const storage = require('../tools/storage');
//const brew = require('../tools/brew');
//const npm = require('../tools/npm');
//const apt = require('../tools/apt');
//const pacman = require('../tools/pacman');
//const aur = require('../tools/aur');
//
//describe('Controller Method update should succeed', () => {
//    before(function() {
//        sinon
//            .stub(storage, 'get')
//            .yields(null, [
//                {
//                    "name": "brew",
//                    "packages": [
//                    {
//                        "name": "node"
//                    },
//                    {
//                        "name": "curl"
//                    }
//                    ]
//                }
//                ]);
//        sinon
//            .stub(brew, 'update')
//            .yields(null);
//        sinon
//            .stub(apt, 'update')
//            .yields(null);
//        sinon
//            .stub(npm, 'update')
//            .yields(null);
//        sinon
//            .stub(pacman, 'update')
//            .yields(null);
//        sinon
//            .stub(aur, 'update')
//            .yields(null);
//    });
//
//    after(function(){
//        storage.get.restore();
//        brew.update.restore();
//        npm.update.restore();
//        pacman.update.restore();
//        apt.update.restore();
//        aur.update.restore();
//    });
//
//    it('restore should be succeed', (done) => {
//        updateController.update(function(err) {
//            expect(err).to.be.undefined;
//            done();
//        });
//    });
//});
