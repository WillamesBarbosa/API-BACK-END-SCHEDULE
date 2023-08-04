const database = require('../../database/index');

class SchedulesRepository {
  async findAll() {
    const rows = await database.query(`
    SELECT *
    FROM pacientes
    `);

    return rows;
  }

  async findEmail(email) {
    const emailExist = await database.query(`
      SELECT *
      FROM pacientes
      WHERE email = $1
    `, [email]);

    return emailExist;
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
