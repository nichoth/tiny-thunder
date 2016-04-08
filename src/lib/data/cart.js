var struct = require('observ-struct')
var observ = require('observ')
var handleErr = require('../handle-error')

module.exports = function(moltin) {
  var s = struct({
    isResolving: observ(false),
    cart: struct({ contents: {} })
  })
  s.fetch = function() {
    s.isResolving.set(true)
    moltin.Cart.Contents(function onSuccess(cart) {
      s.cart.set(cart)
      s.isResolving.set(false)
    }, function onErr(err) {
      s.isResolving.set(false)
      handleErr(err)
    })
  }
  return s
}
