const logger = require('../app/logger/winston');
const { authorizationService } = require('../app/services/authorizationService');

/* eslint-disable */
function authorizationMiddlewareLevel2(request, response, next) {
  try {
    const { authorization_level } = request;
    const authorization = authorizationService(authorization_level, 2);
    if (!authorization) {
      return response.status(401).json({ error: 'usuário não tem permissão' });
    }

    next();
  } catch (error) {
    logger.error('Erro no authorizationLevel2', error)
    return response.status(501).json({Error: 'Ocorreu um erro interno!'})
  }
}

module.exports = { authorizationMiddlewareLevel2 };
