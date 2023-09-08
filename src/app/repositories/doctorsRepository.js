const database = require('../../database/index');

class DoctorsRepository {
  async findAll() {
    const rows = await database.query(`
      SELECT *
      FROM medic
    `);

    return rows;
  }

  async create({
    full_name,
    email,
    password_hash,
    street_address,
    city,
    state_province,
    mobile_number,
    crm,
    specialization,
  }) {
    const rows = await database.query(
      `
      INSERT INTO medic(full_name,
        email,
        password_hash,
        street_address,
        city,
        state_province,
        mobile_number,
        crm,
        specialization)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `,
      [
        full_name,
        email,
        password_hash,
        street_address,
        city,
        state_province,
        mobile_number,
        crm,
        specialization,
      ],
    );

    return rows;
  }

  async update(
    id,
    {
      full_name,
      street_address,
      password,
      email,
      city,
      state_province,
      mobile_number,
      crm,
      specialization,
    },
  ) {
    const [rows] = await database.query(
      `
      UPDATE medic
      SET full_name = $1,
      street_address = $2,
      password_hash = $3,
      email = $4,
      city = $5,
      state_province = $6,
      mobile_number = $7,
      crm = $8,
      specialization = $9
      WHERE id = $10
      `,
      [
        full_name,
        street_address,
        password,
        email,
        city,
        state_province,
        mobile_number,
        crm,
        specialization,
        id,
      ],
    );

    return rows;
  }

  async delete(id) {
    const dlt = await database.query(`
    DELETE FROM medic
    WHERE id = $1
    `, [id]);

    return dlt;
  }
}

module.exports = new DoctorsRepository();
