const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('Profile', () => {
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

    it('should be able to show all incidents of an ONG', async () => {
        const listIncidentsResponse = await request(app)
            .get('/profile')
            .set({ 'Authorization': '123abc' });
        expect(listIncidentsResponse.body).toEqual([
            {
                // a id gerada na criação do incident no SEED
                id: 1,
                title: "Lorem ipsum dolor sit",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus voluptatem error itaque eum assumenda cumque ullam cupiditate quod, libero veritatis id consequatur dignissimos facilis quae tenetur alias temporibus esse numquam!",
                value: 999,
                // a id gerada na criação da ONG no SEED
                ongs_id: 1,
            }
        ]);
    });
});