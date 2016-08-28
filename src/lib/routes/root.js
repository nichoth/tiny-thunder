var xtend = require('xtend')
var struct = require('observ-struct')
var State = require('../data/product-state')
var page = require('../view/wrapper')
var categories = require('../../config.json').categories

function handleErr (err) {
  console.log(err);
}

module.exports = function(cache, cartAdapter) {
  var s = struct({
    products: State(),
    cart: cartAdapter.state
  })

  s.products.isResolving.set(true)

  cartAdapter.actions.getContents()

  cache.fetch(function(err, prods) {
    if (err) {
      s.products.isResolving.set(false)
      return handleErr(err)
    }
    s.products.isResolving.set(false)
    s.products.products.set(prods)
  })

  s.render = function(data) {
    console.log(data)
    var links = categories.map(function(c) {
      return {
        url: '/'+c.name,
        text: c.name
      }
    })
    return page( xtend(data.products, { links: links }, { cart: data.cart }) )
  }

  return s
}
