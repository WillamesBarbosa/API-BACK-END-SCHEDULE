const database = require('../../database/index');

class SchedulesRepository {
  async findAll() {
    const rows = await database.query(`
    SELECT *
    FROM pacientes
    `);

    return rows;
  }

  async create({
    nameComplete, email, passwordUser, verified,
  }) {
    const [row] = await database.query(`
    INSERT INTO pacientes(nameComplete, email, passwordUser, verified)
    VALUES($1, $2, $3, $4)
    RETURNING *
    `, [nameComplete, email, passwordUser, verified]);

    return row;
  }
}

module.exports = new SchedulesRepository();
