var bel = require('bel')
var style = require('./product-detail.csjs')
var btnStyle = require('./btns.csjs')
var buttonStyle = require('h-buttons')
var loading = require('./loading')
var backBtn = require('./svg').back

module.exports = function(data) {
  var p = data.product
  var c = data.cart.cart
  console.log(data)

  if (data.isResolving) {
    return loading()
  }

  var images = p.images.map(function(img) {
    return img.url.http
  })

  function cartIcon() {
    var content = data.cart.isResolving ? '?' : c.total_unique_items

    return bel`<span class="tt-cart-icon">
      <a href="/cart">cart: </a>
      ${content}
    </span>`
  }

  function nav() {
    return bel`
      <div class="tt-product-nav ${style['product-nav']}">
        <div class="tt-back-btn ${btnStyle['tt-btn']}">
          <a href="#">${backBtn()}</a>
        </div>
        ${cartIcon()}
      </div>
    `
  }

  function imageGallery(images) {
    return bel`
      <div class="tt-product-image-gallery ${style['product-gallery']}">
        <div class="${style['main-image']}">
          <img src="${images[0]}">
        </div>
      </div>
    `
  }

  function head() {
    return bel`
      <header>
        <h1 class="${style['product-title']}">${p.title}</h1>
        <hr>
      </header>
    `
  }

  function addToCart(ev) {
    ev.preventDefault()
    console.log('cart add')
    data.actions.addToCart(p, 1)
  }

  function addButton() {
    var add = bel`
      <a href="#" onclick=${addToCart}>add to cart</a>
    `
    var view = bel`
      <a href="/cart">view the cart</a>
    `
    var inCart = Object.keys(c.contents).find(function(id) {
      var item = c.contents[id]
      return item.id === p.id
    })
    return inCart ? view : add
  }

  return bel`
    <div class="tt-product-detail ${style['product-detail-page']}">
      ${nav()}

      ${imageGallery(images)}

      ${head()}

      <p>
        ${p.description}
        <span class="tt-price ${style['tt-price']}">${p.price.value}</span>
      </p>

      <hr>

      <div class="tt-prod-buttons ${style['tt-prod-buttons']}">
        ${p.isResolving || data.cart.isResolving ? '?' : addButton()}
      </div>

    </div>
  `
}
