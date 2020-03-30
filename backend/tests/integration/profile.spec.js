const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('Profile', () => {
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

    it('should be able to show all incidents of an ONG', async () => {
        await request(app)
            .get('/profile')
            .set({
                "Cookie": cookie
            })
            .then(response => {
                expect(response.body[0]).toHaveProperty("id", 1);
                expect(response.body[0]).toHaveProperty("title", "Lorem ipsum dolor sit");
                expect(response.body[0]).toHaveProperty("description", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus voluptatem error itaque eum assumenda cumque ullam cupiditate quod, libero veritatis id consequatur dignissimos facilis quae tenetur alias temporibus esse numquam!");
                expect(response.body[0]).toHaveProperty("value", 999);
                expect(response.body[0]).toHaveProperty("ongs_id", 1);
                expect(response.body[0]).toHaveProperty("created_at");
                expect(response.body[0]).toHaveProperty("updated_at");
            })
    });
});