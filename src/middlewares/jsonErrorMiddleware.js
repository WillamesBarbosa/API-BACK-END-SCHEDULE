/* eslint-disable */
function checkIntegrityOfJSON(erro, request, response, next) {
  try {
    JSON.parse(request.body)
    next();
  } catch (error) {
    return response.status(500).json({ error: 'erro interno' });
  }
}

module.exports = { checkIntegrityOfJSON };
