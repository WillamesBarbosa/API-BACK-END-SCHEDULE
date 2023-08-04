const SchedulesRepository = require('../repositories/schedulesRepository');

class ScheduleController {
  async index(request, response) {
    const schedules = await SchedulesRepository.findAll();

    response.json(schedules);
  }

  async store(request, response) {
    const {
      nameComplete, email, passwordUser, verified = false,
    } = request.body;
    const emailAlreadyExists = await SchedulesRepository.findEmail(email);

    if (emailAlreadyExists) {
      return response.json({ error: 'Email já existe!' });
    }
    const paciente = await SchedulesRepository.create({
      nameComplete, email, passwordUser, verified,
    });

    return response.json(paciente);
  }
}

module.exports = new ScheduleController();
