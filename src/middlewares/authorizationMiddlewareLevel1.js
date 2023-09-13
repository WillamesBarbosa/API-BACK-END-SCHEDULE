const logger = require('../app/logger/winston');
const { authorizationService } = require('../app/services/authorizationService');

// Função que verifica se o usuário tem o nível de autorização necessário
/* eslint-disable */
function authorizationMiddlewareLevel1(request, response, next) {
  try {
    const { authorization_level } = request;

    // Função que compara o nível de autorização necessário com o nível de autorização recebido
    const authorization = authorizationService(authorization_level, 1);

    if (!authorization) {
      return response.status(401).json({ error: 'usuário não tem permissão' });
    }

    next();
  } catch (error) {
    logger.error('Erro no authorizationLevel2', error)
    return response.status(500).json({Error: 'Ocorreu um erro interno!'})
  }
}

module.exports = { authorizationMiddlewareLevel1 };
