const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SchedulesRepository = require('../repositories/usersRepository');

class ScheduleController {
  async index(request, response) {
    const schedules = await SchedulesRepository.findAll();

    response.json(schedules);
  }

  async show(request, response) {
    const { id } = request.params;
    const user = await SchedulesRepository.findId(id);

    if (!user) {
      return response.status(404).json({ error: 'Usuário não existe' });
    }

    return response.json(user);
  }

  async login(request, response) {
    const { email, passwordUser } = request.body;

    const user = await SchedulesRepository.findEmail(email);

    if (!user) {
      return response.status(404).json({ error: 'Email não existe!' });
    }
    const passwordAuth = await bcrypt.compareSync(passwordUser, user.passworduser);

    if (!passwordAuth) {
      return response.status(401).json({ error: 'Senha incorreta!' });
    }

    const token = await jwt.sign({ userId: user.id }, process.env.SECRET, { expiresIn: 120 });
    return response.json(token);
  }

  async store(request, response) {
    const {
      nameComplete, email, passwordUser, verified = false,
    } = request.body;
    const emailAlreadyExists = await SchedulesRepository.findEmail(email);

    const passwordHash = bcrypt.hashSync(passwordUser, 15);

    if (!emailAlreadyExists) {
      const paciente = await SchedulesRepository.create({
        nameComplete, email, passwordHash, verified,
      });

      return response.json(paciente);
    }

    return response.status(409).json({ error: 'Email já existe!' });
  }

  async update(request, response) {
    const {
      nameComplete, email, passwordUser, verified = false,
    } = request.body;
    const { id } = request.params;

    console.log(request.body);

    const userExist = await SchedulesRepository.findId(id);

    if (!userExist) {
      return response.status(404).json({ error: 'Usuário não existe!' });
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
