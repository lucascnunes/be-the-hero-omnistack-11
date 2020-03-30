const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('Incidents', () => {
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

    it('should be able to show all incidents', async () => {
  
        await request(app)
            .get('/incidents')
            .then((response) => {
                expect(response.body[0]).toHaveProperty("id", 1);
                expect(response.body[0]).toHaveProperty("title", "Lorem ipsum dolor sit");
                expect(response.body[0]).toHaveProperty("description", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus voluptatem error itaque eum assumenda cumque ullam cupiditate quod, libero veritatis id consequatur dignissimos facilis quae tenetur alias temporibus esse numquam!");
                expect(response.body[0]).toHaveProperty("value", 999);
                expect(response.body[0]).toHaveProperty("ongs_id", 1);
                expect(response.body[0]).toHaveProperty("name", 'APAD');
                expect(response.body[0]).toHaveProperty("email", "apad@apad.com.br");
                expect(response.body[0]).toHaveProperty("whatsapp", "3123123123");
                expect(response.body[0]).toHaveProperty("city", "Rio do Sul");
                expect(response.body[0]).toHaveProperty("uf", "SC");
                expect(response.body[0]).toHaveProperty("created_at");
                expect(response.body[0]).toHaveProperty("updated_at");
            })
    });

    it('should be able to create a new incident', async () => {
        const createIncidentResponse = await request(app)
            .post('/incidents')
            .set({ 'Cookie': cookie })
            .send({
                // a id gerada na criação do incident no SEED
                title: "Lorem ipsum dolor sit 2",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus voluptatem error itaque eum assumenda cumque ullam cupiditate quod, libero veritatis id consequatur dignissimos facilis quae tenetur alias temporibus esse numquam!",
                value: 999,
                // a id gerada na criação da ONG no SEED
                ongs_id: 1,
                // a key gerada na criação da ONG no SEED
                name: "APAD",
                email: "apad@apad.com.br",
                whatsapp: "3123123123",
                city: "Rio do Sul",
                uf: "SC"
            })
        expect(typeof createIncidentResponse.body === 'number');
        expect(typeof createIncidentResponse.body === 1);
    });

    it('should be able to delete an incident', async () => {
        const deleteIncidentResponse = await request(app)
            .delete('/incidents/1')
            .set({ 'Cookie': cookie });
        expect(deleteIncidentResponse.status).toBe(204);
    });
});