const SchedulesRepository = require('../repositories/schedulesRepository');

class ScheduleController {
  async index(request, response) {
    const schedules = await SchedulesRepository.findAll();

    response.json(schedules);
  }
}

module.exports = new ScheduleController();
