const jwt = require('jsonwebtoken');
const logger = require('../logger/winston');
require('dotenv').config();

async function authenticationService(token) {
  try {
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
