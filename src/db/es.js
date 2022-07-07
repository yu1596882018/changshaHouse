const elasticsearch = require('elasticsearch')
const {esConfig, connectES} = require('../config')

module.exports = connectES ? new elasticsearch.Client(esConfig): {
  create() {}
}
