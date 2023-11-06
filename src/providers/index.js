const { call } = require('../utils')

const findOnePeopleById = async (id) => {
  try {
    let { data: people } = await call({
      url: process.env.API_SWAPI + '/people/' + id,
      method: 'GET',
    })
    return people
  } catch (error) {
    throw new Error('Error en la petición de la API SWAPI - findOnePeopleById')
  }
}

module.exports = { findOnePeopleById }
