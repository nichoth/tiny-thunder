var struct = require('observ-struct')
var view = require('../view/root')

module.exports = function() {
  var route = struct({})
  route.render = view
  return route
}
