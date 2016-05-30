var struct = require('observ-struct')
var State = require('../data/product-state')
var page = require('../view/wrapper')
var xtend = require('xtend')
var cats = require('../../config.json').categories

module.exports = function(cache, cartAdapter, params) {
  var s = struct({
    products: State(),
    cart: cartAdapter.state
  })

  cartAdapter.actions.getContents()

  s.products.isResolving.set(true)
  cache.forCategory(params.category, function(err, prods) {
    if (err) return console.log(err, err.response.body)
    s.products.isResolving.set(false)
    s.products.products.set(prods)
  })
  s.render = function(data) {

    var links = cats.map(function(c) {
      return {
        url: '/'+c.name,
        text: c.name,
        activeLink: c.name === 'jewelry'
      }
    })

    var subLinks = cats.find(function(c) {
      return c.name === 'jewelry'
    }).children.map(function(child) {
      var active = child.name === params.subCategory
      return {
        url: active ? '/jewelry' : '/jewelry/'+child.name,
        text: child.name,
        activeLink: active
      }
    })

    return page(xtend(data.products, { links: links, subLinks: subLinks }, {
      cart: data.cart }))
  }

  return s
}
