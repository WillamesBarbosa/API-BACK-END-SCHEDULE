const database = require('../../database/index');
const logger = require('../logger/winston');

class FindByField {
  async findByField(table, field, value) {
    try {
      const [row] = await database.query(`
            SELECT *
            FROM ${table}
            WHERE ${field} = $1
          `, [value]);

      return row;
    } catch (error) {
      logger.error('Erro no findByFieldRepository', error);
      throw new Error('Ocorreu um erro durante uma consulta ao banco de dados.');
    }
  }
}

module.exports = new FindByField();
