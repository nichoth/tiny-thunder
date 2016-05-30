var Cache = require('../data/product-cache')
var CartAdapter = require('../data/cart')
var OrderModel = require('../data/order')

module.exports = function(moltin, setRoute) {
  var cache = Cache(moltin)
  var cartAdapter = CartAdapter(moltin)
  //var orderModel = OrderModel(moltin)

  return {
    '/': require('./root').bind(null, cache, cartAdapter),
    '/cart': require('./cart').bind(null, cartAdapter),
    '/:category': require('./category').bind(null, cache),
    '/jewelry/:subCategory': require('./sub-category').bind(null, cache),
    '/product/:productSlug': require('./product-detail')
      .bind(null, cache, cartAdapter),
    '/cart/checkout': require('./checkout').bind(null, cartAdapter, moltin)
  }
}
