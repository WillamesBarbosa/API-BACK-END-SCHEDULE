const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const UsersRepository = require('../repositories/usersRepository');

class UserController {
  async index(request, response) {
    try {
      const users = await UsersRepository.findAll();

      return response.json(users);
    } catch (error) {
      return response.status(500).json('Ocorreu um erro interno no servidor');
    }
  }

  async show(request, response) {
    try {
      const { id } = request;
      const user = await UsersRepository.findId(id);

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

      const user = await UsersRepository.findEmail(email);

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
        nameComplete, email, passwordUser, verified = false, authLevel = 0,
      } = request.body;

      const emailAlreadyExists = await UsersRepository.findEmail(email);

      const passwordHash = await bcrypt.hash(passwordUser, 15);

      if (!emailAlreadyExists) {
        const paciente = await UsersRepository.create({
          nameComplete, email, passwordHash, verified, authLevel,
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

      const userExist = await UsersRepository.findId(id);

      if (!userExist) {
        return response.status(404).json({ error: 'Usuário não existe!' });
      }

      const paciente = await UsersRepository.update(
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

      const idExist = await UsersRepository.delete(id);

      if (!idExist) {
        return response.status(404).json({ Error: 'Usuário não existe' });
      }

      await UsersRepository.delete(id);
      return response.sendStatus(204);
    } catch (error) {
      return response.status(500).json({ Error: 'Ocorreu um erro interno no servidor' });
    }
  }
}

module.exports = new UserController();
