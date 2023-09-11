const logger = require('../app/logger/winston');

function errorMiddleware(error, request, response, next) {
  logger.error('Erro no errorMiddleware', error);
  response.status(500).json({ error: 'Erro interno no servidor' });
}

module.exports = { errorMiddleware };
