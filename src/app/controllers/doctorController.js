const bcrypt = require('bcrypt');
require('dotenv').config();

const DoctorsRepository = require('../repositories/doctorsRepository');

const { verifyAllParameters } = require('../services/parametersValidationService');
const { findByField } = require('../services/findByFieldService');
const { verifyCrm } = require('../services/crmService');

class DoctorController {
  async index(request, response) {
    const medics = await DoctorsRepository.findAll();

    return response.send(medics);
  }

  async show(request, response) {
    const { id } = request;
    const medic = await findByField(process.env.DOCTOR_TABLE, process.env.FIELD_IDENTIFICATION, id);

    return response.send(medic);
  }

  async store(request, response) {
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

    if (!verifyCrm(crm)) {
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
  }

  async update(request, response) {
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

    const medicExist = await findByField(
      process.env.DOCTOR_TABLE,
      process.env.FIELD_IDENTIFICATION,
      id,
    );
    console.log(medicExist);
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
  }

  async delete(request, response) {
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
  }
}

module.exports = new DoctorController();
