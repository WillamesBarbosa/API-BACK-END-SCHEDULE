require('dotenv').config();

const { authenticationService } = require('../app/services/authenticationService');

/* eslint-disable */
async function authenticationMiddleware(request, response, next) {
  const token = request.headers.authorization;
  try {
    const decode = await authenticationService(token, process.env.SECRET);
    if (!decode) {
      return response.status(501);
    }
    request.id = decode.id;
    request.authorization_level = decode.authorization_level;
    next();
  } catch (error) {
    response.status(401).json({Erro: 'Usuário não autorizado'})
  }
}

module.exports = {
  authenticationMiddleware,
};
