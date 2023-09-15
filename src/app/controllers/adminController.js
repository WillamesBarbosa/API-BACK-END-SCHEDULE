const bcrypt = require('bcrypt');
const validator = require('validator');
require('dotenv').config();

const AdminsRepository = require('../repositories/adminsRepository');

const { findByField } = require('../services/findByFieldService');
const { verifyAllParameters } = require('../services/parametersValidationService');

const logger = require('../logger/winston');

class AdminController {
  // Função que retorna uma lista com todos os Admins
  async index(request, response) {
    try {
      const admins = await AdminsRepository.findAll();

      return response.json(admins);
    } catch (error) {
      logger.error('Erro no index AdminController', error);
      return response.status(500).json({ Error: 'Ocorreu um erro interno no servidor' });
    }
  }

  // Função que retorna o Admin autenticado
  async show(request, response) {
    const { id } = request;

    try {
      // Verifica se o id existe na tabela e retorna o admin caso exista
      const admin = await findByField(
        process.env.ADMIN_TABLE,
        process.env.FIELD_IDENTIFICATION,
        id,
      );

      return response.json(admin);
    } catch (error) {
      logger.error('Erro no show AdminController', error);
      return response.status(500).json({ Error: 'Ocorreu um erro interno no servidor' });
    }
  }

  // Função para criar um novo Admin
  async store(request, response) {
    try {
      const { full_name, email, password } = request.body;

      // Verifica se existe algum parâmetro undefined
      if (verifyAllParameters(full_name, email, password)) {
        return response.status(400).json({ error: 'Bad request' });
      }

      // Verifica se o Email é valido
      if (!validator.isEmail(email)) {
        return response.status(400).json({ Error: 'Bad Request' });
      }

      // Verifica se o email já existe no banco de dados
      const emailAlreadyExists = await findByField(
        process.env.ADMIN_TABLE,
        process.env.FIELD_EMAIL,
        email,
      );

      if (emailAlreadyExists) {
        return response.status(409).json({ Error: 'Email já existe!' });
      }

      // Transforma o passord em um hash
      const password_hash = await bcrypt.hash(password, 15);

      const admin = await AdminsRepository.create({ full_name, email, password_hash });

      return response.json(admin);
    } catch (error) {
      logger.error('Erro no store AdminController', error);
      return response.status(500).json({ Error: 'Ocorreu um erro interno no servidor' });
    }
  }

  async update(request, response) {
    const { id } = request;
    const { full_name, email, password } = request.body;

    try {
      // verifica se existe algum parâmetro undefined
      if (verifyAllParameters(full_name, email, password)) {
        console.log('foi aqui');
        return response.status(400).json({ error: 'Bad request' });
      }

      // Verifica se a estrutura do email é valida
      if (!validator.isEmail(email)) {
        console.log('aqui');
        return response.status(400).json({ Error: 'Bad Request' });
      }

      // Verifica se existe um admin com o id fornecido
      const adminExist = await findByField(
        process.env.ADMIN_TABLE,
        process.env.FIELD_IDENTIFICATION,
        id,
      );
      if (!adminExist) {
        return response.status(404).json({ error: 'Usuário não existe' });
      }

      const admin = await AdminsRepository.update({ full_name, email, password }, id);
      console.log(admin);

      return response.json(admin);
    } catch (error) {
      logger.error('Erro no update AdminController', error);
      return response.status(500).json({ Error: 'Ocorreu um erro interno no servidor' });
    }
  }
}

module.exports = new AdminController();
