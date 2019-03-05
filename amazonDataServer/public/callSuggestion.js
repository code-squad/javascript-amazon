const suggestionObj = require('./suggestion.js')

function callSug(sugUrl) {
  return suggestionObj[sugUrl]
}

module.exports = callSug;