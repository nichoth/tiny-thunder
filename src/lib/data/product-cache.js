module.exports = function Cache(moltin) {
  var products = {}
  return {
    fetch: function fetch(cb) {
      if (Object.keys(products).length) {
        return cb(null, products)
      }
      moltin.Product.Find({}, function onSuccess(resp) {
        products = resp.reduce(function(acc, prod) {
          acc[prod.id] = prod
          return acc
        }, {})
        cb(null, products)
      }, function onErr(err) {
        cb(err)
      })
    },
    forCategory: function(cat, cb) {
      var self = this
      if (Object.keys(products).length) {
        return cb(null, Object.keys(products).filter(function(id) {
          var p = products[id]
          return (Object.keys(p.category.data).indexOf(cat) > -1)
        }).reduce(function(acc, id) {
          acc[id] = products[id]
          return acc
        }, {}))
      }
      this.fetch(function(err, prods) {
        if (err) return cb(err)
        self.forCategory(cat, cb)
      })
    }
  }
}

