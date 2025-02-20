const boom = require('@hapi/boom');
const { config } = require('./../../config/config');

function checkApiKey(req, res, next) {
  const apiKey = req.headers['api'];
  console.log(apiKey);
  console.log(config.apiKeyToken);
  if (apiKey === config.apiKeyToken) {
    next();
  } else {
    next(boom.unauthorized());
  }
}

module.exports = { checkApiKey };
