var bel = require('bel')
var orderForm = require('./form')
var cartIcon = require('../components/cart-icon')
var logoIcon = require('../components/logo-icon')
var style = require('./index.csjs')
var stickyNav = require('../components/sticky-nav')


module.exports = function(data) {
  console.log('checkout', data)

  var cl = style['tt-checkout-wrapper']
  cl = data.isResolving ?
    cl + ' ' + style['resolving'] :
    cl

  return bel`
    <div class="${cl}">

      ${stickyNav([
        logoIcon(),
        bel`<div class="${style['head']}">Checkout</div>`,
        cartIcon({
          isResolving: data.cart.isResolving,
          total: data.cart.cart.total_unique_items
        })
      ])}

      ${orderForm(data)}

    </div>
  `
}
