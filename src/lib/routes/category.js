var State = require('../data/product-state')
var xtend = require('xtend')
var cats = require('../../config.json').categories
var page = require('../view/wrapper')

module.exports = function(cache, params) {
  var s = State()
  s.isResolving.set(true)
  cache.forCategory(params.category, function(err, prods) {
    if (err) return console.log(err, err.response.body)
    s.isResolving.set(false)
    s.products.set(prods)
  })
  s.render = function(data) {
    var links = cats.map(function(c) {
      return {
        url: '/'+c.name,
        text: c.name,
        activeLink: c.name === params.category
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

    return page( xtend(data, {
      links: links,
      subLinks: subLinks
    }))
  }
  return s
}