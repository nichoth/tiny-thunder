var bel = require('bel')

module.exports = function(moltin) {
  return {
    '/': require('./root').bind(null, (moltin)),
    '/cart': function() {
      var r = require('./cart')(moltin)
      r.fetch()
      return r
    },
    '/shop': require('./shop').bind(null, moltin)
  }
}
