var view = require('../view/checkout')
var struct = require('observ-struct')
var observ = require('observ')

module.exports = function checkoutRoute(cartAdapter, orderModel) {
  var route = struct({
    order: orderModel.state,
    cart: cartAdapter.state,
    isResolving: observ(false),
    actions: {
      submitOrder: function(orderData) {
        route.isResolving.set(true)
        orderModel.actions.submitOrder(orderData, function(err, res) {
          route.isResolving.set(false)
          console.log(arguments)
        })
      }
    }
  })

  cartAdapter.actions.getContents()

  route.render = view
  return route
}
