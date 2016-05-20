var bel = require('bel')
var pick = require('object.pick')
var getFormData = require('form-data-set')
var addClass = require('dom101/add-class')
var toggleClass = require('dom101/toggle-class')
var update = require('yo-yo').update
var formEl = require('./form-el')
var loading = require('../components/spinner')
var button = require('../components/real-button')
var cartSummary = require('./cart-summary')
var h = bel.createElement
var style = require('./checkout.csjs')
var ccRegex = require('credit-card-regex')

function payment() {
  var prefix = 'tt-payment-'
  var input = formEl.bind(null, bel.createElement, prefix)

  return [
    input({ name: 'Card Number', onfocus: onFocus,
      pattern: ccRegex({exact: true}).source
    }),
    h('div', { className: style['field-container'] }, [
      { name: 'Expiration Month', placeholder: '01', pattern: '^(0?[1-9]|1[012])$' },
      { name: 'Expiration Year', placeholder: '2019', maxlength: 4,
        oninput: function(ev) {
          ev.stopPropagation()
          var val = +ev.target.value
          var currYear = (new Date()).getFullYear()
          var v = val >= currYear && val < 2100
          toggleClass(ev.target.parentElement, style.invalid, !v)
        }
      },
      { name: 'cvv', placeholder: '000', maxlength: 4,
        title: 'The code on the back'
      }
    ].map(addFocusHandler).map(input))
  ]

}

function onFocus(ev) {
  addClass(ev.target.parentElement, style['has-focused'])
}

function addFocusHandler(obj) {
  obj.onfocus = onFocus
  return obj
}

function addr(idPrefix) {

  var addrInput = formEl.bind(null, h, 'tt-'+idPrefix)

  return [
    h('div', { className: style['field-container'] }, [
      { name: 'First Name', className: style.half },
      { name: 'Last Name', className: style.half }
    ].map(addFocusHandler).map(addrInput)),
    h('div', { className: style['field-container'] }, [
      addrInput({ name: 'Street', onfocus: onFocus })
    ]),
    h('div', { className: style['field-container'] }, [
      { name: 'City', className: style.third },
      { name: 'State', className: style.third },
      { name: 'Zipcode', className: style.third }
    ].map(addFocusHandler).map(addrInput)),
    addrInput({ name: 'Email', type: 'email', onfocus: onFocus })
  ]
}

// show or hide fields for shipping address
function onShippingChange(ev) {
  var el = bel`
    <div id="shipping-addr-fields">
      ${ev.target.checked ? '' : addr('shipping')}
    </div>
  `
  update(document.getElementById('shipping-addr-fields'), el)
}

module.exports = function renderCheckout(data) {

  function placeOrder(ev) {
    ev.preventDefault()
    var formData = getFormData(ev.target.elements)
    console.log('form data', formData)

    var billingMap = {
      street: 'address_1',
      state: 'county',
      zipcode: 'postcode',
      city: 'city',
      first_name: 'first_name',
      last_name: 'last_name'
    }

    var billing = Object.keys(formData).reduce(function(acc, k) {
      if (billingMap[k]) acc[billingMap[k]] = formData[k]
      return acc
    }, { country: 'US', address_2: '' })

    data.actions.submitOrder({
      order: {
        customer: pick(formData, ['first_name', 'last_name', 'email']),
        bill_to: billing,
        ship_to: 'bill_to'
      },
      payment: {
        number: formData.card_number,
        expiry_month: formData.expiration_month,
        expiry_year: formData.expiration_year,
        cvv: formData.cvv
      }
    })
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
    // add 'invalid' class to label elmt
    var v = ev.target.checkValidity()
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
              <legend>Billing</legend>
              ${addr('billing')}
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

