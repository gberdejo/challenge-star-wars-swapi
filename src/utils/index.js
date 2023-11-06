const { default: axios } = require('axios')
const { customAlphabet } = require('nanoid')

const call = async ({ url, data, method }) => {
  try {
    return await axios({
      method,
      url,
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(data),
    })
  } catch (err) {
    throw err
  }
}

const nanoid = customAlphabet('1234567890', 18)

module.exports = {
  call,
  nanoid,
}
