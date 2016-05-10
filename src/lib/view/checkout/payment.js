var bel = require('bel')
var button = require('../components/real-button.js')
var getFormData = require('form-data-set')
var h = bel.createElement
var nav = require('./checkout-nav')
var style = require('./checkout.csjs')
var formEl = require('./form-el')

module.exports = function(data) {

  function payment() {
    return [
      formEl(h, { name: 'Card Number', type: 'number' }),
      h('div', { className: style['field-container'] }, [
        { name: 'Expiration', placeholder: '01/2015' },
        { name: 'cvv', type: 'number', placeholder: '000' }
      ].map(formEl.bind(null, bel.createElement)))
    ]
  }

  function submitHandler(ev) {
    ev.preventDefault()

    var formData = getFormData(ev.target.elements)
    console.log(formData)

    var d = {
      number: formData.card_number,
      expiry_month: formData.expiration,
      expiry_year: '2017',
      cvv: formData.cvv
    }

    data.actions.submitPaymentInfo(d)

  }

  function goBack(ev) {
    ev.preventDefault()
    data.actions.setStep('address')
  }

  return bel`
    <div class="tt-checkout ${style['tt-checkout']}">
      ${nav('payment', data.actions.setStep)}

      <form onsubmit=${submitHandler}>
        <fieldset>
          <legend>Payment</legend>
          ${payment()}
        </fieldset>

        <div class="tt-form-buttons ${style['tt-form-buttons']}">
          ${button({ onclick: goBack }, 'Address')}
          ${button({ type: 'submit' }, 'Review')}
        </div>

      </form>

    </div>
  `
}
