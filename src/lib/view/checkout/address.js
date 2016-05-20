var bel = require('bel')
var h = bel.createElement
var pick = require('object.pick')
var update = require('update-el')
var getFormData = require('form-data-set')
var button = require('../components/real-button')
var formEl = require('./form-el')
var style = require('./checkout.csjs')
var nav = require('./checkout-nav')
var config = require('../../../config.json')

module.exports = function(data) {

  function addr() {
    return [
      h('div', { className: style['field-container'] }, [
        { name: 'First Name', className: style.half },
        { name: 'Last Name', className: style.half }
      ].map(formEl.bind(null, h))),
      h('div', { className: style['field-container'] }, [
        formEl(h, 'Street')
      ]),
      h('div', { className: style['field-container'] }, [
        { name: 'City', className: style.third },
        { name: 'State', className: style.third },
        { name: 'Zipcode', className: style.third }
      ].map(formEl.bind(null, h))),
      formEl(h, { name: 'Email', type: 'email' })
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

  function submitHandler(ev) {
    ev.preventDefault()

    var billingMap = {
      street: 'address_1',
      state: 'county',
      zipcode: 'postcode',
      city: 'city',
      first_name: 'first_name',
      last_name: 'last_name'
    }

    var formData = getFormData(ev.target.elements)
    console.log(formData)

    var billing = Object.keys(formData).reduce(function(acc, k) {
      if (billingMap[k]) acc[billingMap[k]] = formData[k]
      return acc
    }, { country: 'US', address_2: '' })

    var d = {
      customer: pick(formData, ['first_name', 'last_name', 'email']),
      bill_to: billing,
      ship_to: 'bill_to'
    }

    data.actions.submitAddress(d)
  }

  return bel`
    <div class="tt-checkout ${style['tt-checkout']}">

      ${nav('address', data.actions.setStep)}

      <form onsubmit=${submitHandler}>

        <fieldset class="${style['address']}">
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

        <div class="tt-form-buttons ${style['tt-form-buttons']}">
          ${button({ type: 'submit' }, 'Payment')}
        </div>

      </form>
    </div>
  `
}
