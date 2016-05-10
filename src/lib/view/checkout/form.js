var bel = require('bel')
var addClass = require('dom101/add-class')
var toggleClass = require('dom101/toggle-class')
var update = require('yo-yo').update
var formEl = require('./form-el')
var paymentForm = require('./payment')
var loading = require('../components/spinner')
var button = require('../components/real-button')
var cartSummary = require('./cart-summary')
var h = bel.createElement
var style = require('./checkout.csjs')
var nav = require('./checkout-nav')

function payment() {
  return [
    formEl(h, { name: 'Card Number' }),
    h('div', { className: style['field-container'] }, [
      { name: 'Expiration', placeholder: '01/2015' },
      { name: 'cvv', placeholder: '123' }
    ].map(formEl.bind(null, bel.createElement)))
  ]
}

function addr() {

  function onFocus(ev) {
    addClass(ev.target.parentElement, style['has-focused'])
  }

  function addFocusHandler(obj) {
    obj.onfocus = onFocus
    return obj
  }

  return [
    h('div', { className: style['field-container'] }, [
      { name: 'First Name', className: style.half },
      { name: 'Last Name', className: style.half }
    ].map(addFocusHandler).map(formEl.bind(null, h))),
    h('div', { className: style['field-container'] }, [
      formEl(h, { name: 'Street', onfocus: onFocus })
    ]),
    h('div', { className: style['field-container'] }, [
      { name: 'City', className: style.third },
      { name: 'State', className: style.third },
      { name: 'Zipcode', className: style.third }
    ].map(addFocusHandler).map(formEl.bind(null, h))),
    formEl(h, { name: 'Email', type: 'email', onfocus: onFocus })
  ]
}

function onShippingChange(ev) {
  var el = bel`
    <div id="shipping-addr-fields">
      ${ev.target.checked ? '' : addr()}
    </div>
  `
  update(document.getElementById('shipping-addr-fields'), el)
}

module.exports = function(data) {
  var bAddr = data.order.orderInfo.bill_to
  var sAddr = data.order.orderInfo.ship_to
  var card = data.order.paymentInfo

  var isValid = false

  var addrLines = [
    bAddr.first_name + ' ' + bAddr.last_name,
    bAddr.address_1,
    bAddr.address_2,
    bAddr.city + ', ' + bAddr.county,
    bAddr.postcode
  ]

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

  function formChange(ev) {
    //var isValid = document.querySelector('form').checkValidity()
    var v = ev.target.checkValidity()
    //if (!v) return addClass(ev.target.parentElement, style.invalid)
    toggleClass(ev.target.parentElement, style.invalid, !v)
  }

  return bel`
    <div class="${style['tt-checkout'] + ' '+style['tt-review']}">

      ${error()}

      <section>
        <form onsubmit=${placeOrder} oninput=${formChange}>

          <div class="${style['form-section']}">
            <h2>Address</h2>
            <fieldset>
              <legend>Billing Address</legend>
              ${addr()}
            </fieldset>

            <fieldset>
              <legend>Shipping Address</legend>
              <label>
                <input type="checkbox" name="ship_to" onchange=${onShippingChange} value="bill_to" checked="true">
                It's the same as my billing address
              </label>
              <div id="shipping-addr-fields">
              </div>
            </fieldset>
          </div>

          <div class="${style['form-section']}">
            <h2>Payment</h2>
            <fieldset>
              <legend>Card Info</legend>
              ${payment()}
            </fieldset>
          </div>

          <div class="tt-form-buttons ${style['tt-form-buttons']}">
            ${data.isResolving ? loading() : [
              button({ type: 'submit' }, 'Place Order')
            ]}
          </div>

        </form>
      </section>

      <section>
        <h2>Order</h2>
        ${cartSummary(data.cart.cart.contents)}
      </section>


    </div>
  `
}

