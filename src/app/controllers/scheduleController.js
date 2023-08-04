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
    const paciente = await SchedulesRepository.create({
      nameComplete, email, passwordUser, verified,
    });

    response.json(paciente);
  }
}

module.exports = new ScheduleController();
