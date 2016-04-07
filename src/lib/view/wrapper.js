var bel = require('bel')
var head = require('./head')
var nav = require('./nav')
var navStyle = require('./nav.csjs')
var products = require('./products')

module.exports = function(data) {
  console.log(data)
  var subLinks = data.subLinks ? nav(data.subLinks) : ''

  return bel`
    <div class="wrapper">
      ${head(
        bel`
          <nav class="${navStyle['main-nav']}">
            ${nav(data.links)}
            ${subLinks}
          </nav>
        `
      )}
      ${products(data)}
    </div>
  `
}
