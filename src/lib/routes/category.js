var struct = require('observ-struct')
var State = require('../data/product-state')
var xtend = require('xtend')
var cats = require('../../config.json').categories
var page = require('../view/wrapper')

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
      var active = c.name === params.category

      return {
        url: active ? '/' : '/'+c.name,
        text: c.name,
        activeLink: active
      }
    })

    var activeLink = cats.find(function(c) {
      return c.name === params.category
    })

    var subLinks = activeLink && activeLink.children ?
      activeLink.children.map(function(ch) {
        return {
          url: '/'+activeLink.name+'/'+ch.name,
          text: ch.name
        }
      }) :
      ''

    return page( xtend(data.products, {
      links: links,
      subLinks: subLinks
    }, { cart: data.cart }))
  }
  return s
}
