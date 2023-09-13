const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const logger = require('../logger/winston');
require('dotenv').config();

// Função que gera o token JWT
async function tokenService(user, password) {
  try {
    // Compara o hash do banco de dados com a senha fornecida pelo usuário
    const passwordAuth = await bcrypt.compare(password, user.password_hash);
    if (!passwordAuth) {
      return false;
    }

    // Garante que a variável global é um inteiro
    const tokenExpiration = parseInt(process.env.TOKEN_EXPIRATION, 10);

    // Assina o token JWT
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
