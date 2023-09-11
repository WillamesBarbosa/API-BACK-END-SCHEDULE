const logger = require('../app/logger/winston');
const { authorizationService } = require('../app/services/authorizationService');

/* eslint-disable */
function authorizationMiddlewareLevel1(request, response, next) {
  try {
    const { authorization_level } = request;
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
