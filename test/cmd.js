process.env.NODE_ENV = 'test';
const request = require('supertest');
const cmd = require('../tools/cmd');

describe('Methods should exist (tools/cmd)', () => {
    it('run should be called', (done) => {
        cmd.run("ls", function(err) {
            done();
        })
    });
});
