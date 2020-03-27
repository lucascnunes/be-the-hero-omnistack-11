const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('Incidents', () => {
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

    it('should be able to show all incidents', async () => {
  
        const listIncidentsResponse = await request(app)
            .get('/incidents');
        expect(listIncidentsResponse.body).toEqual([
            {
                // a id gerada na criação do incident no SEED
                id: 1,
                title: "Lorem ipsum dolor sit",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus voluptatem error itaque eum assumenda cumque ullam cupiditate quod, libero veritatis id consequatur dignissimos facilis quae tenetur alias temporibus esse numquam!",
                value: 999,
                // a id gerada na criação da ONG no SEED
                ongs_id: 1,
                // a key gerada na criação da ONG no SEED
                key: '123abc',
                name: "APAD",
                email: "apad2@apad.com.br",
                whatsapp: "3123123123",
                city: "Rio do Sul",
                uf: "SC"
            }
        ]);
    });

    it('should be able to create a new incident', async () => {
        const createIncidentResponse = await request(app)
            .post('/incidents')
            .set({ 'Authorization': '123abc' })
            .send({
                // a id gerada na criação do incident no SEED
                title: "Lorem ipsum dolor sit 2",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus voluptatem error itaque eum assumenda cumque ullam cupiditate quod, libero veritatis id consequatur dignissimos facilis quae tenetur alias temporibus esse numquam!",
                value: 999,
                // a id gerada na criação da ONG no SEED
                ongs_id: 1,
                // a key gerada na criação da ONG no SEED
                key: '123abc',
                name: "APAD",
                email: "apad2@apad.com.br",
                whatsapp: "3123123123",
                city: "Rio do Sul",
                uf: "SC"
            })
        expect(typeof createIncidentResponse.body === 'number');
    });

    it('should be able to delete an incident', async () => {
        const deleteIncidentResponse = await request(app)
            .delete('/incidents/1')
            .set({ 'Authorization': '123abc' });
        expect(deleteIncidentResponse.status).toBe(204);
    });
});