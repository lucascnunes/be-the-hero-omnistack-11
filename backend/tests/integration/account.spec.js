const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('Account', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
        await connection.seed.run(); 

        // fazendo login para obter o cookie nos requests futuros
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

    it('should be able to get the data from the ONG', async () => {
        // listando dados da ONG
        await request(app)
            .get('/account')
            .set('Cookie', cookie)
            .then((response) => {
                expect(response.body).toHaveProperty("name", "APAD");
                expect(response.body).toHaveProperty("email", "apad@apad.com.br");
                expect(response.body).toHaveProperty("whatsapp", "3123123123");
                expect(response.body).toHaveProperty("city", "Rio do Sul");
                expect(response.body).toHaveProperty("uf", "SC");
            });
    });

    it('should be able to update the data of the ONG', async () => {
        // atualizando informações da ONG
        await request(app)
            .put('/account')
            .set('Cookie', cookie)
            .send(
                {
                    name: "APAD NOVO NOME",
                    email: "apad@apad.com.br",
                    whatsapp: "99999999999",
                    city: "Rio do Sul",
                    uf: "SC"
                }
            ).then((response) => {
                expect(typeof response.body === 'APAD NOVO NOME');
            });
    });
});