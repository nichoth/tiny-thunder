var yo = require('yo-yo')
var style = require('./checkout-head.csjs')

module.exports = function(content) {
  return yo`
    <header class="${style['checkout-head']}">
      <h1>
        ${content}
      </h1>
    </header>
  `
}
