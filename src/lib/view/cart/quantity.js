var yo = require('yo-yo')
var h = yo.createElement
var xtend = require('xtend')
var style = require('./cart.csjs')

module.exports = function(attrs) {
  var cl = attrs.className ?
    attrs.className + ' '+style['tt-qty-btn'] :
    style['tt-qty-btn']

  return h('input', xtend(attrs, {
    type: 'number',
    className: cl
  }), [])

  // return yo`
  //   <input class="tt-qty-btn ${style['tt-qty-btn']}"
  //     type="number"
  //     value=${qty}
  //     onblur=${onchange}
  //   >
  // `
}
