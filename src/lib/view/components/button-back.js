var btn = require('./lib/button-icon')
var icon = require('./lib/svgs').back

module.exports = function(attrs) {
  return btn(attrs, icon())
}
