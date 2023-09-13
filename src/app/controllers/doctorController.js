const bcrypt = require('bcrypt');
const validator = require('validator');
require('dotenv').config();

const DoctorsRepository = require('../repositories/doctorsRepository');

const { verifyAllParameters } = require('../services/parametersValidationService');
const { findByField } = require('../services/findByFieldService');
const { verifyCrm } = require('../services/crmService');
const logger = require('../logger/winston');

class DoctorController {
  async index(request, response) {
    try {
      const medics = await DoctorsRepository.findAll();

      return response.send(medics);
    } catch (error) {
      logger.error('Erro no index DoctorController', error);
      return response.status(500).json({ Error: 'Ocorreu um erro interno no servidor' });
    }
  }

  async show(request, response) {
    try {
      const { id } = request;
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

      if (!validator.isEmail(email)) {
        return response.status(400).json({ error: 'bad request' });
      }

      const crmFormatIsCorrect = verifyCrm(crm);
      if (!crmFormatIsCorrect) {
        return response.status(422).json({ erro: 'Entidade não processável' });
      }

      const emailAlreadyExist = await findByField(
        process.env.DOCTOR_TABLE,
        process.env.FIELD_EMAIL,
        email,
      );

      const crmAlreadyExist = await findByField(
        process.env.DOCTOR_TABLE,
        process.env.FIELD_CRM,
        crm,
      );

      if (crmAlreadyExist || emailAlreadyExist) {
        return response.status(409).json({ erro: 'Email ou CRM já existe' });
      }

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

      if (!validator.isEmail(email)) {
        return response.status(400).json({ error: 'Bad request' });
      }

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

  async delete(request, response) {
    try {
      const { id } = request;

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
