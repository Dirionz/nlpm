process.env.NODE_ENV = 'test';
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect
var jsonFile = require("jsonfile");
const storage = require('../tools/storage');

describe('Method should succeed (tools/storage)', () => {
    before(function() {
        sinon
            .stub(jsonFile, 'writeFile')
            .yields(null);
    });

    after(function(){
        jsonFile.writeFile.restore();
    });
    
    it('save should be succed', (done) => {
        storage.save(["pkg", "pkg2"], function(err) {
            expect(err).to.be.null;
            done();
        });
    });
});

describe('Method should succeed (tools/storage)', () => {
    var obj = {name: 'JP'}
    before(function() {
        sinon
            .stub(jsonFile, 'readFile')
            .yields(null, obj);
    });

    after(function(){
        jsonFile.readFile.restore();
    });

    it('get should be succeed', (done) => {
        storage.get(function(err, file) {
            expect(err).to.be.null;
            expect(file).to.be.equal(obj);
            done();
        });
    });
});