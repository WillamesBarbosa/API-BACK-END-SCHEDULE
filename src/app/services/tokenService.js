const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function tokenService(user, password) {
  const passwordAuth = await bcrypt.compare(password, user.password_hash);
  if (!passwordAuth) {
    return false;
  }
  const token = await jwt.sign(
    {
      id: user.id,
      authorization_level: user.authorization_level,
    },
    process.env.SECRET,
    { expiresIn: 120 },
  );
  return token;
}

module.exports = { tokenService };
