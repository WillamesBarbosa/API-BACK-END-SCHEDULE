const FindByField = require('../repositories/findByFieldsRepository');

async function findByField(table, field, value) {
  try {
    const data = await FindByField.findByField(table, field, value);

    return data;
  } catch (error) {
    return { error: 'Erro interno findByField' };
  }
}

module.exports = { findByField };
