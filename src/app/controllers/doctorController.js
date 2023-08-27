const DoctorsRepository = require('../repositories/doctorsRepository');

const { verifyAllParameters } = require('../services/parametersValidationService');
const { findByField } = require('../services/findByFieldService');

class DoctorController {
  async store(request, response) {
    const {
      nome,
      especialidade,
      crm,
      telefone,
      email,
      passwordDoctor,
    } = request.body;

    if (verifyAllParameters(nome, especialidade, crm, telefone, email, passwordDoctor)) {
      return response.status(400).json({ error: 'bad request' });
    }
    const emailAlreadyExist = await findByField(
      process.env.DOCTOR_TABLE,
      process.env.FIELD_EMAIL,
      email,
    );
    const crmAlreadyExist = await findByField(
      process.env.DOCTOR_TABLE,
      process.env.FIELD_EMAIL,
      crm,
    );

    if (!crmAlreadyExist || !emailAlreadyExist) {
      return response.status(409).json({ erro: 'Email ou CRM já existe' });
    }

    const doctor = DoctorsRepository.create({
      nome,
      especialidade,
      crm,
      telefone,
      email,
      passwordDoctor,
      authLevel: 1,
    });

    return response.json(doctor);
  }
}

module.exports = new DoctorController();
