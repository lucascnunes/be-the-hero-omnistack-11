const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");

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

        ong = await connection('ongs')
            .select(['name', 'email'])
            .where('email', email)
            .first();

        try {
            // definindo as informações do smtp
            let transporter = nodemailer.createTransport({
                host: config.smtp.host,
                port: config.smtp.port,
                secure: config.smtp.secure, // true for 465, false for other ports
                auth: {
                user: config.smtp.auth.user, // generated ethereal user
                pass: config.smtp.auth.password // generated ethereal password
                }
            });

            // envia o email
            await transporter.sendMail({
                from: '"Be The Hero 💪" <hero@bethehero.com>', // sender address
                to: ong.email, // list of receivers
                subject: "Vamos encontrar heróis juntos ✔", // Subject line
                text: `Seja bem vindo ${ong.name}, utilize nossa plataforma para adicionar seus casos e encontrar heróis que ajudaram sua organização.`, // plain text body
            });

        } catch (error) {
            return response.status(500).json({
                error: 'Not able to send email of registration.',
                message: error
            });
        }

        const token = jsonwebtoken.sign({
            email: email,
        }, config.token.secret, {
            expiresIn: config.token.expired
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