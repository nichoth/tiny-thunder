var yo = require('yo-yo')
var style = require('./spinner.csjs')

module.exports = function() {
  return yo`
    <div class="loader ${style['loader']}"></div>
  `
}
