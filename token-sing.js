const jsonwebtoken = require('jsonwebtoken');

const secret = 'mySecretKey';

const payload = {
  sub: '1234567890', // identificador del usuario
  role: 'admin', // rol del usuario
  name: 'John Doe',
  email: '',
};

function singToken(payload, secret) {
  return jsonwebtoken.sign(payload, secret);
}

const token = singToken(payload, secret);
console.log(token);
