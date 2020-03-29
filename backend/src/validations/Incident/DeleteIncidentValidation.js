const { Segments, Joi } = require('celebrate');

const deleteIncidentValidation = {
    [Segments.HEADERS]: Joi.object().keys({
        cookie: Joi.string().required(),
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    }),
};

module.exports = deleteIncidentValidation;
