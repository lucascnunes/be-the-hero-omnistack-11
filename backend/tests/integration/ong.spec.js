const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
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

    it('should be able to list all ONGs', async () => {
        // criando ONG
        const createResponse = await request(app)
            .post('/ongs')
            .send({
                name: "APAD",
                email: "apad2@apad.com.br",
                whatsapp: "3123123123",
                city: "Rio do Sul",
                uf: "SC"
            });
        expect(createResponse.body).toHaveProperty('key');
        expect(createResponse.body.key).toHaveLength(8);

        // listando todas as ONGs
        const response = await request(app)
            .get('/ongs');
        expect(response.body).toEqual([
            {
                // id que é gerado no banco de dados não é enviado na hora de criar mas quando recebe
                id: 1,
                // a key gerada antes de enviar ao banco de dados que não é enviada na hora de criar
                key: createResponse.body.key,
                name: "APAD",
                email: "apad2@apad.com.br",
                whatsapp: "3123123123",
                city: "Rio do Sul",
                uf: "SC"
            }
        ]);
    });

    it('should be able to delete the ONG', async () => {
        // criando uma ONG
        const createResponse = await request(app)
            .post('/ongs')
            .send({
                name: "APAD",
                email: "apad2@apad.com.br",
                whatsapp: "3123123123",
                city: "Rio do Sul",
                uf: "SC"
            });
        expect(createResponse.body).toHaveProperty('key');
        expect(createResponse.body.key).toHaveLength(8);
        // separando a key dela
        const key = createResponse.body.key;

        // deletando a ONG passando o cabeçalho de authorization com a key
        const deleteResponse = await request(app)
            .delete('/ongs')
            .set({ 'Authorization': key });
        expect(deleteResponse.status).toBe(204);
    });
});