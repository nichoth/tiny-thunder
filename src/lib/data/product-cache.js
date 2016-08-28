var struct = require('observ-struct')
var observ = require('observ')

function getAllProducts (moltin, err, data, cb) {
  if (err) return cb(err)

  if ( !data || (data.meta.offsets.next) ) {
    var req = data ?
      { offset: data.meta.offsets.next } :
      null

    return moltin.Product.List(req, function onSuccess (resp, meta) {
      console.log('resp', arguments);
      var newData = {
        resp: data ? data.resp.concat(resp) : resp,
        meta: meta
      }
      getAllProducts(moltin, null, newData, cb)
    }, function onErr (err) {
      getAllProducts(moltin, err, null, cb)
    })
  }

  var products = data.resp.reduce(function(acc, prod) {
    acc[prod.id] = prod
    return acc
  }, {})

  cb(null, products)
}

module.exports = function Cache(moltin) {
  var products = false

  return {

    // get all products
    fetch: function fetch(cb) {
      if (products) {
        return setTimeout(function () {
          cb(null, products)
        }, 0)
      }

      getAllProducts(moltin, null, null, function onResp (err, prods) {
        if (err) return cb(err)
        products = prods
        cb(null, products)
      })
    },

      // moltin.Product.List(null, function onSuccess(resp, meta) {
      //   console.log('resp', arguments)
      //   products = resp.reduce(function(acc, prod) {
      //     acc[prod.id] = prod
      //     return acc
      //   }, {})
      //   cb(null, products)
      // }, function onErr(err) {
      //   cb(err)
      // })
    // },

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

