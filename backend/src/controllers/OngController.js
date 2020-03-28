const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const connection = require('../database/connection');

const config = require('../config');

module.exports = {
    async index(request, response) {
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },
    
    async create(request, response) {
        const { name, email, whatsapp, city, uf, password } = request.body;
        
        let ong = await connection('ongs')
            .select(['name', 'password'])
            .where('email', email)
            .first();
        
        if(ong) {
            return response.status(400).json({
                error: 'This user already exist.'
            });
        }

        const created_at = new Date().toISOString().slice(0, 19).replace('T', ' '); 
        const updated_at = new Date().toISOString().slice(0, 19).replace('T', ' ');

        await connection('ongs').insert({
            name,
            email,
            whatsapp,
            city,
            uf,
            created_at,
            updated_at
        });

        bcrypt.hash(password, 10)
        .then(async (hash) => {
            await connection('ongs')
                .where('email', email)
                .update({
                    password: hash
                });
        });

        const token = jsonwebtoken.sign({
            email: email,
        }, config.token.secret, {
            expiresIn: config.token.expired
        })

        ong = await connection('ongs')
            .select(['name'])
            .where('email', email)
            .first();

        return response.json({
            email:  ong.email,
            token:  token,
            name:   ong.name
        });
    },

    async show(request, response) {

        const ong_key = request.headers.authorization;
        
        const ong = await connection('ongs')
            .select([
                'name',
                'email',
                'whatsapp',
                'city',
                'uf',
            ])
            .where('email', request.user.email)
            .first();

        if (!ong) {
            return response.status(401).json({
                error: 'Not authorized.'
            });
        }

        return response.json(ong);
    },

    async update(request, response) {
        
        const { name, email, whatsapp, city, uf } = request.body;
        
        const ong = await connection('ongs')
            .select('id')
            .where('email', request.user.email)
            .first();

        if (!ong) {
            return response.status(401).json({
                error: 'Not authorized.'
            });
        }

        try {
            const updated_at = new Date().toISOString().slice(0, 19).replace('T', ' ');

            await connection('ongs')
                .where('email', request.user.email)
                .update({
                    name,
                    email,
                    whatsapp,
                    city,
                    uf,
                    updated_at
                });
        } catch (error) {
            return response.status(400).json({
                error: 'Error while UPDATING.',
                message: error,
            });
        }

        const ongUpdated = await connection('ongs')
            .select('name')
            .where('email', request.user.email)
            .first();

        return response.json(ongUpdated.name);
    },

    async delete(request, response) {
        
        const ong = await connection('ongs')
            .where('email', request.user.email)
            .first();

        if (!ong) {
            return response.status(401).json({
                error: 'Not authorized.'
            });
        }

        try {
            await connection('ongs')
                .where('id', ong.id)
                .delete();
        } catch (error) {
            return response.status(400).json({
                error: 'Error while DELETING.',
                message: error,
            });
        }

        return response.status(204).send();
    }
}