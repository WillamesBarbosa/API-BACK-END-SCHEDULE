function verifyAllParameters(...args) {
  return args.includes(undefined);
}
module.exports = {
  verifyAllParameters,
};
