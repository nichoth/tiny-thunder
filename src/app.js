var Router = require('./lib/routes')
var bel = require('yo-yo')
var update = bel.update
var config = require('../config')
var moltin = new Moltin({
  publicId: config.PUBLIC_ID
})
window.moltin = moltin

module.exports = function() {

  var el = render('')

  moltin.Authenticate(function onSuccess(auth) {
    var router = Router(moltin)
    router(function onChange(content) {
      update(el, content)
    })
  }, function onErr(err) {
    console.log('arr', err)
  })

  function render(content) {
    return bel`<div class="app">${content}</div>`
  }

  return el
}

