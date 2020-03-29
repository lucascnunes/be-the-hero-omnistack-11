const jsonwebtoken  = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const connection = require('../database/connection');

const config = require('../config');

module.exports = {
    // login
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

            response.cookie('access_token', token, {
                maxAge: 86400000,
                httpOnly: true,
                expires: false,
                // secure: true // somente para produção
            });

            let date = new Date();

            return response.json({
                expire_at: date.setDate(date.getDate() + 1),
                name: ong.name,
            });
        });
    },

    // verifica login / atualiza cookie
    async update(request, response) {
        const { email } = request.user;
        
        const ong = await connection('ongs')
            .select(['name'])
            .where('email', email)
            .first();
    
        if (!ong) {
            return response.status(401).json({
                error: 'Action not allowed.'
            });
        }

        const token = jsonwebtoken.sign({
            email: email,
        }, config.token.secret, { // get secret from config
            expiresIn: config.token.expired // expires in 1 day
        })

        response.cookie('access_token', token, {
            maxAge: 86400000,
            httpOnly: true,
            expires: false,
            // secure: true // somente para produção
        });

        let date = new Date();

        return response.json({
            expire_at: date.setDate(date.getDate() + 1),
            name: ong.name,
        });
    },

    // desloga a ONG
    async delete(request, response) {
        const { email } = request.user;

        const ong = await connection('ongs')
            .select(['name'])
            .where('email', email)
            .first();
    
        if (!ong) {
            return response.status(401).json({
                error: 'Action not allowed.'
            });
        }

        response.clearCookie('access_token');

        return response.status(204).send();
    }
}