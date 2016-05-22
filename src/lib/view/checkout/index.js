var bel = require('bel')
var orderForm = require('./form')
var cartIcon = require('../components/cart-icon')
var logoIcon = require('../components/logo-icon')
var style = require('./index.csjs')
var stickyNav = require('../components/sticky-nav')
var successView = require('./success')

function emptyCart(cartData) {
  var content = cartData.isResolving ? '' :
    'Your cart is empty. Go add some things to it!'

  return bel`
    <p>${content}</p>
  `
}


module.exports = function(data) {
  console.log('checkout', data)
  var empty = !data.cart.cart.total_items || data.cart.cart.total_items < 1
  var success = data.order.status && data.order.status.type === 'success'

  function view() {
    // if cart is empty and we haven't completed an order
    if (empty && !success) {
      return emptyCart(data.cart)
    }
    if (!data.order.status || data.order.status.type === 'error') {
      return orderForm(data)
    }
    return successView(data)
  }

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

      ${view()}

    </div>
  `
}
