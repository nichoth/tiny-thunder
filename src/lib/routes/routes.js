var Cache = require('../data/product-cache')

module.exports = function(moltin) {
  var cache = Cache(moltin)

  return {
    '/': require('./root').bind(null, cache),
    '/cart': function() {
      var r = require('./cart')(moltin)
      r.fetch()
      return r
    },
    '/:category': require('./category').bind(null, cache),
    '/jewelry/:subCategory': require('./sub-category').bind(null, cache),
    '/product/:productSlug': require('./product-detail').bind(null, cache)
  }
}
