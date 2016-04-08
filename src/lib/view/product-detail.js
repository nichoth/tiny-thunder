var bel = require('bel')
var style = require('./product-detail.csjs')
var buttonStyle = require('h-buttons')
var loading = require('./loading')

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
        ${cartIcon()}
        <a href="/" class="${style['tt-button-del']}" style="width: 2em; height: 2em;"></a>
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
    data.addToCart(p, 1, function(err, resp) {
      console.log('added', arguments)
    })
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

      <div>
        <a href="#" onclick=${addToCart}>add to cart</a>
      </div>

    </div>
  `
}
