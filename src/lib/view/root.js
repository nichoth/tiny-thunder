var bel = require('bel')
var xtend = require('xtend')
var products = require('./products')
var head = require('./head')
var nav = require('./nav')
var links = require('../../config.json').categories

module.exports = function renderRoot(data) {

  var ls = links.map(function(l) {
    return xtend(l, {
      url: '/'+l.name,
      text: l.name,
      activeLink: data.activeCategory === l.name
    })
  })

  return bel`
    <div class="root">
      ${head(bel, ls)}
      ${products(data)}

      <div>
        <svg width="100" height="100" viewPort="0 0 100 100">
            <polygon points="50,0 0,100 100,100" fill="red"/>
        </svg>
      </div>

    </div>
  `
}
