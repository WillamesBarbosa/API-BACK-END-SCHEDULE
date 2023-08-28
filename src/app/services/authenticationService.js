const jwt = require('jsonwebtoken');
require('dotenv').config();

async function authenticationService(token, SECRET) {
  try {
    const decode = await jwt.verify(token, SECRET);

    return decode;
  } catch (error) {
    throw new Error('Erro ao dar verify no token');
  }
}

module.exports = {
  authenticationService,
};
