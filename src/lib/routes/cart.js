var cartView = require('../view/cart')
var struct = require('observ-struct')
var observ = require('observ')

module.exports = function(adapter) {

  var route = struct({
    onAction: {
      qtyChange: function(id, qty) {
        adapter.actions.dirtyQtyUpdate(id, qty)
      },
      update: function() {
        adapter.actions.syncQty(function(err, resp) {
          if (err) console.log(err)
        })
      },
      remove: function(id) {
        adapter.actions.remove(id, function(err, resp) {
          if (err) return console.log(err)
          console.log('success del')
        })
      }
    },
    cart: adapter.state
  })

  route.render = cartView
  adapter.actions.getContents(function(err, cart) {
    if (err) return console.log(err, err.response.body)
  })

  return route
}
