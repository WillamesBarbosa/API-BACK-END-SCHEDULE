const FindByField = require('../repositories/findByFieldsRepository');

async function findByField(table, field) {
  const data = FindByField.findByField(table, field);

  return data;
}

module.exports = { findByField };
