const DoctorsRepository = require('../repositories/doctorsRepository');

class DoctorController {
  async store(request, response) {
    const {
      nome,
      especialidade,
      crm,
      telefone,
      email,
    } = request.body;

    const doctor = DoctorsRepository.create({
      nome,
      especialidade,
      crm,
      telefone,
      email,
      authLevel: 1,
    });

    response.json(doctor);
  }
}

module.exports = new DoctorController();
