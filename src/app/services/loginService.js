require('dotenv').config();

const { findByField } = require('./findByFieldService');
const { tokenService } = require('./tokenService');

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
    return console.log('erro no loginService');
  }
}

module.exports = { loginService };
