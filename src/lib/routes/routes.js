module.exports = function(moltin) {
  return {
    '/': require('./root').bind(null, (moltin)),
    '/cart': function() {
      var r = require('./cart')(moltin)
      r.fetch()
      return r
    }
  }
}
