const { Segments, Joi } = require('celebrate');

const updateAccountValidation = {
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
};

module.exports = updateAccountValidation;