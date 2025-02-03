const boom = require('@hapi/boom');

function validatorHandler(schema, property) {
  // closure
  return (re, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data);
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  };
}

module.exports = { validatorHandler };
