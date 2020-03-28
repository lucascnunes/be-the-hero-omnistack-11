const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;
        const ong = await connection('ongs')
            .where('email', request.user.email)
            .first();

        if (!ong) {
            return response.status(401).json({
                error: 'Not authorized.'
            });
        }

        const [count] = await connection('incidents')
            .where('ongs_id', ong.id)
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