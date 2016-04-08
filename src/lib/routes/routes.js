var Cache = require('../data/product-cache')
var CartAdapter = require('../data/cart')

module.exports = function(moltin) {
  var cache = Cache(moltin)
  var cartAdapter = CartAdapter(moltin)

  return {
    '/': require('./root').bind(null, cache),
    '/cart': require('./cart').bind(null, cartAdapter),
    '/:category': require('./category').bind(null, cache),
    '/jewelry/:subCategory': require('./sub-category').bind(null, cache),
    '/product/:productSlug': require('./product-detail')
      .bind(null, cache, cartAdapter)
  }
}
