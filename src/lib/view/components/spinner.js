var bel = require('bel')
var style = require('./spinner.csjs')

module.exports = function() {
  return bel`
    <div class="loader ${style['loader']}"></div>
  `
}