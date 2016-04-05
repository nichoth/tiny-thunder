var bel = require('bel')
var nav = require('./nav')

module.exports = function() {
  return nav(bel, [
    { url: '/shop', text: 'hand' },
    { url: '/shop', text: 'neck' },
    { url: '/shop', text: 'ear' },
    { url: '/shop', text: 'etc' },
  ])
}
