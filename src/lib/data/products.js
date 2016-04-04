var struct = require('observ-struct')
var observ = require('observ')
var handleError = require('../handle-error')

function bla(moltin) {

  var products = ProductStore(moltin)

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
}


module.exports = ProductStore

function ProductStore(moltin) {
  var s = struct({
    isResolving: observ(false),
    products: struct({})
  })

  function fetchFn() {
    s.isResolving.set(true)
    moltin.Product.Find({}, function onSuccess(products) {
      s.isResolving.set(false)
      s.products.set(products.reduce(function(acc, p) {
        acc[p.id] = p
        return acc
      }, {}))
    }, function onErr(err) {
      s.isResolving.set(false)
      console.log('err', err)
    })
  }

  s.fetch = fetchFn
  return s
}
