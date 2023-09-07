function authorizationService(authorization_level, level_acess) {
  try {
    const authorization = parseInt(authorization_level, 10);
    const accessPermission = parseInt(level_acess, 10);
    return authorization >= accessPermission;
  } catch (error) {
    return console.log('Erro no authorizationService');
  }
}

module.exports = { authorizationService };
