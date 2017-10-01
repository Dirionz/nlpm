process.env.NODE_ENV = 'test';
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect
var cmd=require('../tools/cmd');
var pacman=require('../tools/pacman');

// TODO: Check if on arch linux

describe('Method should succeed (tools/pacman)', () => {
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
        pacman.restore(pkg, function(err) {
            expect(err).to.be.undefined;
            done();
        });
    });
});

describe('Pacman should exist (tools/pacman)', () => {
    before(function() {
        sinon
            .stub(cmd, 'run')
            .yields(null, 'help output');
    });
    after(function() { 
        cmd.run.restore();
    })

    it('Will find pacman installed', (done) => {
        pacman.exists(function(exists) {
            expect(exists).to.be.true;
            done();
        })
    });
});

describe('Pacman should not exist (tools/pacman)', () => {
    before(function() {
        sinon
            .stub(cmd, 'run')
            .yields('command not found', null);
    });
    after(function() { 
        cmd.run.restore();
    })

    it('Will not find pacman installed', (done) => {
        pacman.exists(function(exists) {
            expect(exists).to.be.false;
            done();
        })
    });
})