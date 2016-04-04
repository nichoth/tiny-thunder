var struct = require('observ-struct')
var handleError = require('../handle-error')

module.exports = function() {

  var moltin = new Moltin({
    publicId: process.env.PUBLIC_ID
  })
  var products = ProductStore(moltin)
  moltin.Authenticate(function(auth) {
    products.fetch()
  })

  products(function onChange(data) {
    console.log('change', data)
    addToCart(data[Object.keys(data)[0]])
  })

  function addToCart(product) {
    var qty = 1
    moltin.Cart.Insert(product.id, qty, null, function(item) {
      console.log('cart insert', item)
      moltin.Cart.Contents(console.log.bind(console, 'contents'), handleError)
    }, handleError)
  }


  function ProductStore(moltin) {
    var s = struct({})

    function fetchFn() {
      moltin.Product.Find({}, function(products) {
        s.set(products.reduce(function(acc, p) {
          acc[p.id] = p
          return acc
        }, {}))
      }, function onErr(err) {
        console.log('err', err)
      })
    }

    s.fetch = fetchFn
    return s
  }
}
