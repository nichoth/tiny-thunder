var renderCart = require('h-shopping-cart')
var struct = require('observ-struct')
var delButton = require('h-buttons/lib/delete')
var xtend = require('xtend')
var CartStore = require('../data/cart')
var bel = require('bel')

function render(data) {

  function symbol(content) {
    return bel.createElement('span.mod', {
      style: "color: gray"
    }, [content])
  }

  return renderCart(bel, xtend(data, {
    rows: Object.keys(data.contents).map(function(id) {
      var row = data.contents[id]
      var priceTotal = row.totals.post_discount.formatted.without_tax

      return {
        delete: delButton(bel.createElement, {
          title: 'Delete',
          onclick: console.log.bind(console, 'del')
        }),
        title: row.title,
        priceEach: '$' + row.price + ' ea',
        quantity: [symbol('×'), row.quantity],
        priceTotal: [symbol('='), '$' + priceTotal]
      }
    })
  }))
}

module.exports = function(moltin) {
  var route = CartStore(moltin)
  route.render = render
  return route
}
