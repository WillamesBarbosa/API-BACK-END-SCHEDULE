const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SchedulesRepository = require('../repositories/usersRepository');

class ScheduleController {
  async index(request, response) {
    try {
      const schedules = await SchedulesRepository.findAll();

      return response.json(schedules);
    } catch (error) {
      return response.status(500).json('Ocorreu um erro interno no servidor');
    }
  }

  async show(request, response) {
    try {
      const { id } = request;
      const user = await SchedulesRepository.findId(id);

      if (!user) {
        return response.status(404).json({ Error: 'Usuário não existe' });
      }

      return response.json(user);
    } catch (error) {
      return response.status(500).json({ Error: 'Ocorreu um erro interno no servidor' });
    }
  }

  async login(request, response) {
    try {
      const { email, passwordUser } = request.body;

      const user = await SchedulesRepository.findEmail(email);

      if (!user) {
        return response.status(404).json({ error: 'Email não existe!' });
      }
      const passwordAuth = await bcrypt.compareSync(passwordUser, user.passworduser);

      if (!passwordAuth) {
        return response.status(401).json({ error: 'Senha incorreta!' });
      }

      const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: 120 });
      return response.json(token);
    } catch (error) {
      return response.status(500).json({ Error: 'Ocorreu um erro interno no servidor' });
    }
  }

  async store(request, response) {
    try {
      const {
        nameComplete, email, passwordUser, verified = false,
      } = request.body;

      const emailAlreadyExists = await SchedulesRepository.findEmail(email);

      const passwordHash = await bcrypt.hash(passwordUser, 15);

      if (!emailAlreadyExists) {
        const paciente = await SchedulesRepository.create({
          nameComplete, email, passwordHash, verified,
        });

        return response.json(paciente);
      }

      return response.status(409).json({ error: 'Email já existe!' });
    } catch (error) {
      return response.status(500).json({ Error: 'Ocorreu um erro interno no servidor' });
    }
  }

  async update(request, response) {
    try {
      const {
        nameComplete, email, passwordUser, verified = false,
      } = request.body;
      const { id } = request;

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
    } catch (error) {
      return response.status(500).json({ Error: 'Ocorreu um erro interno no servidor' });
    }
  }

  async delete(request, response) {
    try {
      const { id } = request;

      const idExist = await SchedulesRepository.delete(id);

      if (!idExist) {
        return response.status(404).json({ Error: 'Usuário não existe' });
      }

      await SchedulesRepository.delete(id);
      return response.sendStatus(204);
    } catch (error) {
      return response.status(500).json({ Error: 'Ocorreu um erro interno no servidor' });
    }
  }
}

module.exports = new ScheduleController();
