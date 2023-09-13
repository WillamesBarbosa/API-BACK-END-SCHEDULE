// Função que verifica se existe algum parâmetro undefined
function verifyAllParameters(...args) {
  return args.includes(undefined);
}
module.exports = {
  verifyAllParameters,
};
