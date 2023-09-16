const { createLogger, format, transports } = require('winston');
const { DateTime } = require('luxon');
require('dotenv').config();

const logger = createLogger({
  level: 'info', // Nível mínimo de log para produção (por exemplo, 'info' ou 'error')
  format: format.combine(
    format.timestamp({
      format: () => {
        // Cria uma instância e define o fuso horário de São Paulo
        const brasiliaTime = DateTime.now().setZone('America/Sao_Paulo');
        // Formata para o padrão ISO 8601
        return brasiliaTime.toISO({ includeOffset: false });
      },
    }),
    format.json(),
  ),
  transports: [
    new transports.File({ filename: 'logs/error.log', level: 'error' }), // Registra erros em um arquivo separado
    new transports.File({ filename: 'logs/combined.log' }), // Registra todos os logs em um arquivo combinado
    new transports.File({ filename: 'logs/user_actions.log', level: 'info' }), // Registra ações de usuário em um arquivo separado
  ],
});

// Adiciona um transporte para exibir logs no console
// quando não se está em ambiente de produção
if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console());
}

module.exports = logger;
