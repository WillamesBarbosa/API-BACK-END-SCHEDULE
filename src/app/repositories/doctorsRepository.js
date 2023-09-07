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
}

module.exports = new DoctorsRepository();
