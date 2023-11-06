const response = (status, data) => ({
  statusCode: status,
  body: JSON.stringify(data),
  headers: { 'Content-Type': 'application/json' },
})
module.exports = { response }
