process.env.NODE_ENV = 'test';
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect
var jsonFile = require("jsonfile");
const storage = require('../tools/storage');

describe('Method should succeed (tools/storage)', () => { 
    it('save should succed', (done) => {
        sinon
        .stub(jsonFile, 'writeFile')
        .yields(null);
        storage.save(["pkg", "pkg2"], function(err) {
            jsonFile.writeFile.restore();
            expect(err).to.be.null;
            done();
        });
    });

    it('get should succeed', (done) => {
        var obj = {name: 'JP'}
        sinon
        .stub(jsonFile, 'readFile')
        .yields(null, obj);
        storage.get(function(err, file) {
            jsonFile.readFile.restore();
            expect(err).to.be.null;
            expect(file).to.be.equal(obj);
            done();
        });
    });
});