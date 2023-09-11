const { loginService } = require('../services/loginService');
const logger = require('../logger/winston');

class Login {
  async login(request, response) {
    try {
      const { email, password } = request.body;

      const token = await loginService(email, password);

      if (!token) {
        return response.status(401).json({ erro: 'Email ou senha incorretos' });
      }

      return response.json(token);
    } catch (error) {
      logger.error('Erro no loginController', error);
      return response.status(500).json({ Error: 'Ocorreu um erro interno no servidor' });
    }
  }
}

module.exports = new Login();
