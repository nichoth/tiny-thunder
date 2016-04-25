var struct = require('observ-struct')
var observ = require('observ')
var productView = require('../view/product-detail')

module.exports = function(cache, cartAdapter, params) {
  var state = struct({
    isResolving: observ(true),
    product: observ(false),
    cart: cartAdapter.state,
    actions: {
      addToCart: function(prod, qty) {
        cartAdapter.actions.addToCart(prod, qty, function(err, resp) {
          console.log(resp)
        })
      }
    }
  })
  cache.bySlug(params.productSlug, function(err, prod) {
    if (err) {
      state.isResolving.set(false)
      return console.log(err)
    }
    state.product.set(prod)
    state.isResolving.set(false)
  })
  cartAdapter.actions.getContents(function(err, res) {
  })
  state.render = productView
  return state
}
