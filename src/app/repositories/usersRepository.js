const database = require('../../database/index');

class UsersRepository {
  async findAll() {
    const rows = await database.query(`
    SELECT *
    FROM pacientes
    `);

    return rows;
  }

  async create({
    nameComplete, email, passwordHash, verified, authLevel,
  }) {
    const [row] = await database.query(`
    INSERT INTO pacientes(nameComplete, email, passwordUser, verified, authLevel)
    VALUES($1, $2, $3, $4, $5)
    RETURNING *
    `, [nameComplete, email, passwordHash, verified, authLevel]);

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

module.exports = new UsersRepository();
