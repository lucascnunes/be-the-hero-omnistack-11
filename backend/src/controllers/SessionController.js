const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { key } = request.body;
        const ong = await connection('ongs')
            .select(['name', 'key'])
            .where('key', key)
            .first();
        
        if (!ong) {
            return response.status(400).json({
                error: 'No ONG found with this KEY.'
            });
        }

        response.header('Authorization', ong.key);

        return response.json(ong.name);
    },
}