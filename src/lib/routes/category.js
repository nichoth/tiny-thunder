var State = require('../data/product-state')
var view = require('../view/products')

module.exports = function(cache, params) {
  var s = State()
  s.isResolving.set(true)
  cache.forCategory(params.category, function(err, prods) {
    if (err) return console.log(err, err.response.body)
    s.isResolving.set(false)
    s.products.set(prods)
  })
  s.render = view
  return s
}
