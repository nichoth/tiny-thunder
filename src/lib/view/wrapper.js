var yo = require('yo-yo')
var head = require('./head')
var products = require('./products')
var style = require('./fancy-nav.csjs')

module.exports = function(data) {

  function a(link) {
    var cl = link.activeLink ? style['active-link'] : ''
    return yo`<a href="${link.url}" class="${cl}">${link.text}</a>`
  }

  var navEls = data.links.map(a)
  var subLinks = data.subLinks ? data.subLinks.map(a) : []

  return yo`
    <div class="wrapper">
      ${head({ links: { nav: navEls, subNav: subLinks }, cart: data.cart })}
      ${products(data)}

      <svg class="diamond" width="0" height="0">
        <defs>
          <clipPath id="clippy-diamond" clipPathUnits="objectBoundingBox">
            <polygon points="0.5 0, 1 0.5, 0.5 1, 0 0.5" />
          </clipPath>
        </defs>
      </svg>

    </div>
  `
}
