const bcrypt = require('bcrypt');

async function hashPassword() {
  const myPassword = '1234Segura!';
  const hash = await bcrypt.hash(myPassword, 10);
  console.log(hash);
}

hashPassword();
