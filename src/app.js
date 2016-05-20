var Router = require('./lib/routes')
var bel = require('bel')
var update = require('yo-yo').update
var moltin = new Moltin({
  publicId: process.env.PUBLIC_ID
})

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

