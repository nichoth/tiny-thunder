var bel = require('bel')
var style = require('./logo-icon.csjs')
module.exports = function() {
  return bel`
    <div class="tt-logo-icon ${style['logo-icon']}">
      <a href="/">♦</a>
    </div>
  `
}
