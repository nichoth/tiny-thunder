var yo = require('yo-yo')
var style = require('./logo-icon.csjs')
module.exports = function() {
  return yo`
    <div class="tt-logo-icon ${style['logo-icon']}">
      <a href="/">♦</a>
    </div>
  `
}
