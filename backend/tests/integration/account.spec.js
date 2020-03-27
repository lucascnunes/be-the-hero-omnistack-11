const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('Account', () => {
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

    it('should be able to get the data from the ONG', async () => {
        // listando dados da ONG
        const response = await request(app)
            .get('/account')
            .set({ 'Authorization': '123abc' });
        // espera que o primeiro resultado da array seja
        expect(response.body).toEqual({
            name: "APAD",
            email: "apad2@apad.com.br",
            whatsapp: "3123123123",
            city: "Rio do Sul",
            uf: "SC"
        });
    });

    it('should be able to update the data of the ONG', async () => {
        const response = await request(app)
            .put('/account')
            .set({ 'Authorization': '123abc' })
            .send(
                {
                    name: "APAD NOVO NOME",
                    email: "apad2@apad.com.br",
                    whatsapp: "99999999999",
                    city: "Rio do Sul",
                    uf: "SC"
                }
            );
        // espera que o primeiro resultado da array seja
        expect(typeof response.body === 'string');
    });
});