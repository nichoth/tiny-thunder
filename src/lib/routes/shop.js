var productView = require('../view/products')
var handleErr = require('../handle-error')
var ProductState = require('../data/product-state')

module.exports = function(cache) {
  var s = ProductState()
  s.isResolving.set(true)
  cache.fetch(function(err, prods) {
    if (err) {
      s.isResolving.set(false)
      return handleErr(err)
    }
    s.isResolving.set(false)
    s.products.set(prods)
  })
  s.render = productView
  return s
}

