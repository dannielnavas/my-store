const jsonwebtoken = require('jsonwebtoken');

const secret = 'mySecretKey';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwicm9sZSI6ImFkbWluIiwibmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiIiLCJpYXQiOjE3NDAwNTUyMjV9.2gzo0lDWGUW7gtoVFXoiTVPcC2pMlkuhRY-UC24dIYA';

function verifyToken(token, secret) {
  return jsonwebtoken.verify(token, secret);
}

const result = verifyToken(token, secret);
console.log(result);
