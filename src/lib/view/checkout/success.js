var bel = require('bel')
var style = require('./checkout.csjs')

module.exports = function(data) {
  return bel`<div class="${style['success-page']}">
    <h1>success</h1>
    <p>
      Congratulations. You will get something nice in the mail.
      Your order number is <span class="${style['order-number']}">
        ${data.order.status.order.id}
      </span>.
    </p>
  </div>`
}
