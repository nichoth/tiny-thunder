var struct = require('observ-struct')
var observ = require('observ')
var productView = require('../view/product-detail')

module.exports = function(cache, params) {
  var state = struct({
    isResolving: observ(true),
    product: observ(false),
    addToCart: observ(function(id, qty, cb) {
      console.log('in here', arguments)
    })
  })
  cache.bySlug(params.productSlug, function(err, prod) {
    if (err) return console.log(err)
    state.product.set(prod)
    state.isResolving.set(false)
  })
  state.render = productView
  return state
}