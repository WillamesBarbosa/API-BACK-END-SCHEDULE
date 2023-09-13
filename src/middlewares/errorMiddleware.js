const logger = require('../app/logger/winston');

// Middleware que é chamado em caso de algum erro global que não tenha sido tratado
function errorMiddleware(error, request, response, next) {
  logger.error('Erro no errorMiddleware', error);
  response.status(500).json({ error: 'Erro interno no servidor' });
}

module.exports = { errorMiddleware };
