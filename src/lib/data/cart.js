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
      s.isResolving.set(false)
      s.cart.set(cart)
    }, function onErr(err) {
      handleErr(err)
      s.isResolving.set(false)
    })
  }
  return s
}
