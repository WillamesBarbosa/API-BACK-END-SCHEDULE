const database = require('../database/index');

class SchedulesRepository {
  async findAll() {
    const rows = database.query(`
    SELECT *
    FROM pacientes
    `);

    return rows;
  }
}

module.exports = new SchedulesRepository();
