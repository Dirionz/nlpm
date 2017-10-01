process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../app.js');

describe('Base', () => {
    it('should return true', (done) => {
        done();
    });
});
