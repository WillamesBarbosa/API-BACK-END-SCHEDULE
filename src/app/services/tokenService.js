const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const logger = require('../logger/winston');
require('dotenv').config();

async function tokenService(user, password) {
  try {
    const passwordAuth = await bcrypt.compare(password, user.password_hash);
    if (!passwordAuth) {
      return false;
    }
    const tokenExpiration = parseInt(process.env.TOKEN_EXPIRATION, 10);
    const token = await jwt.sign(
      {
        id: user.id,
        authorization_level: user.authorization_level,
      },
      process.env.SECRET,
      { expiresIn: tokenExpiration },
    );
    return token;
  } catch (error) {
    logger.error('Ocorreu um erro no tokenService', error);
    throw new Error('Ocorreu um erro ao gerar o token!');
  }
}

module.exports = { tokenService };
