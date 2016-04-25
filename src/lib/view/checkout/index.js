var bel = require('bel')
var pick = require('object.pick')
var update = require('update-el')
var slugify = function(str) {
  return require('slug')(str, {
    lower: true,
    replacement: '_'
  })
}
var xtend = require('xtend')
var hForm = require('virtual-form')
var getFormData = require('form-data-set')
var style = require('./checkout.csjs')
var config = require('../../../config.json')

module.exports = render

function render(data) {

  function addr() {
    return [
      'First Name',
      'Last Name',
      { name: 'Email', type: 'email' },
      'Address Line 1',
      { name: 'Address Line 2', required: false },
      'City',
      'State',
      'Zipcode'
    ].map(formEl.bind(null, bel.createElement))
  }

  function submitHandler(ev) {
    var billingMap = {
      address_line_1: 'address_1',
      address_line_2: 'address_2',
      state: 'county',
      zipcode: 'postcode',
      city: 'city',
      first_name: 'first_name',
      last_name: 'last_name'
    }

    ev.preventDefault()
    var formData = getFormData(ev.target.elements)
    console.log(formData)

    var billing = Object.keys(formData).reduce(function(acc, k) {
      if (billingMap[k]) acc[billingMap[k]] = formData[k]
      return acc
    }, { country: 'US' })

    var d = {
      misc: {
        gateway: 'dummy',
        customer: pick(formData, ['first_name', 'last_name', 'email']),
        bill_to: billing,
        ship_to: 'bill_to',
        shipping: config.shippingId
      },
      payment: {
        number: formData.card_number,
        expiry_month: formData.expiration,
        expiry_year: '2017',
        cvv: formData.cvv
      }
    }

    data.actions.submit(d)
  }

  function formEl(h, props) {
    props = typeof props === 'string' ? { name: props } : props
    var attrs = xtend({
      type: 'text',
      required: 'required'
    }, props, {
      name: slugify(props.name)
    })
    if (props.required === false) {
      delete attrs.required
    }
    return h('label', {}, [props.name, h('input', attrs)])
  }

  function onShippingChange(ev) {
    var el = bel`
      <div id="shipping-addr-fields">
        ${ev.target.checked ? '' : addr()}
      </div>
    `
    update(document.getElementById('shipping-addr-fields'), el)
  }

  function payment() {
    // var fe = formEl.bind(null, bel.createElement)
    // return [
    //   fe({ name: 'Card Number', type: 'number' }),
    //   bel`
    //     <label>
    //       Expiration
    //       <select name="expiration">
    //         ${range(1, 13).map(function createOption(n) {
    //           return bel`
    //             <option value="
    //           `
    //         })}
    //       </select>
    //   `
    // ]
    return [
      { name: 'Card Number', type: 'number' },
      { name: 'Expiration', placeholder: '01/2015' },
      { name: 'cvv', type: 'number', placeholder: '000' }
    ].map(formEl.bind(null, bel.createElement))
  }

  var form = bel`
    <div class="tt-checkout ${style['tt-checkout']}">
      <form onsubmit=${submitHandler}>

        <fieldset>
          <legend>Billing Address</legend>
          ${addr()}
        </fieldset>

        <fieldset>
          <legend>Shipping Address</legend>
          <label>
            <input type="checkbox" name="ship_to" onchange=${onShippingChange} value="bill_to" checked="true">
            It's the same as my billing address!
          </label>
          <div id="shipping-addr-fields">
          </div>
        </fieldset>

        <fieldset>
          <legend>Payment</legend>
          ${payment()}
        </fieldset>

        <div class="tt-form-buttons ${style['tt-form-buttons']}">
          <button type="submit">Review Order</button>
        </div>

      </form>
    </div>
  `

  return form
}
