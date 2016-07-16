var Router = require('./lib/routes')
var bel = require('yo-yo')
var update = bel.update
var throttle = require('raf-listen')
var addClass = require('dom101/add-class')
var hasClass = require('dom101/has-class')
var removeClass = require('dom101/remove-class')
var moltin = new Moltin({
  publicId: process.env.PUBLIC_ID
})
window.moltin = moltin

module.exports = function() {

  var el = render('')

  function listen () {
    var st = window.st = require('scrolltop')
    var el = document.querySelector('nav.main-nav')
    var offset = el.offsetTop
    var throttledScroll = throttle(onScroll)
    window.addEventListener('scroll', throttledScroll)

    function onScroll (ev) {
      if ((st() - 20) >= offset) {
        addClass(el, 'sticky')
      } else {
        if (hasClass(el, 'sticky')) removeClass(el, 'sticky')
      }
    }
  }

  moltin.Authenticate(function onSuccess(auth) {
    var router = Router(moltin)
    router(function onChange(content) {
      update(el, render(content))
      listen()
      console.log(el.querySelector('nav.main-nav'))
    })
  }, function onErr(err) {
    console.log('arr', err)
  })

  function render(content) {
    return bel`<div class="app">${content}</div>`
  }

  return el
}

