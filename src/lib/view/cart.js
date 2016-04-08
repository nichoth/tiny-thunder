var bel = require('bel')
var xtend = require('xtend')
var loading = require('../view/loading')
var renderCart = require('h-shopping-cart')

module.exports = function render(data) {

  console.log(data)

  function symbol(content) {
    return bel.createElement('span.mod', {
      style: "color: gray"
    }, [content])
  }

  if (data.isResolving) {
    return loading()
  }

  return renderCart(bel, xtend(data, {
    rows: Object.keys(data.cart.contents).map(function(id) {
      var row = data.cart.contents[id]
      var priceTotal = row.totals.post_discount.formatted.without_tax

      return {
        delete: 'del',
        title: row.title,
        priceEach: '$' + row.price + ' ea',
        quantity: [symbol('×'), row.quantity],
        priceTotal: [symbol('='), priceTotal]
      }
    })
  }))
}
