const { Segments, Joi } = require('celebrate');

const sessionValidation = {
    [Segments.BODY]: Joi.object().keys({
        key: Joi.string().required(),
    })
};

module.exports = sessionValidation;