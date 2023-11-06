const { nanoid } = require('../utils')

class People {
  constructor({
    id,
    name,
    height,
    mass,
    hair_color,
    skin_color,
    eye_color,
    birth_year,
    gender,
    homeworld,
    films,
    species,
    vehicles,
    starships,
    created,
    edited,
    url,
  }) {
    this.id = id
    this.sku = nanoid()
    this.nombre = name
    this.altura = height
    this.peso = mass
    this.colorCabello = hair_color
    this.colorPiel = skin_color
    this.colorOjos = eye_color
    this.anioNacimiento = birth_year
    this.genero = gender
    this.mundoNatal = homeworld
    this.peliculas = films
    this.especies = species
    this.vehiculos = vehicles
    this.navesEstelares = starships
    this.creacion = created
    this.edicion = edited
    this.url = url
  }
}

module.exports = {
  People,
}
