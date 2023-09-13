const bcrypt = require('bcrypt');
const validator = require('validator');
require('dotenv').config();

const DoctorsRepository = require('../repositories/doctorsRepository');

const { verifyAllParameters } = require('../services/parametersValidationService');
const { findByField } = require('../services/findByFieldService');
const { verifyCrm } = require('../services/crmService');
const logger = require('../logger/winston');

class DoctorController {
  // Função que retorna todos os Doctors
  async index(request, response) {
    try {
      const medics = await DoctorsRepository.findAll();

      return response.send(medics);
    } catch (error) {
      logger.error('Erro no index DoctorController', error);
      return response.status(500).json({ Error: 'Ocorreu um erro interno no servidor' });
    }
  }

  // Função que retorna apenas o Doctor autenticado
  async show(request, response) {
    try {
      const { id } = request;

      // Verifica se o id existe na tabela Doctor e retorna ele caso exista
      const medic = await findByField(
        process.env.DOCTOR_TABLE,
        process.env.FIELD_IDENTIFICATION,
        id,
      );

      return response.send(medic);
    } catch (error) {
      logger.error('Erro no show DoctorController', error);
      return response.status(500).json({ Error: 'Ocorreu um erro interno no servidor' });
    }
  }

  // Função que cria um novo Doctor
  async store(request, response) {
    try {
      const {
        full_name,
        email,
        password,
        street_address,
        city,
        state_province,
        mobile_number,
        crm,
        specialization,
      } = request.body;

      // Verifica se existe algum parâmetro undefined
      if (verifyAllParameters(
        full_name,
        street_address,
        password,
        email,
        city,
        state_province,
        mobile_number,
        crm,
        specialization,
      )) {
        return response.status(400).json({ error: 'bad request' });
      }

      // Verifica se a estrutura do email é válida
      if (!validator.isEmail(email)) {
        return response.status(400).json({ error: 'bad request' });
      }

      // Verifica se a estrutura do CRM é válida
      const crmFormatIsCorrect = verifyCrm(crm);
      if (!crmFormatIsCorrect) {
        return response.status(422).json({ erro: 'Entidade não processável' });
      }

      // Verifica se o email existe
      const emailAlreadyExist = await findByField(
        process.env.DOCTOR_TABLE,
        process.env.FIELD_EMAIL,
        email,
      );

      // Verifica se o CRM existe
      const crmAlreadyExist = await findByField(
        process.env.DOCTOR_TABLE,
        process.env.FIELD_CRM,
        crm,
      );

      if (crmAlreadyExist || emailAlreadyExist) {
        return response.status(409).json({ erro: 'Email ou CRM já existe' });
      }

      // Cria o hash do password
      const password_hash = await bcrypt.hash(password, 15);

      const doctor = await DoctorsRepository.create({
        full_name,
        street_address,
        password_hash,
        email,
        city,
        state_province,
        mobile_number,
        crm,
        specialization,
      });

      return response.json(doctor);
    } catch (error) {
      logger.error('Erro no index DoctorController', error);
      return response.status(500).json({ Error: 'Ocorreu um erro interno no servidor' });
    }
  }

  // Função que atualiza os dados do Doctor
  async update(request, response) {
    try {
      const { id } = request;
      const {
        full_name,
        street_address,
        password,
        email,
        city,
        state_province,
        mobile_number,
        crm,
        specialization,
      } = request.body;

      // Verifica se existe algum parâmetro undefined
      if (verifyAllParameters(
        full_name,
        street_address,
        password,
        email,
        city,
        state_province,
        mobile_number,
        crm,
        specialization,
      )) {
        return response.status(400).json({ error: 'bad request' });
      }

      // Verifica se a estrutura do email é válida
      if (!validator.isEmail(email)) {
        return response.status(400).json({ error: 'Bad request' });
      }

      // Verifica se o id existe no banco de dados
      const medicExist = await findByField(
        process.env.DOCTOR_TABLE,
        process.env.FIELD_IDENTIFICATION,
        id,
      );

      if (!medicExist) {
        return response.status(404).json({ error: 'Usuário não existe' });
      }

      const medic = await DoctorsRepository.update(
        id,
        {
          full_name,
          street_address,
          password,
          email,
          city,
          state_province,
          mobile_number,
          crm,
          specialization,
        },
      );

      return response.json(medic);
    } catch (error) {
      logger.error('Erro no index DoctorController', error);
      return response.status(500).json({ Error: 'Ocorreu um erro interno no servidor' });
    }
  }

  // Função que apaga o Doctor logado
  async delete(request, response) {
    try {
      const { id } = request;

      // Verifica se o id realmente existe na tabela
      const medicExist = await findByField(
        process.env.DOCTOR_TABLE,
        process.env.FIELD_IDENTIFICATION,
        id,
      );

      if (!medicExist) {
        return response.status(404).json({ error: 'usuário não existe' });
      }

      await DoctorsRepository.delete(id);

      return response.sendStatus(204);
    } catch (error) {
      logger.error('Erro no index DoctorController', error);
      return response.status(500).json({ Error: 'Ocorreu um erro interno no servidor' });
    }
  }
}

module.exports = new DoctorController();
