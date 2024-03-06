const Joi = require('@hapi/joi')

//Registration validation

const registerValidation = (data) => {
    const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    username: Joi.string().min(3).required(),
    email: Joi.string().min(6).required().email({
        tlds: {allow: true}
    }),
    password: Joi.string().min(8).required().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_])[a-zA-Z\\d\\W_]{8,}$'))

    });
    return schema.validate(data);
};

const loginValidation =(data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email({
            tlds: {allow: true}
        }),
        password: Joi.string().min(8).required().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_])[a-zA-Z\\d\\W_]{8,}$'))
    });
    return schema.validate(data);
}

module.exports = {
    registerValidation,
    loginValidation
}