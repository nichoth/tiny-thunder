var head = require('../view/head')
var nav = require('../view/nav')
var struct = require('observ-struct')
var bel = require('bel')

function render(data) {
  return bel`
    <div class="root">
      ${nav(bel)}
      ${head(bel)}
    </div>
  `
}

module.exports = function() {
  var route = struct({})
  route.render = render
  return route
}
