const logger = require('../logger/winston');

function authorizationService(authorization_level, level_acess) {
  try {
    const authorization = parseInt(authorization_level, 10);
    const accessPermission = parseInt(level_acess, 10);
    return authorization >= accessPermission;
  } catch (error) {
    logger.error('Erro no authorizationService', error);
    throw new Error('Erro durante a verificação de nível de autorização');
  }
}

module.exports = { authorizationService };
