const { Segments, Joi } = require('celebrate');

const loginValidation = {
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    })
};

module.exports = loginValidation;