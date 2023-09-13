require('dotenv').config();

const logger = require('../app/logger/winston');
const { authenticationService } = require('../app/services/authenticationService');

// Middleware responsável por lidar com a requisição
// e chamar a função que verifica se o token é válido e adicionar as informações no request
/* eslint-disable */
async function authenticationMiddleware(request, response, next) {
  const token = request.headers.authorization;
  try {
    // Função que verifica se o token é válido
    const decode = await authenticationService(token);
    if (!decode) {
      return response.status(401).json({Error: 'Usuário não autenticado!'});
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
