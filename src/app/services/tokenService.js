const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

require('dotenv').config();
const { findByField } = require('./findByFieldService');

async function tokenGenerator(email, passwordUser) {
  try {
    const patient = await findByField(process.env.USER_TABLE, process.env.FIELD_EMAIL, email);

    if (patient) {
    // return response.status(404).json({ error: 'Email não existe!' });
      const passwordAuth = await bcrypt.compareSync(passwordUser, patient.passworduser);
      if (!passwordAuth) {
        return false;
      }
      const token = await jwt.sign(
        {
          id: patient.id,
          authLevel: patient.authlevel,
        },
        process.env.SECRET,
        { expiresIn: 120 },
      );
      return token;
    }

    const medic = await findByField(process.env.DOCTOR_TABLE, process.env.FIELD_EMAIL, email);

    if (medic) {
      const passwordAuth = await bcrypt.compareSync(passwordUser, medic.passworddoctor);

      if (!passwordAuth) {
        return false;
      }
      const token = await jwt.sign(
        {
          id: medic.id,
          authLevel: medic.authlevel,
        },
        process.env.SECRET,
        { expiresIn: 120 },
      );

      return token;
    }

    return false;
  } catch (error) {
    return console.log('erro no tokenGenerator');
  }
}

module.exports = { tokenGenerator };
