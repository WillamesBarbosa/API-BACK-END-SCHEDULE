const database = require('../../database/index');

class UsersRepository {
  async findAll() {
    const rows = await database.query(`
    SELECT *
    FROM patient
    `);

    return rows;
  }

  async create({
    full_name, email, password_hash, street_address, city, state_province, mobile_number,
  }) {
    console.log('chegou aqui');
    const [row] = await database.query(`
    INSERT INTO patient(full_name, email, password_hash, street_address, city, state_province, mobile_number)
    VALUES($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
    `, [full_name, email, password_hash, street_address, city, state_province, mobile_number]);

    return row;
  }

  async update(
    id,
    {
      full_name, email, password, street_address, city, state_province, mobile_number,
    },
  ) {
    const [row] = await database.query(`
    UPDATE patient
    SET full_name = $1, email = $2, password_hash = $3, street_address = $4, city = $5, state_province = $6, mobile_number = $7
    WHERE id = $8
    RETURNING *
    `, [full_name, email, password, street_address, city, state_province, mobile_number, id]);

    return row;
  }

  async delete(id) {
    const dlt = await database.query(`
    DELETE FROM patient
    WHERE id = $1
    `, [id]);

    return dlt;
  }
}

module.exports = new UsersRepository();
