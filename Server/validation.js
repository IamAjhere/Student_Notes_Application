//validation
const Joi = require("@hapi/joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required().email(),
    status: Joi.boolean().required(),
    accountType: Joi.string().required(),
  });
  //validate the data
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });
  //validate the data
  return schema.validate(data);
};

const newStudentValidation = (data) => {
  const schema = Joi.object({
    status: Joi.boolean().required(),
    accountType: Joi.string().required(),
    password: Joi.string().required(),
    dateOfBirth: Joi.date().required(),
    mobile: Joi.number().required(),
  });
  //validate the data
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.newStudentValidation = newStudentValidation;
