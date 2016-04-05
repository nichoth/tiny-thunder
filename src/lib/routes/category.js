var State = require('../data/product-state')
var view = require('../view/products')

module.exports = function(cache, params) {
  var slugHash = {
    'earrings': '1202292555815846437',
    'necklaces': '1205383466661708759',
    'rings': '1205384430974141401',
    'jewelry': '1205384028874605528'

  }
  var s = State()
  s.isResolving.set(true)
  cache.forCategory(slugHash[params.category], function(err, prods) {
    if (err) return console.log(err, err.response.body)
    s.isResolving.set(false)
    s.products.set(prods)
  })
  s.render = view
  return s
}
