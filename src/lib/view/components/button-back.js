//var btn = require('./lib/button-icon')
var icon = require('./lib/svgs').back
var btn = require('./lib/anchor-icon')

module.exports = function(attrs) {
  return btn(attrs, icon())
}
