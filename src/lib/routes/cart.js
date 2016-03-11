var renderCart = require('h-shopping-cart')
var delButton = require('h-buttons/lib/delete')
var xtend = require('xtend')

module.exports = function(bel, data) {

  function symbol(content) {
    return bel.createElement('span.mod', {
      style: "color: gray"
    }, [content])
  }

  return renderCart(bel, xtend(data, {
    rows: data.rows.map(function(r) {
      return {
        delete: delButton(bel.createElement, {
          title: 'Delete',
          onclick: r.onDelete
        }),
        title: r.title,
        priceEach: '$' + r.priceEach + ' ea',
        quantity: [symbol('×'), r.quantity],
        priceTotal: [symbol('='), '$' + r.priceTotal]
      }
    })
  }))
}
