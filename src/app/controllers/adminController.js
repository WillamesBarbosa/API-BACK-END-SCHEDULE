const bcrypt = require('bcrypt');
require('dotenv').config();

const AdminsRepository = require('../repositories/adminsRepository');

const { findByField } = require('../services/findByFieldService');
const { verifyAllParameters } = require('../services/parametersValidationService');

class AdminController {
  async store(request, response) {
    const { full_name, email, password } = request.body;

    if (verifyAllParameters(full_name, email, password)) {
      console.log(full_name, email, password);
      return response.status(400).json({ error: 'Bad request' });
    }

    const emailAlreadyExists = await findByField(
      process.env.ADMIN_TABLE,
      process.env.FIELD_EMAIL,
      email,
    );

    if (emailAlreadyExists) {
      return response.status(409).json({ error: 'Email já existe!' });
    }

    const password_hash = await bcrypt.hash(password, 15);

    const admin = await AdminsRepository.create({ full_name, email, password_hash });

    return response.json(admin);
  }
}

module.exports = new AdminController();
