const { Segments, Joi } = require('celebrate');

const logoutValidation = {
    [Segments.HEADERS]: Joi.object().keys({
        cookie: Joi.string().required(),
    }).unknown()
};

module.exports = logoutValidation;