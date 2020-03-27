const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },
    
    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;
    
        const key = crypto.randomBytes(4).toString('HEX');
        
        await connection('ongs').insert({
            key,
            name,
            email,
            whatsapp,
            city,
            uf
        });

        return response.json({ key });
    },

    async delete(request, response) {
        
        const ong_key = request.headers.authorization;
        
        const ong = await connection('ongs')
        .where('key', ong_key)
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
            return response.status(500).json({
                error: 'Error while DELETING.',
                message: error,
            });
        }

        return response.status(204).send();
    }
}