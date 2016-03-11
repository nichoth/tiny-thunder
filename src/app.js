var Router = require('./lib/routes')
var struct = require('observ-struct')
var bel = require('bel')
var update = require('update-el')
var onRoute = require('route-event')
var delButton = require('h-buttons/lib/delete')

module.exports = function() {

  var el = render('')
  var router = Router(update.bind(null, el))

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


  onRoute(function(path) {
    var m = router.match(path)
    m.fn(m.params)
  })

  function render(text) {
    return bel`<div class="app">${text}</div>`
  }

  return el
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

function handleError(err) {
  console.log(err)
}
