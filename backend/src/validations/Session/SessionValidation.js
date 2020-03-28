const { Segments, Joi } = require('celebrate');

const sessionValidation = {
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    })
};

module.exports = sessionValidation;