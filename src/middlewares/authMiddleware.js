require('dotenv').config();

const { authorizationService } = require('../app/services/authService');

/* eslint-disable */
async function authorizationMiddleware(request, response, next) {
  const token = request.headers.authorization;
  try {
    const decode = await authorizationService(token, process.env.SECRET);
    if (!decode) {
      return response.status(501);
    }
    request.id = decode.id;
    next();
  } catch (error) {
    response.status(401).json({Erro: 'Usuário não autorizado'})
  }
}

module.exports = {
  authorizationMiddleware,
};
