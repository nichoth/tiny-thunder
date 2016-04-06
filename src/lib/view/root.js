var bel = require('bel')
var head = require('../view/head')
var nav = require('../view/nav')
var logo = require('./logo')

module.exports = function renderRoot(data) {

  var links = [
    { url: '/cart', text: 'cart' },
    { url: '/shop', text: 'shop' },
    { url: '/', text: 'home' }
  ]

  return bel`
    <div class="root">
      ${nav(bel, links)}
      ${head(bel)}
      <div style="width: 30%">
      </div>

      <div style="width: 32vw; height: 33vw; display: inline-block;">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon points="50,50 0,0 100,0"/>
        </svg>
      </div>

      <div style="width: 32vw; height: 33vw; display: inline-block;">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon points="50,50 0,0 100,0"/>
        </svg>
      </div>

      <div style="width: 32vw; height: 33vw; display: inline-block;">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon points="50,50 0,0 100,0"/>
        </svg>
      </div>

      <div>
      <svg width="100" height="100" viewPort="0 0 100 100">
          <polygon points="50,0 0,100 100,100" fill="red"/>
      </svg>
      </div>

    </div>
  `
}
