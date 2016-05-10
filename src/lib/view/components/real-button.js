var style = require('./real-button.csjs.js')
var arrify = require('arrify')
var xtend = require('xtend')
var bel = require('bel')

module.exports = function(attrs, content) {
  var cl = (attrs.className || '') + ' ' + style['real-button']
  return bel.createElement('button',
    xtend(attrs, { className: cl }), arrify(content))
}

