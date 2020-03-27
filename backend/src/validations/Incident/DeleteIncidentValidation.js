const { Segments, Joi } = require('celebrate');

const deleteIncidentValidation = {
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    }),
};

module.exports = deleteIncidentValidation;
