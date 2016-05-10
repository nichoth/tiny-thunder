var view = require('../view/checkout')
var struct = require('observ-struct')
var observ = require('observ')

module.exports = function checkoutRoute(cartAdapter, orderModel) {
  var route = struct({
    step: observ('address'),
    order: orderModel.state,
    cart: cartAdapter.state,
    isResolving: observ(false),
    actions: {
      submitAddress: function(formData) {
        console.log('in here', formData)
        orderModel.actions.setOrderInfo(formData)
        route.step.set('payment')
      },
      submitPaymentInfo: function(formData) {
        orderModel.actions.setPaymentInfo(formData)
        route.step.set('review')
      },
      submitOrder: function() {
        route.isResolving.set(true)
        orderModel.actions.submitOrder(function(err, res) {
          route.isResolving.set(false)
          console.log(arguments)
        })
      },
      setStep: function(step) {
        route.step.set(step)
      }
    }
  })

  cartAdapter.actions.getContents()

  route.render = view
  return route
}
