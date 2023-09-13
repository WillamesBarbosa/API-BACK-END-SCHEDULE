const jwt = require('jsonwebtoken');
const logger = require('../logger/winston');
require('dotenv').config();

// Função que autentica e verifica o token JWT
async function authenticationService(token) {
  try {
    // Se o token existir, chama a função que verifica o token, caso não retorna false
    const decode = token ? await jwt.verify(token, process.env.SECRET) : false;

    return decode;
  } catch (error) {
    logger.error('Erro no authenticationService', error);
    throw new Error('Erro durante a verificação do Token');
  }
}

module.exports = {
  authenticationService,
};
