const { post } = require('../../src/controllers/people/create.js') // Asegúrate de proporcionar la ruta correcta.
const PeopleService = require('../../src/services/people.js') // Asegúrate de proporcionar la ruta correcta.

// Mock de PeopleService con Jest
jest.mock('../../src/services/people', () => {
  return {
    createPeople: jest.fn(),
    findOnePeopleBySku: jest.fn(),
  }
})

describe('POST /people', () => {
  beforeEach(() => {
    // Limpiar todas las instancias y llamadas al constructor y todos los métodos:
    PeopleService.createPeople.mockClear()
    PeopleService.findOnePeopleBySku.mockClear()
  })

  it('debería crear una nueva persona y devolver los datos', async () => {
    // Define el cuerpo de tu solicitud
    const body = {
      nombre: 'Gabriel',
      altura: '10000000',
      peso: '300',
      colorCabello: 'negro',
      colorPiel: 'negro',
      colorOjos: 'marrones',
      anioNacimiento: '2021',
      genero: 'F',
      mundoNatal: 'https://swapi.dev/api/planets/20/',
      peliculas: [
        'https://swapi.dev/api/films/1/',
        'https://swapi.dev/api/films/2/',
        'https://swapi.dev/api/films/3/',
        'https://swapi.dev/api/films/4/',
        'https://swapi.dev/api/films/5/',
        'https://swapi.dev/api/films/6/',
      ],
      especies: ['https://swapi.dev/api/species/1/'],
      vehiculos: [
        'https://swapi.dev/api/vehicles/14/',
        'https://swapi.dev/api/vehicles/30/',
      ],
      navesEstelares: [
        'https://swapi.dev/api/starships/12/',
        'https://swapi.dev/api/starships/22/',
      ],
      creacion: '2014-12-18T11:21:58.954000Z',
      edicion: '2014-12-20T21:17:50.369000Z',
      url: 'https://swapi.dev/api/people/30/',
    }

    // Mock de los métodos de PeopleService
    PeopleService.createPeople.mockResolvedValue(undefined) // No es necesario resolver con un valor para operaciones de inserción.
    PeopleService.findOnePeopleBySku.mockResolvedValue(body) // Esto debería resolver con la salida esperada.

    // Simula el evento
    const event = {
      body: JSON.stringify(body),
    }

    const result = await post(event)

    // Esperamos que PeopleService.createPeople haya sido llamado
    expect(PeopleService.createPeople).toHaveBeenCalledWith({
      ...body,
      sku: expect.any(String), // Dado que el sku es generado por nanoid, esperamos cualquier string aquí.
    })

    // Verificar que la respuesta HTTP es la esperada
    expect(result.statusCode).toBe(200)
    expect(result.body).toEqual(JSON.stringify(body))
  })
})
