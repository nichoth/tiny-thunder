var view = require('../view/order-review')
var struct = require('observ-struct')
var observ = require('observ')

// routes/order-review
module.exports = function(cartAdapter, orderModel) {
  var s = struct({
    order: orderModel.state,
    cart: cartAdapter.state,
    actions: {
      submitOrder: submitOrder
    }
  })

  function submitOrder(orderData) {
    console.log('submit order', orderData)
    cartAdapter.actions.complete(orderData.misc, function(err, order) {
      if (err) return console.log(err)
      console.log(order)
      orderModel.actions.pay(order.id, { data: orderData.payment },
        function(err, res) {
          console.log(arguments)
        }
      )
    })
  }

  s.render = view
  return s
}
