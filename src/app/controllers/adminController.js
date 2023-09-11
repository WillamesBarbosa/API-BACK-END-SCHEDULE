const bcrypt = require('bcrypt');
require('dotenv').config();

const AdminsRepository = require('../repositories/adminsRepository');

const { findByField } = require('../services/findByFieldService');
const { verifyAllParameters } = require('../services/parametersValidationService');
const logger = require('../logger/winston');

class AdminController {
  async index(request, response) {
    try {
      const admins = await AdminsRepository.findAll();

      return response.json(admins);
    } catch (error) {
      logger.error('Erro no index AdminController', error);
      return response.status(500).json({ Error: 'Ocorreu um erro interno no servidor' });
    }
  }

  async store(request, response) {
    try {
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
        return response.status(409).json({ Error: 'Email já existe!' });
      }

      const password_hash = await bcrypt.hash(password, 15);

      const admin = await AdminsRepository.create({ full_name, email, password_hash });

      return response.json(admin);
    } catch (error) {
      logger.error('Erro no store AdminController', error);
      return response.status(500).json({ Error: 'Ocorreu um erro interno no servidor' });
    }
  }
}

module.exports = new AdminController();
