const { Segments, Joi } = require('celebrate');

const accountValidation = {
    [Segments.HEADERS]: Joi.object({
        cookie: Joi.string().required(),
    }).unknown(),
};

module.exports = accountValidation;