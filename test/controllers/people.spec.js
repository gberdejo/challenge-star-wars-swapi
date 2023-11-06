const request = require('supertest')

describe('lambdaService', () => {
  const api = request('http://localhost:3000')

  test('should return json data', async () => {
    const response = await api.get('/people/legacy/1').send()
    expect(response.statusCode).toBe(200)
    expect(typeof response.body).toBe('object')
  })
  test('should return array data', async () => {
    const response = await api.get('/people').send()
    expect(response.statusCode).toBe(200)
    expect(response.body).toBeInstanceOf(Array)
  })
})
