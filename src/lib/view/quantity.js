var bel = require('bel')
var style = require('./cart.csjs')

module.exports = function(qty, onchange) {
  return bel`
    <input class="tt-qty-btn ${style['tt-qty-btn']}"
      type="number"
      value=${qty}
      onblur=${onchange}
    >
  `
}
