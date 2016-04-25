var struct = require('observ-struct')
var observ = require('observ')
var after = require('after')

module.exports = function(moltin) {

  var patches = {}

  var s = struct({
    isResolving: observ(false),
    isDirty: observ(false),
    isUpdating: observ(false),
    cart: observ({ contents: {} })
  })

  function getContents(moltin, cb) {
    cb = cb || function(){}
    s.isResolving.set(true)
    moltin.Cart.Contents(function onSuccess(cart) {
      s.cart.set(cart)
      s.isResolving.set(false)
      s.isDirty.set(false)
      cb(null, cart)
    }, function onErr(err) {
      s.isResolving.set(false)
      cb(err)
    })
  }

  function dirtyQtyUpdate(id, qty) {
    s.isDirty.set(true)
    patches[id] = { id: id, qty: qty }
    var cart = s.cart()
    cart.contents[id].quantity = qty
    s.cart.set(cart)
  }

  function syncQty(moltin, patches, cb) {
    s.isUpdating.set(true)

    var next = after(Object.keys(patches).length, function doneUpdating(err) {
      if (err) return cb(err)

      moltin.Cart.Contents(function(items) {
        s.cart.set(items)
        s.isUpdating.set(false)
        s.isDirty.set(false)
        patches = {}
        cb(null, items)
      }, function(err) {
        s.isUpdating.set(false)
        cb(arguments)
      })
    })

    Object.keys(patches).forEach(function(patchId) {
      var patch = patches[patchId]
      moltin.Cart.Update(patch.id, { quantity: patch.qty },
        function onSuccess(resp) {
          next(null)
        }, function onErr(err) {
          next(arguments)
        }
      )
    })
  }

  function remove(moltin, id, cb) {
    s.isUpdating.set(true)
    moltin.Cart.Remove(id, function onSuccess(resp) {
      moltin.Cart.Contents(function(cart) {
        s.cart.set(cart)
        s.isUpdating.set(false)
        s.isDirty.set(false)
        cb(null, cart)
      }, function(err) {
        s.isUpdating.set(false)
        cb(arguments)
      })
    }, function onErr(err) {
      cb(arguments)
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
      dirtyQtyUpdate: dirtyQtyUpdate,
      syncQty: syncQty.bind(null, moltin, patches),
      remove: remove.bind(null, moltin),
      complete: complete.bind(null, moltin)
    }
  }

}
