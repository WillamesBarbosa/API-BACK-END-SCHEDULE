const { authorizationService } = require('../app/services/authorizationService');

/* eslint-disable */
function authorizationMiddlewareLevel2(request, response, next) {
  const { authorization_level } = request;
  const authorization = authorizationService(authorization_level, 2);
  if (!authorization) {
    return response.status(401).json({ error: 'usuário não tem permissão' });
  }
  next();
}

module.exports = { authorizationMiddlewareLevel2 };
