var Router = require('./lib/routes')
var bel = require('yo-yo')
var update = bel.update
var throttle = require('raf-listen')
var addClass = require('dom101/add-class')
var hasClass = require('dom101/has-class')
var removeClass = require('dom101/remove-class')
var outerHeight = require('dom101/outer-height')
var moltin = new Moltin({
  publicId: process.env.PUBLIC_ID
})
window.moltin = moltin

module.exports = function() {

  function listen () {
    var st = window.st = require('scrolltop')
    var navEl = document.querySelector('nav.main-nav')
    var logoEl = document.querySelector('.logo-wrapper')
    var offset = navEl.offsetTop
    var throttledScroll = throttle(onScroll)
    var winHeight = window.innerHeight
    var h = outerHeight(logoEl)
    if (navEl) {
      window.addEventListener('scroll', throttledScroll)
    }

    function onScroll (ev) {
      var viewportHeight = outerHeight(logoEl)
      var scrTop = st()
      var navHeight = outerHeight(document.querySelector('.diamond-wrapper'))
      if (scrTop >= (viewportHeight - navHeight + 5)) {
        addClass(navEl, 'sticky')
      } else {
        if (hasClass(navEl, 'sticky')) removeClass(navEl, 'sticky')
      }

    }
  }

  var el = render('')

  moltin.Authenticate(function onSuccess(auth) {
    var router = Router(moltin)
    router(function onChange(content) {
      update(el, render(content))
      listen()
    })
  }, function onErr(err) {
    console.log('arr', err)
  })

  function render(content) {
    return bel`<div class="app">${content}</div>`
  }

  return el
}

