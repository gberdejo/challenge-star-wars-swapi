'use strict'

const { response } = require('../../helpers/functions')
const { STATUS } = require('../../helpers/constans')
const AWS = require('aws-sdk')
const PeopleProvider = require('../../providers')
const { People } = require('../../models/people')
const PeopleService = require('../../services/people')

module.exports.get = async (event) => {
  try {
    const id = event.pathParameters.id

    const peopleExists = await PeopleService.findOnePeopleById(id)

    console.debug('peopleExists', peopleExists)

    if (peopleExists && peopleExists.id) {
      return response(
        STATUS.OK,
        AWS.DynamoDB.Converter.unmarshall(peopleExists)
      )
    } else {
      const peopleResponse = await PeopleProvider.findOnePeopleById(id)

      console.log('peopleResponse', peopleResponse)

      const people = new People({ ...peopleResponse, id })

      console.log('people', people)

      await PeopleService.createPeople(people)

      const $people = await PeopleService.findOnePeopleById(people.id)

      return response(STATUS.OK, AWS.DynamoDB.Converter.unmarshall($people))
    }
  } catch (err) {
    return response(STATUS.INTERNAL_SERVER_ERROR, {
      message: err.message,
      stack: err.stack,
    })
  }
}
