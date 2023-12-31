require('dotenv').config();

const logger = require('../logger/winston');
const { findByField } = require('./findByFieldService');
const { tokenService } = require('./tokenService');

// Função que verifica se existe um usuário com o email fornecido
async function loginService(email, password) {
  try {
    const patient = await findByField(process.env.USER_TABLE, process.env.FIELD_EMAIL, email);

    if (patient) {
      const token = await tokenService(patient, password);

      return token;
    }

    const medic = await findByField(process.env.DOCTOR_TABLE, process.env.FIELD_EMAIL, email);

    if (medic) {
      const token = await tokenService(medic, password);

      return token;
    }

    const admin = await findByField(process.env.ADMIN_TABLE, process.env.FIELD_EMAIL, email);

    if (admin) {
      const token = await tokenService(admin, password);

      return token;
    }

    return false;
  } catch (error) {
    logger.error('Erro no loginService', error);

    throw new Error('Houve um erro durante a autenticação');
  }
}

module.exports = { loginService };
