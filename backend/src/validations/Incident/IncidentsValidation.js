const { Segments, Joi } = require('celebrate');

const incidentsValidation = {
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    }),
};

module.exports = incidentsValidation;
