var bel = require('bel')
var spinner = require('./spinner')
var style = require('./product-detail.csjs')
var btnStyle = require('./btns.csjs')
var buttonStyle = require('h-buttons')
//var loading = require('./loading')
var loading = require('./spinner')
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

    return bel`
      <a title="view cart" href="/cart" class="tt-cart-icon ${style['tt-cart-icon']}">
        <span class="tt-cart-qty ${style['tt-cart-qty']}">${content}</span>
        <svg stroke="black" stroke-width="6" class="cart-icon" width="100%" height="100%" viewBox="0 0 100 100"
          preserveAspectRatio="none">
          <path d="M5 8 L 25 8 L 60 70 L 95 5" fill="none" stroke-linejoin="miter" />
        </svg>
      </a>
    `
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
      <a class="tt-button" href="#" onclick=${addToCart}>add to cart</a>
    `
    var view = bel`
      <a class="tt-button" href="/cart">view cart</a>
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

      <p class="tt-product-desc">
        ${p.description}
        <span class="tt-price ${style['tt-price']}">${p.price.value}</span>
      </p>

      <hr>

      <div class="tt-prod-buttons ${style['tt-prod-buttons']}">
        ${p.isResolving || data.cart.isResolving ? spinner() : addButton()}
      </div>

    </div>
  `
}
