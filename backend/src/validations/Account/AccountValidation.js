const { Segments, Joi } = require('celebrate');

const accountValidation = {
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
};

module.exports = accountValidation;