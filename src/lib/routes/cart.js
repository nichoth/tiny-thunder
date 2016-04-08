var cartView = require('../view/cart')
var struct = require('observ-struct')
var observ = require('observ')

module.exports = function(adapter) {
  var route = struct({
    onAction: {
      qtyChange: function(id, qty) {
        update(id, { quantity: qty })
      }
    },
    isUpdating: observ(false),
    cart: adapter.state
  })

  function update(id, patch) {
    route.isUpdating.set(true)
    adapter.actions.update(id, patch, function(err, resp) {
      route.isUpdating.set(false)
      if (err) return console.log('oh no')
      var c = route().cart.cart
      c.contents[id] = resp
      route.cart.cart.set(c)
    })
  }

  route.render = cartView
  adapter.actions.getContents(function(err, cart) {
    if (err) return console.log(err, err.response.body)
  })
  return route
}
