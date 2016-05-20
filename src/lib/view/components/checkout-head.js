var bel = require('bel')
var style = require('./checkout-head.csjs')

module.exports = function(content) {
  return bel`
    <header class="${style['checkout-head']}">
      <h1>
        ${content}
      </h1>
    </header>
  `
}
