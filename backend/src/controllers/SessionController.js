const jsonwebtoken  = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const connection = require('../database/connection');

const config = require('../config');

module.exports = {
    async create(request, response) {
        const { email, password } = request.body;

        if (email === undefined || password === undefined) {
            return response.status(400).json({
                error: 'Authentication failed. ONG not found'
            });
        }

        const ong = await connection('ongs')
            .select(['name', 'password'])
            .where('email', email)
            .first();
        
        if (!ong) {
            return response.status(400).json({
                error: 'Authentication failed. ONG not found.'
            });
        }

        bcrypt.compare(password, ong.password, function (err, result) {
            if (!result) {
                return response.status(400).json({
                    error: 'Authentication failed. Password invalid.'
                });
            }

            if (err) {
                return response.status(500).json({
                    error: err
                });
            }

            const token = jsonwebtoken.sign({
                email: email,
            }, config.token.secret, { // get secret from config
                expiresIn: config.token.expired // expires in 1 day
            })
            return response.json({
                email: ong.email,
                token: token,
                name: ong.name
            });
        });
    },
}