var Cache = require('../data/product-cache')

module.exports = function(moltin) {
  var cache = Cache(moltin)

  return {
    '/': require('./root').bind(null, (moltin)),
    '/cart': function() {
      var r = require('./cart')(moltin)
      r.fetch()
      return r
    },
    '/shop': require('./shop').bind(null, cache),
    '/shop/:category': require('./category').bind(null, cache)
  }
}
