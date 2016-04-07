var State = require('../data/product-state')
var page = require('../view/wrapper')
var xtend = require('xtend')
var cats = require('../../config.json').categories

module.exports = function(cache, params) {
  var s = State()
  s.isResolving.set(true)
  s.activeLink.set('jewelry')
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
        activeLink: c.name === 'jewelry'
      }
    })
    var subLinks = cats.jewelry.children.map(function(child) {
      return {
        url: '/jewelry/'+child.name,
        text: child.name
      }
    })
    return page(xtend(data, { links: links, subLinks: subLinks }))
  }
  return s
}
