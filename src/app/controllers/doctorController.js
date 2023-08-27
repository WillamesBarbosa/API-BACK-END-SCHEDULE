const DoctorsRepository = require('../repositories/doctorsRepository');

const { verifyAllParameters } = require('../services/parametersValidationService');

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
      return response.status(401).json({ error: 'bad request' });
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
