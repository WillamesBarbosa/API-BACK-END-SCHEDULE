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
}

module.exports = new AdminsRepository();
