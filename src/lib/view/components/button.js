var style = require('./button.csjs.js')
var arrify = require('arrify')
var xtend = require('xtend')
var yo = require('yo-yo')

module.exports = function(attrs, content) {
  var cl = (attrs.className || '') + ' ' + style.button
  return yo.createElement('a',
    xtend(attrs, { className: cl }), arrify(content))
}
