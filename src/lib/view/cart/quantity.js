var bel = require('bel')
var h = bel.createElement
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

  // return bel`
  //   <input class="tt-qty-btn ${style['tt-qty-btn']}"
  //     type="number"
  //     value=${qty}
  //     onblur=${onchange}
  //   >
  // `
}
