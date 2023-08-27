const database = require('../../database/index');

class FindByField {
  async findByField(table, field) {
    const [row] = await database.query(`
        SELECT *
        FROM ${table}
        WHERE ${field} = $1
      `, [field]);

    return row;
  }
}

module.exports = new FindByField();
