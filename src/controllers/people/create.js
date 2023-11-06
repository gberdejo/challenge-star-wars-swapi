const { STATUS } = require('../../helpers/constans')
const { People } = require('../../models/people')
const PeopleService = require('../../services/people')
const { response } = require('../../helpers/functions')
const AWS = require('aws-sdk')
const { nanoid } = require('../../utils')

const createPeople = async (body) => {
  const data = { ...body, sku: nanoid() }

  await PeopleService.createPeople(data)

  return PeopleService.findOnePeopleBySku(data.sku)
}

module.exports.post = async (event) => {
  try {
    const data = JSON.parse(event.body)

    const $people = await createPeople(data)

    return response(STATUS.OK, $people)
  } catch (err) {
    return response(STATUS.INTERNAL_SERVER_ERROR, {
      message: err.message,
      stack: err.stack,
    })
  }
}
