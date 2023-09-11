const database = require('../../database/index');

class FindByField {
  async findByField(table, field, value) {
    const [row] = await database.query(`
          SELECT *
          FROM ${table}
          WHERE ${field} = $1
        `, [value]);

    return row;
  }
}

module.exports = new FindByField();
