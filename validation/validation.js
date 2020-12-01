const Joi = require('@hapi/joi');

//check register
const registerValidation = data => {
    const schema = {
        name: Joi.string().min(6).required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(6).required()
    };
    return Joi.validate(data,schema);
}

//check login
const loginValidation = data => {
    const schema = {
        email: Joi.string().required().email(),
        password: Joi.string().min(6).required()
    };
    return Joi.validate(data,schema);
}
//check edit
const editValidation = data => {
    const schema = {
        name: Joi.string().min(6).required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(6).required()
    };
    return Joi.validate(data,schema);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.editValidation = editValidation;

