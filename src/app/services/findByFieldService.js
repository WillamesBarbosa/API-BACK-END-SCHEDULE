const FindByField = require('../repositories/findByFieldsRepository');

async function findByField(table, field) {
  const data = await FindByField.findByField(table, field);

  return data;
}

module.exports = { findByField };
