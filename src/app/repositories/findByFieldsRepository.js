const database = require('../../database/index');

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
      return console.log('erro no findByFieldRepository', error);
    }
  }
}

module.exports = new FindByField();
