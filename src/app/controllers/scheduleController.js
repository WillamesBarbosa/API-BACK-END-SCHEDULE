const SchedulesRepository = require('../repositories/schedulesRepository');

class ScheduleController {
  async index(request, response) {
    const schedules = await SchedulesRepository.findAll();

    response.json(schedules);
  }

  async show(request, response) {
    const { id } = request.params;
    const user = await SchedulesRepository.findId(id);

    if (!user) {
      return response.json({ error: 'Usuário não existe' });
    }

    return response.json(user);
  }

  async store(request, response) {
    const {
      nameComplete, email, passwordUser, verified = false,
    } = request.body;
    const emailAlreadyExists = await SchedulesRepository.findEmail(email);

    if (!emailAlreadyExists) {
      const paciente = await SchedulesRepository.create({
        nameComplete, email, passwordUser, verified,
      });

      return response.json(paciente);
    }

    return response.json({ error: 'Email já existe!' });
  }

  async update(request, response) {
    const {
      nameComplete, email, passwordUser, verified = false,
    } = request.body;
    const { id } = request.params;

    console.log(request.body);

    const userExist = await SchedulesRepository.findId(id);

    if (!userExist) {
      return response.json({ error: 'Usuário não existe!' });
    }

    const paciente = await SchedulesRepository.update(
      id,
      {
        nameComplete,

        email,

        passwordUser,

        verified,
      },
    );

    return response.json(paciente);
  }

  async delete(request, response) {
    const { id } = request.params;

    const idExist = await SchedulesRepository.delete(id);

    if (!idExist) {
      return response.status(404).json({ Error: 'Usuário não existe' });
    }

    await SchedulesRepository.delete(id);
    return response.sendStatus(204);
  }
}

module.exports = new ScheduleController();
