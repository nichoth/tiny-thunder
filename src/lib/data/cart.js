var struct = require('observ-struct')
var handleErr = require('../handle-error')

module.exports = function(moltin) {
  var s = struct({
    contents: {}
  })
  s.fetch = function() {
    moltin.Cart.Contents(function onSuccess(cart) {
      console.log(cart)
      s.set(cart)
    }, handleErr)
  }
  return s
}
