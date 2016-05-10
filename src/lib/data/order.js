var struct = require('observ-struct')
var xtend = require('xtend')
var observ = require('observ')
var shipping = require('../../config.json').shippingId
var ls = window.localStorage

module.exports = function(moltin, cartModel) {
  //var state = ls.getItem('tt-form-data')
  //var info = state ? JSON.parse(state) : { customer: {}, payment: {} }

  var s = struct({
    orderInfo: struct({
      bill_to: {},
      ship_to: {},
      customer: {},
      gateway: 'dummy',
      shipping: shipping
    }),
    paymentInfo: struct({}),
    status: struct({
      type: 'new'
    })
  })

  function setOrderInfo(data) {
    s.orderInfo.set(xtend({
      ship_to: 'bill_to',
      gateway: 'dummy',
      shipping: shipping
    }, data))
  }

  function setPaymentInfo(cardInfo) {
    s.paymentInfo.set(cardInfo)
  }

  function pay(moltin, orderId, cardData, cb) {
    moltin.Checkout.Payment('purchase', orderId, cardData,
      function onSuccess(order) {
        cb(null, order)
      }, function onErr(err) {
        cb(arguments)
      }
    )
  }

  function submitOrder(moltin, cb) {
    moltin.Cart.Complete(s.orderInfo(), function onSuccess(order) {
      moltin.Checkout.Payment('purchase', order.id, { data: s.paymentInfo() },
        function onSuccess(resp) {
          s.status.set({
            type: 'success'
          })
          s.orderInfo.set(order)
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
        msg: msg,
        code: code
      })
      cb(arguments)
    })
  }

  return {
    state: s,
    actions: {
      pay: pay.bind(null, moltin),
      setOrderInfo: setOrderInfo.bind(null),
      setPaymentInfo: setPaymentInfo.bind(null),
      submitOrder: submitOrder.bind(null, moltin)
    }
  }
}
