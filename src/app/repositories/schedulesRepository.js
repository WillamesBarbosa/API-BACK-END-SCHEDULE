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
    const [emailExist] = await database.query(`
      SELECT *
      FROM pacientes
      WHERE email = $1
    `, [email]);

    return emailExist;
  }

  async findId(id) {
    const [idExist] = await database.query(`
    SELECT *
    FROM pacientes
    WHERE id = $1
    `, [id]);

    return idExist;
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

  async delete(id) {
    const dlt = await database.query(`
    DELETE FROM pacientes
    WHERE id = $1
    `, [id]);

    return dlt;
  }
}

module.exports = new SchedulesRepository();
