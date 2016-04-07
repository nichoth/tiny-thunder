var State = require('../data/product-state')
var page = require('../view/wrapper')
var xtend = require('xtend')
var cats = require('../../config.json').categories

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
        activeLink: c.name === 'jewelry'
      }
    })
    var subLinks = cats.find(function(c) {
      return c.name === 'jewelry'
    }).children.map(function(child) {
      return {
        url: '/jewelry/'+child.name,
        text: child.name,
        activeLink: child.name === params.subCategory
      }
    })
    return page(xtend(data, { links: links, subLinks: subLinks }))
  }
  return s
}
