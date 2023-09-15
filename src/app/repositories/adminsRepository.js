const database = require('../../database/index');

class AdminsRepository {
  async findAll() {
    const rows = await database.query(`
    SELECT *
    FROM admin
    `);

    return rows;
  }

  async create({ full_name, email, password_hash }) {
    const [rows] = await database.query(`
    INSERT INTO admin(full_name, email, password_hash)
    VALUES($1, $2, $3)
    RETURNING *
    `, [full_name, email, password_hash]);

    return rows;
  }

  async update(
    {
      full_name,
      password,
      email,
    },
    id,
  ) {
    const [rows] = await database.query(
      `
      UPDATE admin
      SET full_name = $1,
      email = $2,
      password_hash = $3
      WHERE id = $4
      RETURNING *
      `,
      [
        full_name,
        email,
        password,
        id,
      ],
    );
    console.log(rows);
    return rows;
  }
}

module.exports = new AdminsRepository();
