var head = require('../view/head')
var nav = require('../view/nav')
var struct = require('observ-struct')
var bel = require('bel')

function render(data) {

  var links = [
    { url: '/cart', text: 'cart' },
    { url: '/shop', text: 'shop' },
    { url: '/', text: 'home' }
  ]

  return bel`
    <div class="root">
      ${nav(bel, links)}
      ${head(bel)}
    </div>
  `
}

module.exports = function() {
  var route = struct({})
  route.render = render
  return route
}
