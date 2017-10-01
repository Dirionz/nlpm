process.env.NODE_ENV = 'test';
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect
var cmd=require('../tools/cmd');
var apt=require('../tools/apt');

// TODO: Check if on Ubutntu/Debian

describe('Method should succeed (tools/apt)', () => {
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

    it('install should succeed', (done) => {
        apt.restore(pkg, function(err) {
            expect(err).to.be.undefined;
            done();
        });
    });
});

describe('Apt should exist (tools/apt)', () => {
    before(function() {
        sinon
            .stub(cmd, 'run')
            .yields(null, 'help output');
    });
    after(function() { 
        cmd.run.restore();
    })

    it('Will find apt installed', (done) => {
        apt.exists(function(exists) {
            expect(exists).to.be.true;
            done();
        })
    });
});

describe('Apt should not exist (tools/apt)', () => {
    before(function() {
        sinon
            .stub(cmd, 'run')
            .yields('command not found', null);
    });
    after(function() { 
        cmd.run.restore();
    })

    it('Will not find apt installed', (done) => {
        apt.exists(function(exists) {
            expect(exists).to.be.false;
            done();
        })
    });
})