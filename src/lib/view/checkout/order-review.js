var bel = require('bel')
var h = bel.createElement
var style = require('./order-review.csjs')

module.exports = function(data) {
  console.log(data)
  var bAddr = data.order.info.misc.bill_to
  var sAddr = data.order.info.misc.ship_to
  var card = data.order.info.payment

  var addrLines = [
    bAddr.first_name + ' ' + bAddr.last_name,
    bAddr.address_1,
    bAddr.address_2,
    bAddr.city + ', ' + bAddr.county,
    bAddr.postcode
  ]

  var addrHead = sAddr === 'bill_to' ?
    'Billing & Shipping Address' :
    'Billing Address'

  function handleSubmit(ev) {
    data.actions.submitOrder(data.order.info)
  }

  return bel`
    <div class="tt-cart-review-page">
      <div class="tt-cart-review">

        <div class="tt-review-section">
          <h2>${addrHead}</h2>
          ${addr(addrLines)}
        </div>

        <div class="tt-review-section">
          <h2>Payment</h2>
          <p>Card ending in ${card.number.slice(-4)}</p>
        </div>

        <div class="tt-review-section">
          <h2>Order</h2>
          Order summary table here
        </div>

      </div>

      <div class="tt-review-section tt-form-controls ${gStyles['bottom-controls']}">
        <button class="tt-btn">Back</button>
        <button onclick=${handleSubmit} class="tt-btn">Place Order</button>
      </div>

    </div>
  `
}

function addr(lines) {
  var addr = h('div.tt-address', {}, lines.map(function(l) {
    return h('span.tt-address-line', { className: style['tt-address-line'] }, [l])
  }))
  return addr
}
