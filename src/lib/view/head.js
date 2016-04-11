var logo = require('./logo')
var style = require('./fancy-nav.csjs')
var bel = require('bel')

var diamond = function() {
  return bel`
    <div class="diamond-item ${style['diamond-item']}">
      <span class="nav-text ${style['nav-text']}">
        example
      </span>
      <svg class="test" width="100%" height="100%" viewBox="0 0 100 100"
        preserveAspectRatio="none">
        <polyline fill="green" stroke="black"
          points="0,0 50,100, 100,0"
          />
      </svg>
    </div>
  `
}

module.exports = function render (content) {
  return bel`
    <header>
      <h1 class="site-name">tiny thunder</h1>
      <div class="logo-wrapper">
        ${logo()}
      </div>

      <div class="diamond-wrapper ${style['diamond-wrapper']}">
        ${diamond()}
        ${diamond()}
        ${diamond()}
        ${diamond()}
      </div>

      ${content}
    </header>
  `
}
