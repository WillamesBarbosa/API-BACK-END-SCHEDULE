const logger = require('../app/logger/winston');

// Função que trata o erro em caso de request com formato JSON inválido
/* eslint-disable */
function checkIntegrityOfJSON(erro, request, response, next) {
  try {
    JSON.parse(request.body)
    next();
  } catch (error) {
    logger.error('Erro no checkIntegrityOfJSON', error)
    return response.status(500).json({ Error: 'Ocorreu um erro interno no servidor' });
  }
}

module.exports = { checkIntegrityOfJSON };
