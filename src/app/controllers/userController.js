const bcrypt = require('bcrypt');
require('dotenv').config();

const UsersRepository = require('../repositories/usersRepository');

const { findByField } = require('../services/findByFieldService');
const { verifyAllParameters } = require('../services/parametersValidationService');
const { tokenGenerator } = require('../services/tokenService');

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
      const user = await findByField(process.env.USER_TABLE, process.env.FIELD_IDENTIFICATION, id);

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
      const { email, password } = request.body;

      const token = await tokenGenerator(email, password);

      if (!token) {
        response.status(401).json({ erro: 'Email ou senha incorretos' });
      }

      return response.json(token);
    } catch (error) {
      return response.status(500).json({ Error: 'Ocorreu um erro interno no servidor' });
    }
  }

  async store(request, response) {
    try {
      const {
        full_name, email, password, street_address, city, state_province, mobile_number,
      } = request.body;

      if (verifyAllParameters(
        full_name,
        email,
        password,
        street_address,
        city,
        state_province,
        mobile_number,
      )) {
        return response.status(400).json({ error: 'bad request' });
      }

      const emailAlreadyExists = await findByField(
        process.env.USER_TABLE,
        process.env.FIELD_EMAIL,
        email,
      );

      const password_hash = await bcrypt.hash(password, 15);

      if (!emailAlreadyExists) {
        const paciente = await UsersRepository.create({
          full_name, email, password_hash, street_address, city, state_province, mobile_number,
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
        full_name, email, password, street_address, city, state_province, mobile_number,
      } = request.body;
      const { id } = request;

      if (verifyAllParameters(
        full_name,
        email,
        password,
        street_address,
        city,
        state_province,
        mobile_number,
      )) {
        return response.status(400).json({ error: 'bad request' });
      }

      const userExist = await findByField(
        process.env.USER_TABLE,
        process.env.FIELD_IDENTIFICATION,
        id,
      );

      if (!userExist) {
        return response.status(404).json({ error: 'Usuário não existe!' });
      }

      const patient = await UsersRepository.update(
        id,
        {
          full_name, email, password, street_address, city, state_province, mobile_number,
        },
      );

      return response.json(patient);
    } catch (error) {
      return response.status(500).json({ Error: 'Ocorreu um erro interno no servidor' });
    }
  }

  async delete(request, response) {
    try {
      const { id } = request;

      const idExist = await findByField(
        process.env.USER_TABLE,
        process.env.FIELD_IDENTIFICATION,
        id,
      );

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
