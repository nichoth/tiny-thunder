var struct = require('observ-struct')
var observ = require('observ')

module.exports = function Cache(moltin) {
  var products = false

  return {

    // get all products
    fetch: function fetch(cb) {
      if (products) {
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

    bySlug: function bySlug(prodSlug, cb) {
      var self = this
      if (products) {
        var prod = products[Object.keys(products).find(function(id) {
          var p = products[id]
          return p.slug === prodSlug
        })]
        if (prod) return cb(null, prod)
        return cb(new Error('Product slug not found'))
      }
      this.fetch(function(err, prods) {
        if (err) return cb(err)
        self.bySlug(prodSlug, cb)
      })
    },

    forCategory: function forCategory(catSlug, cb) {
      var self = this
      if (products) {
        return cb(null, Object.keys(products).filter(function(id) {
          var p = products[id]
          return (Object.keys(p.category.data).findIndex(function(catId) {
            var cat = p.category.data[catId]
            return cat.slug === catSlug
          }) > -1)
        }).reduce(function(acc, id) {
          acc[id] = products[id]
          return acc
        }, {}))
      }
      this.fetch(function(err, prods) {
        if (err) return cb(err)
        self.forCategory(catSlug, cb)
      })
    }

  }
}

