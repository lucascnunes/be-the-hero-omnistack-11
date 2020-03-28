const { Segments, Joi } = require('celebrate');

const createOngValidation = {
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().length(2),
        password: Joi.string().min(6),
    })
};

module.exports = createOngValidation;