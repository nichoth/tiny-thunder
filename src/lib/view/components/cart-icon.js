var bel = require('bel')
var style = require('./cart-icon.csjs')
module.exports = function cartIcon(data) {
  data = data || {}
  data.total = data.total || 0
  var content = data.isResolving ? '?' : data.total

  return bel`
    <a title="view cart" href="/cart" class="tt-cart-icon ${style['tt-cart-icon']}">
      <span class="tt-cart-qty ${style['tt-cart-qty']}">${content}</span>
      <svg stroke="black" stroke-width="6" class="cart-icon" width="100%" height="100%" viewBox="0 0 100 100"
        preserveAspectRatio="none">
        <path d="M5 8 L 25 8 L 60 70 L 95 5" fill="none" stroke-linejoin="miter" />
      </svg>
    </a>
  `
}

