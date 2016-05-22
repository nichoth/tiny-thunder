var view = require('../view/checkout')
var struct = require('observ-struct')
var observ = require('observ')
var OrderModel = require('../data/order')

module.exports = function checkoutRoute(cartAdapter, moltin) {

  cartAdapter.actions.getContents()
  var orderModel = OrderModel(moltin)

  var route = struct({
    order: orderModel.state,
    cart: cartAdapter.state,
    isResolving: observ(false),
    actions: {
      submitOrder: function(orderData) {
        route.isResolving.set(true)
        orderModel.actions.submitOrder(orderData, function(err, res) {
          route.isResolving.set(false)
          if (err) return console.log(err)
          cartAdapter.actions.clear(function(err, resp) {
            //console.log('in here', arguments)
          })
          console.log(arguments)
        })
      }
    }
  })

  route.render = view
  return route
}
