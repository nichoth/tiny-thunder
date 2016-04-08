var renderCart = require('h-shopping-cart')
var loading = require('../view/loading')
var xtend = require('xtend')
var CartStore = require('../data/cart')
var bel = require('bel')

function render(data) {

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

module.exports = function(moltin) {
  var route = CartStore(moltin)
  route.render = render
  return route
}
