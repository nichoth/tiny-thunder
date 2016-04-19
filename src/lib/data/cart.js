var struct = require('observ-struct')
var observ = require('observ')
var handleErr = require('../handle-error')

module.exports = function(moltin) {

  var s = struct({
    isResolving: observ(false),
    cart: observ({ contents: {} })
  })

  function getContents(moltin, cb) {
    cb = cb || function(){}
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

  function update(moltin, itemId, patch, cb) {
    moltin.Cart.Update(itemId, patch, function onSuccess(resp) {
      cb(null, resp)
    }, function onErr(err) {
      cb(err)
    })
  }

  function del(moltin, id, cb) {
    moltin.Cart.Remove(id, function onSuccess(resp) {
      cb(null, resp)
    }, function onErr(err) {
      cb(err)
    })
  }

  function addToCart(moltin, product, qty, cb) {
    s.isResolving.set(true)
    moltin.Cart.Insert(product.id, qty, null, function onSuccess(prod) {
      getContents(moltin, cb)
      cb(null, prod)
    }, function onErr(err) {
      s.isResolving.set(false)
      cb(arguments)
    })
  }

  function complete(moltin, data, cb) {
    moltin.Cart.Complete(data, function onSuccess(order) {
      cb(null, order)
    }, function onErr(err) {
      cb(arguments)
    })
  }

  return {
    state: s,
    actions: {
      getContents: getContents.bind(null, moltin),
      addToCart: addToCart.bind(null, moltin),
      update: update.bind(null, moltin),
      remove: del.bind(null, moltin),
      complete: complete.bind(null, moltin)
    }
  }

}
