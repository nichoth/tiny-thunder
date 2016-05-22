var struct = require('observ-struct')
var xtend = require('xtend')
var observ = require('observ')
var shipping = require('../../config.json').shippingId
var ls = window.localStorage

module.exports = function(moltin, cartModel) {
  //var state = ls.getItem('tt-form-data')
  //var info = state ? JSON.parse(state) : { customer: {}, payment: {} }

  var s = struct({
    status: observ(null)
  })


  function submitOrder(moltin, orderData, cb) {
    console.log(orderData)

    var d = xtend({
      gateway: 'dummy',
      shipping: shipping
    }, orderData.order)

    moltin.Cart.Complete(d, function onSuccess(order) {
      moltin.Checkout.Payment('purchase', order.id, { data: orderData.payment },
        function onSuccess(resp) {
          resp.type = 'success'
          s.status.set(resp)
          cb(null, resp)
        }, function onErr(err, msg, code) {
          s.status.set({
            type: 'error',
            msg: msg,
            code: code
          })
          cb(arguments)
      })
    }, function onErr(err, msg, code) {
      s.status.set({
        type: 'error',
        msg: JSON.stringify(msg),
        code: code
      })
      cb(arguments)
    })
  }

  return {
    state: s,
    actions: {
      submitOrder: submitOrder.bind(null, moltin)
    }
  }
}
