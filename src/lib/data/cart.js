var struct = require('observ-struct')
var observ = require('observ')
var handleErr = require('../handle-error')

module.exports = function(moltin) {
  var s = struct({
    isResolving: observ(false),
    cart: observ({ contents: {} })
  })

  function getContents(moltin, cb) {
    s.isResolving.set(true)
    moltin.Cart.Contents(function onSuccess(cart) {
      s.cart.set(cart)
      s.isResolving.set(false)
      cb(null, cart)
    }, function onErr(err) {
      s.isResolving.set(false)
      cb(err)
    })
  }

  function addToCart(moltin, product, qty, cb) {
    s.isResolving.set(true)
    moltin.Cart.Insert(product.id, qty, function onSuccess(prod) {
      s.isResolving.set(false)
      cb(null, prod)
    }, function onErr(err) {
      s.isResolving.set(false)
      cb(err)
    })
  }

  return {
    state: s,
    actions: {
      getContents: getContents.bind(null, moltin),
      addToCart: addToCart.bind(null, moltin)
    }
  }

}
