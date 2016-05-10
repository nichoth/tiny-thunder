var bel = require('bel')
var loading = require('../components/spinner')
var button = require('../components/real-button')
var cartSummary = require('./cart-summary')
var h = bel.createElement
var style = require('./checkout.csjs')
var nav = require('./checkout-nav')

module.exports = function(data) {
  var bAddr = data.order.orderInfo.bill_to
  var sAddr = data.order.orderInfo.ship_to
  var card = data.order.paymentInfo

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

  function addr(lines) {
    var addr = h('div', {}, lines.map(function(l) {
      return h('span', { className: style['tt-address-line'] }, [l])
    }))
    return addr
  }

  function placeOrder(ev) {
    ev.preventDefault()
    data.actions.submitOrder()
  }

  function error() {
    if (data.order.status.type === 'error') {
      return bel`
        <div class="${style['error']}">
          Uh oh: ${data.order.status.msg}
        </div>
      `
    }
  }

  function revClass() {
    return style['tt-review-section'] + ' tt-review-section'
  }

  function goBack(ev) {
    ev.preventDefault()
    data.actions.setStep('payment')
  }

  return bel`
    <div class="${style['tt-checkout'] + ' '+style['tt-review']}">

      ${nav('review', data.actions.setStep)}

      ${error()}

      <section class="${style.summary}">

        <div class="${revClass()}">
          <h2>${addrHead}</h2>
          ${addr(addrLines)}
        </div>

        <div class="${revClass()}">
          <h2>Payment</h2>
          <p>Card ending in ${card.number.slice(-4)}</p>
        </div>

      </section>

      <section class="${style.summary}">
        <div class="${revClass()}">
          <h2>Order</h2>
          ${cartSummary(data.cart.cart.contents)}
        </div>
      </section>

      <section class="${style.summary}">
        ${data.isResolving ?
          loading() :
          bel`
            <div class="tt-form-buttons ${style['tt-form-buttons']}">
              ${button({ onclick: goBack }, '<< Payment')}
              ${button({ onclick: placeOrder }, 'Place Order')}
            </div>
          `
        }
      </section>

    </div>
  `
}
