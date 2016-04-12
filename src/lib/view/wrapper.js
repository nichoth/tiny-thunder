var bel = require('bel')
var head = require('./head')
var nav = require('./nav')
var navStyle = require('./nav.csjs')
var products = require('./products')

module.exports = function(data) {

//   var navEl = bel`
//     <nav class="${navStyle['main-nav']}">
//       ${nav(data.links)}
//       ${subLinks}
//     </nav>
//   `

  function a(link) {
    return bel`<a href="${link.url}">${link.text}</a>`
  }

  var navEls = data.links.map(a)
  var subLinks = data.subLinks ? data.subLinks.map(a) : []

  return bel`
    <div class="wrapper">
      ${head({ nav: navEls, subNav: subLinks })}
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
