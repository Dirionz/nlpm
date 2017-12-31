process.env.NODE_ENV = 'test';
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect
var cmd=require('../tools/cmd');
var npm=require('../tools/npm');

describe('Method should succeed (tools/npm)', () => {
    const testData = "data";
    const pkg = "pkg";

    before(function() {
        sinon
            .stub(cmd, 'start')
            .yields(null, testData);
    });

    after(function(){
        cmd.start.restore();
    });

    it('install should succed', (done) => {
        npm.restore([pkg], function(err) {
            expect(err).to.be.undefined;
            done();
        });
    });
});
