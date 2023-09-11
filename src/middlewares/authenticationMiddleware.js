require('dotenv').config();

const logger = require('../app/logger/winston');
const { authenticationService } = require('../app/services/authenticationService');

/* eslint-disable */
async function authenticationMiddleware(request, response, next) {
  const token = request.headers.authorization;
  try {
    const decode = await authenticationService(token, process.env.SECRET);
    if (!decode) {
      return response.status(401).json('Usuário não autenticado!');
    }

    request.id = decode.id;
    request.authorization_level = decode.authorization_level;
    next();
  } catch (error) {
    logger.error('Erro no authenticationMiddleware')
    return response.status(500).json({Erro: 'Ocorreu um erro interno no servidor!'})
  }
}

module.exports = {
  authenticationMiddleware,
};
