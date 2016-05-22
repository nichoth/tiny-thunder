var bel = require('bel')
var logoIcon = require('../components/logo-icon')
var xtend = require('xtend')
var renderCart = require('h-shopping-cart')
var buttonDel = require('../components/button-del')
var button = require('../components/button')
var loading = require('../components/spinner')
var qtyEl = require('./quantity')
var style = require('./cart.csjs')
var config = require('../../../config.json')
var head = require('../components/checkout-head')
var stickyNav = require('../components/sticky-nav')

module.exports = function render(data) {
  var cart = data.cart
  var isEmpty = data.cart.cart.total_items < 1
  console.log(data)

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

  function delBtn(onClick) {
    return buttonDel({
      title: 'remove from cart',
      onclick: onClick
    })
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
          symbol('× '),
          qtyEl({
            value: row.quantity,
            oninput: onQtyChange.bind(null, row)
          })
        ]
      }

      return {
        delete: delBtn(onDel.bind(null, row)),
        title: bel`<a href="${config.productUrl.prefix+'/'+row.slug}">${row.title}</a>`,
        priceEach: ['$' + row.price, symbol(' ea')],
        quantity: rowControls.q,
        priceTotal: rowControls.priceTotal
      }
    })
  }))

  function updateCart(ev) {
    ev.preventDefault()
    data.onAction.update()
  }

  function controls() {
    var checkoutBtn = data.cart.isDirty ?
      button({ href: '#', onclick: updateCart}, 'update cart') :
      button({
        href: '/cart/checkout',
        className: isEmpty ? style['disabled'] : '',
        onclick: function(ev) {
          if (isEmpty) ev.preventDefault()
        }
      }, 'buy these')

    return bel`
      <div class="${style['button-row']}">
        ${data.cart.isUpdating ? loading() : checkoutBtn}
      </div>
    `
  }

  var content = [
    isEmpty ? bel`<p>This cart is empty.</p>` : cartEl,
    controls()
  ]

  return bel`
    <div class="tt-cart ${style['tt-cart']}">
      ${head('cart')}
      ${stickyNav([
        logoIcon()
      ])}
      ${cart.isResolving ? loading() : content}
    </div>
  `

}
