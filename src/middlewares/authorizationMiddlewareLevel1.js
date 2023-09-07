const { authorizationService } = require('../app/services/authorizationService');

/* eslint-disable */
function authorizationMiddlewareLevel1(request, response, next) {
  const { authorization_level } = request;
  const authorization = authorizationService(authorization_level, 1);

  if (!authorization) {
    return response.status(401).json({ error: 'usuário não tem permissão' });
  }
  next();
}

module.exports = { authorizationMiddlewareLevel1 };
