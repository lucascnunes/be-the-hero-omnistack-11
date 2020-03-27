const connection = require('../database/connection');

module.exports = {
    async index(request, response) {

        const ong_key = request.headers.authorization;
        
        const ong = await connection('ongs')
        .select([
            'name',
            'email',
            'whatsapp',
            'city',
            'uf',
        ])
        .where('key', ong_key)
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
        
        const ong_key = request.headers.authorization;
        
        const ong = await connection('ongs')
        .select('id')
        .where('key', ong_key)
        .first();

        if (!ong) {
            return response.status(401).json({
                error: 'Not authorized.'
            });
        }

        const update = await connection('ongs')
        .where('key', ong_key)
        .update({
            name,
            email,
            whatsapp,
            city,
            uf
        });

        if (!update) {
            return response.status(500).json({
                error: 'Error while UPDATING.'
            });
        }

        const ongUpdated = await connection('ongs')
        .select('name')
        .where('key', ong_key)
        .first();

        return response.json(ongUpdated.name);
    }
}