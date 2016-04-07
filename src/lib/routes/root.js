var xtend = require('xtend')
var State = require('../data/product-state')
var page = require('../view/wrapper')
var categories = require('../../config.json').categories

module.exports = function(cache) {
  var s = State()
  s.isResolving.set(true)
  cache.fetch(function(err, prods) {
    if (err) {
      s.isResolving.set(false)
      return handleErr(err)
    }
    s.isResolving.set(false)
    s.products.set(prods)
  })
  s.render = function(data) {
    var links = categories.map(function(c) {
      return {
        url: '/'+c.name,
        text: c.name
      }
    })
    return page( xtend(data, { links: links }) )
  }
  return s
}
