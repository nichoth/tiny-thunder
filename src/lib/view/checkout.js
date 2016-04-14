var bel = require('bel')
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

module.exports = render

function render(data) {

  function addr() {
    return [
      'First Name',
      'Last Name',
      { name: 'Email', type: 'email' },
      'Address Line 1',
      'Address Line 2',
      'City',
      'State',
      'Zipcode'
    ].map(formEl.bind(null, bel.createElement))
  }

  function submitHandler(ev) {
    ev.preventDefault()
    console.log(getFormData(ev.target.elements))
  }

  function formEl(h, props) {
    props = typeof props === 'string' ? { name: props } : props
    var attrs = xtend({
      type: 'text',
      required: 'required'
    }, props, {
      name: slugify(props.name)
    })
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
            <input type="checkbox" onchange=${onShippingChange} value="bill_to" checked="true">
            It's the same as my billing address!
          </label>
          <div id="shipping-addr-fields">
          </div>
        </fieldset>
        <button type="submit">Review Order</button>
      </form>
      this is the checkout page
    </div>
  `

  return form
}
