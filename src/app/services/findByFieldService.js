const FindByField = require('../repositories/findByFieldsRepository');
const logger = require('../logger/winston');

// Função que verifica se existe um parametro fornecido no banco de dados, se existir retorna ele
async function findByField(table, field, value) {
  try {
    const data = await FindByField.findByField(table, field, value);

    return data;
  } catch (error) {
    logger.error('Erro no FindByFieldService', error);
    throw new Error('Ocorreu um erro ao consultar o banco de dados.');
  }
}

module.exports = { findByField };
