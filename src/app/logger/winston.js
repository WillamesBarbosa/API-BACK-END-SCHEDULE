const { createLogger, format, transports } = require('winston');
require('dotenv').config();

const logger = createLogger({
  level: 'info', // Nível mínimo de log para produção (por exemplo, 'info' ou 'error')
  format: format.combine(
    format.timestamp(),
    format.json(), // Definindo o formato JSON para facilitar a análise automatizada
  ),
  transports: [
    new transports.File({ filename: 'logs/error.log', level: 'error' }), // Registra erros em um arquivo separado
    new transports.File({ filename: 'logs/combined.log' }), // Registra todos os logs em um arquivo combinado
  ],
});

// Adiciona um transporte para exibir logs no console
// quando não se está em ambiente de produção
if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console());
}

module.exports = logger;
