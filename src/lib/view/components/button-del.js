var btn = require('./lib/button-icon')
var svgs = require('./lib/svgs')

module.exports = function(attrs) {
  return btn(attrs, svgs.del())
}
