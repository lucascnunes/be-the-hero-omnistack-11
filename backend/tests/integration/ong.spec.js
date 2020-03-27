const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
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

    it('should be able to list all ONGs', async () => {
       
        // listando todas as ONGs
        const response = await request(app)
            .get('/ongs');
        // espera que o primeiro resultado da array seja
        expect(response.body).toEqual([
            {
                // id gerado no SEED de ONG
                id: 1,
                // a key gerada no SEED de ONG
                key: '123abc',
                name: "APAD",
                email: "apad2@apad.com.br",
                whatsapp: "3123123123",
                city: "Rio do Sul",
                uf: "SC"
            }
        ]);
    });
    
    it('should be able to create a new ONG', async () => {
        // criando uma ONG
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "APAD",
                email: "apad2@apad.com.br",
                whatsapp: "3123123123",
                city: "Rio do Sul",
                uf: "SC"
            });
        expect(response.body).toHaveProperty('key');
        expect(response.body.key).toHaveLength(8);
    });

    it('should be able to delete the ONG', async () => {
        // deletando a ONG passando o cabeçalho de authorization com a key
        const deleteResponse = await request(app)
            .delete('/ongs')
            .set({ 'Authorization': '123abc' });
        expect(deleteResponse.status).toBe(204);
    });
});