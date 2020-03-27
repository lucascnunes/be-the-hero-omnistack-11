const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('Session', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
        await connection.seed.run(); 
    }, 10000);

    afterEach(async () => {
        await connection.migrate.rollback();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able to login as an ONG', async () => {
        // entrando como a ONG
        const response = await request(app)
            .post('/sessions')
            .send({
                key: '123abc',
            });
        expect(typeof response.body === 'string')
    });
});