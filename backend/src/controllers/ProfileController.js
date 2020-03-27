const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;

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

        const [count] = await connection('incidents')
            .count();

        const incidents = await connection('incidents')
            .limit(6)
            .offset((page - 1) * 6)
            .select('*')
            .where('ongs_id', ong.id);
    
        response.header('X-Total-Count', count['count(*)']);
        
        return response.json(incidents);
    },
}