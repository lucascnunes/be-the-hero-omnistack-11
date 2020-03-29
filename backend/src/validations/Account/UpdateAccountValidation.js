const { Segments, Joi } = require('celebrate');

const updateAccountValidation = {
    [Segments.HEADERS]: Joi.object({
        cookie: Joi.string().required(),
    }).unknown(),
};

module.exports = updateAccountValidation;