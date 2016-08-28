var style = require('./real-button.csjs.js')
var arrify = require('arrify')
var xtend = require('xtend')
var yo = require('yo-yo')

module.exports = function(attrs, content) {
  var cl = (attrs.className || '') + ' ' + style['real-button']
  return yo.createElement('button',
    xtend(attrs, { className: cl }), arrify(content))
}

