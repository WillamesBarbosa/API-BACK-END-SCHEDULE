const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'info', // Defina o nível mínimo de log para produção (por exemplo, 'info' ou 'error')
  format: format.combine(
    format.timestamp(),
    format.json(), // Use o formato JSON para facilitar a análise automatizada
  ),
  transports: [
    new transports.File({ filename: 'error.log', level: 'error' }), // Registre erros em um arquivo separado
    new transports.File({ filename: 'combined.log' }), // Registre todos os logs em um arquivo combinado
  ],
});

// Se desejar, você pode adicionar um transporte para exibir logs no console também
if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console());
}

module.exports = logger;
