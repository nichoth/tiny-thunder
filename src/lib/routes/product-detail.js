var struct = require('observ-struct')
var observ = require('observ')
var productView = require('../view/product-detail')

module.exports = function(cache, params) {
  var state = struct({
    isResolving: observ(true),
    product: observ(false)
  })
  cache.bySlug(params.productSlug, function(err, prod) {
    state.isResolving.set(false)
    if (err) return console.log(err)
    state.product.set(prod)
  })
  state.render = productView
  return state
}
