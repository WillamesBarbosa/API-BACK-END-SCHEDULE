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
    const [row] = await database.query(`
      SELECT *
      FROM pacientes
      WHERE email = $1
    `, [email]);

    return row;
  }

  async findId(id) {
    const [row] = await database.query(`
    SELECT *
    FROM pacientes
    WHERE id = $1
    `, [id]);

    return row;
  }

  async create({
    nameComplete, email, passwordHash, verified,
  }) {
    const [row] = await database.query(`
    INSERT INTO pacientes(nameComplete, email, passwordUser, verified)
    VALUES($1, $2, $3, $4)
    RETURNING *
    `, [nameComplete, email, passwordHash, verified]);

    return row;
  }

  async update(
    id,
    {
      nameComplete,
      email,
      passwordUser,
      verified,
    },
  ) {
    console.log(nameComplete);
    const [row] = await database.query(`
    UPDATE pacientes
    SET nameComplete = $1, email = $2, passwordUser = $3, verified = $4
    WHERE id = $5
    RETURNING *
    `, [nameComplete, email, passwordUser, verified, id]);

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