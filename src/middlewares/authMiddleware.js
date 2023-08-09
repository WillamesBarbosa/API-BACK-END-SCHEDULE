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
    throw new Error('Erro ao decodificar o token')
  }
}

module.exports = {
  authorizationMiddleware,
};
