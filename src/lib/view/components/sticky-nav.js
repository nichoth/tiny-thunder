var yo = require('yo-yo')
var style = require('./sticky-nav.csjs')

module.exports = function(content) {
  return yo`
    <div class="${style['sticky-nav']}">
      <nav>
        ${content}
      </nav>
    </div>
  `
}
