var cartView = require('../view/cart')

module.exports = function(adapter) {
  var route = adapter.state
  route.render = cartView
  adapter.actions.getContents(function(err, cart) {
    if (err) return console.log(err, err.response.body)
  })
  return route
}
