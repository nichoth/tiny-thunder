var bel = require('bel')
var style = require('./sticky-nav.csjs')

module.exports = function(content) {
  return bel`
    <div class="${style['sticky-nav']}">
      <nav>
        ${content}
      </nav>
    </div>
  `
}
