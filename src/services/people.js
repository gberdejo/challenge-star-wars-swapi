const {
  DynamoDBClient,
  PutItemCommand,
  ScanCommand,
} = require('@aws-sdk/client-dynamodb')

const AWS = require('aws-sdk')

const client = new DynamoDBClient()

const findOnePeopleById = async (id) => {
  const command = new ScanCommand({
    TableName: process.env.DYNAMODB_TABLE,
    FilterExpression: 'id = :idValue',
    ExpressionAttributeValues: {
      ':idValue': { S: id.toString() },
    },
  })

  const data = await client.send(command)

  return data.Items[0]
}

const findOnePeopleBySku = async (sku) => {
  const command = new ScanCommand({
    TableName: process.env.DYNAMODB_TABLE,
    FilterExpression: 'sku = :skuValue',
    ExpressionAttributeValues: {
      ':skuValue': { S: sku },
    },
  })

  const data = await client.send(command)

  return AWS.DynamoDB.Converter.unmarshall(data.Items[0])
}

const createPeople = (Item) => {
  const command = new PutItemCommand({
    TableName: process.env.DYNAMODB_TABLE,
    Item: AWS.DynamoDB.Converter.marshall(Item),
  })

  return client.send(command)
}

const findAllPeople = async () => {
  const command = new ScanCommand({
    TableName: process.env.DYNAMODB_TABLE,
  })

  const people = await client.send(command)

  return people.Items.map((people) => AWS.DynamoDB.Converter.unmarshall(people))
}

module.exports = {
  createPeople,
  findOnePeopleById,
  findOnePeopleBySku,
  findAllPeople,
}
