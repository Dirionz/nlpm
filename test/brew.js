process.env.NODE_ENV = 'test';
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect
var cmd=require('../tools/cmd');
var brew=require('../tools/brew');

describe('Method should succeed (tools/brew)', () => {
    const testData = "data";
    const pkg = "pkg";

    before(function() {
        sinon
            .stub(cmd, 'run')
            .yields(null, testData);
    });

    after(function(){
        cmd.run.restore();
    });

    it('install should succed', (done) => {
        brew.restore(pkg, function(err) {
            expect(err).to.be.undefined;
            done();
        });
    });
});
