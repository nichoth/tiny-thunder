var view = require('../view/checkout')
var struct = require('observ-struct')
var observ = require('observ')

module.exports = function checkoutRoute(cartAdapter) {
  var route = struct({
  })
  route.render = view
  return route
}
