var style = require('./button.csjs.js')
var arrify = require('arrify')
var xtend = require('xtend')
var bel = require('bel')

module.exports = function(attrs, content) {
  var cl = (attrs.className || '') + ' ' + style.button
  return bel.createElement('a',
    xtend(attrs, { className: cl }), arrify(content))
}
