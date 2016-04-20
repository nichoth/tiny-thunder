var struct = require('observ-struct')
var observ = require('observ')
var ls = window.localStorage

module.exports = function(moltin) {
  var state = ls.getItem('tt-form-data')
  var info = state ? JSON.parse(state) : { misc: {}, payment: {} }
  var s = struct({
    info: struct(info),
    paid: observ(false)
  })

  // save form data
  s.info(function onChange(data) {
    ls.setItem('tt-form-data', JSON.stringify(data))
  })

  function pay(moltin, orderId, cardData, cb) {
    moltin.Checkout.Payment('purchase', orderId, cardData,
      function onSuccess(order) {
        cb(null, order)
      }, function onErr(err) {
        cb(arguments)
      }
    )
  }

  return {
    state: s,
    actions: {
      pay: pay.bind(null, moltin)
    }
  }
}
