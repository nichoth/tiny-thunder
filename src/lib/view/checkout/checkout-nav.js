var bel = require('bel')
var style = require('./checkout-nav.csjs')

module.exports = function(step, onclick) {

  function navNode(content) {
    var active = step === content ? style.active : ''
    return bel`
      <li class="${active}">
        ${content}
      </li>
    `
  }

  var el = bel`
    <div class="${style['checkout-nav']}">
      <nav>
        <ul>
          ${['address', 'payment', 'review'].map(navNode)}
        </ul>
      </nav>
    </div>
  `

  return el
}
