const { Segments, Joi } = require('celebrate');

const deleteOngValidation = {
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown()
};

module.exports = deleteOngValidation;