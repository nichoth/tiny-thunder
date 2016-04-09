var bel = require('bel')
var xtend = require('xtend')
var loading = require('../view/loading')
var renderCart = require('h-shopping-cart')
var qtyEl = require('./quantity')

module.exports = function render(data) {
  var cart = data.cart
  console.log(data)

  if (cart.isResolving) {
    return loading()
  }

  function symbol(content) {
    return bel.createElement('span.mod', {
      style: "color: gray"
    }, [content])
  }

  function onQtyChange(row, ev) {
    if (ev.target.value != row.quantity) {
      data.onAction.qtyChange(row.cartRowId, ev.target.value)
    }
  }

  function onDel(row, ev) {
    console.log(arguments)
    ev.preventDefault()
    data.onAction.remove(row.cartRowId)
  }

  var cartEl = renderCart(bel, xtend(data, {
    rows: Object.keys(cart.cart.contents).map(function(id) {
      var row = xtend(cart.cart.contents[id], {
        cartRowId: id
      })
      var rowControls = data.isUpdating ? '' : {
        priceTotal: [
          symbol('= '),
          row.totals.post_discount.formatted.without_tax
        ],
        q: [
          symbol('= '),
          qtyEl(row.quantity, onQtyChange.bind(null, row))
        ]
      }

      return {
        delete: bel`<a href="#" onclick=${onDel.bind(null, row)}>del</a>`,
        title: row.title,
        priceEach: ['$' + row.price, symbol(' ea')],
        quantity: rowControls.q,
        priceTotal: rowControls.priceTotal
      }
    })
  }))

  function controls() {
    var checkout = bel`<a href="/cart/checkout">buy these</a>`
    var update = '???'
    return data.isUpdating ? update : checkout
  }

  return bel`
    <div class="tt-cart">
      ${cartEl}
      ${controls()}
    </div>
  `

}
