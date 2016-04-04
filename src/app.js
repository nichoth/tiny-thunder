var Router = require('./lib/routes')
var bel = require('bel')
var update = require('update-el')
var four04 = require('./lib/view/404')
var moltin = new Moltin({
  publicId: process.env.PUBLIC_ID
})

module.exports = function() {

  var el = render('')

  moltin.Authenticate(function(auth) {
    var router = Router(moltin)
    router(function onChange(data) {
      update(el, data.activeRoute())
    })
  })

  function render(content) {
    return bel`<div class="app">${content}</div>`
  }

  return el
}

