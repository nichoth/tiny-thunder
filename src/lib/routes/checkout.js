var view = require('../view/checkout')
var struct = require('observ-struct')
var observ = require('observ')

module.exports = function checkoutRoute(cartAdapter, actions) {
  var route = struct({
    actions: {
      submit: function(formData) {
        console.log('in here', formData)
        actions.setOrderInfo(formData)
        actions.setRoute('/cart/review')
      }
    }
  })

  route.render = view
  return route
}
