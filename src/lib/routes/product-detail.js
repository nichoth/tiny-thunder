var struct = require('observ-struct')
var observ = require('observ')
var productView = require('../view/product-detail')

module.exports = function(cache, cartAdapter, params) {
  var state = struct({
    isResolving: observ(true),
    product: observ(false),
    addToCart: observ(function(prod, qty, cb) {
      console.log('in here', arguments)
      cartAdapter.actions.addToCart(prod, qty, cb)
    }),
    cart: cartAdapter.state
  })
  cache.bySlug(params.productSlug, function(err, prod) {
    if (err) return console.log(err)
    state.product.set(prod)
    state.isResolving.set(false)
  })
  cartAdapter.actions.getContents(function(err, res) {

  })
  state.render = productView
  return state
}
