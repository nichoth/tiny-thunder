var h = require('bel').createElement
var arrify = require('arrify')
var style = require('./button-icon.csjs')

module.exports = function(attrs, content) {
  attrs = attrs || {}
  return h('div', { className: style['tt-btn-icon'] }, [
    h('button', attrs, arrify(content))
  ])
}
