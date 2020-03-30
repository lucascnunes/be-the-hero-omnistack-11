const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
        await connection.seed.run(); 

        await request(app)
        .post('/sessions')
        .send({
            email: "apad@apad.com.br",
            password: "123456789"
        })
        .expect(200)
        .then(res => {
            cookie = res.headers['set-cookie'][0]
        })
    }, 10000);

    afterEach(async () => {
        await connection.migrate.rollback();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able to list all ONGs', async () => {
       
        // listando todas as ONGs
        await request(app)
            .get('/ongs')
            .then(response => {
                expect(response.body[0]).toHaveProperty('id', 1);
                expect(response.body[0]).toHaveProperty('name', "APAD");
                expect(response.body[0]).toHaveProperty('email', "apad@apad.com.br");
                expect(response.body[0]).toHaveProperty('whatsapp', "3123123123");
                expect(response.body[0]).toHaveProperty('city', "Rio do Sul");
                expect(response.body[0]).toHaveProperty('uf', "SC");

            });
    });
    
    it('should be able to create a new ONG', async () => {
        // criando uma ONG
        await request(app)
            .post('/ongs')
            .send({
                name: "APAD 2",
                email: "apad2@apad.com.br",
                whatsapp: "3123123123",
                city: "Rio do Sul",
                uf: "SC",
                password: "123456789"
            })
            .then(response => {
                expect(response.body).toHaveProperty('name', "APAD 2");
                expect(response.body).toHaveProperty('expire_at');
            });
    });

    it('should be able to delete the ONG', async () => {
        // deletando a ONG passando o cabeçalho de authorization com a key
        await request(app)
            .delete('/ongs')
            .set({ 'Cookie': cookie })
            .then(response => {
                expect(response.status).toBe(204);
            });
    });
});