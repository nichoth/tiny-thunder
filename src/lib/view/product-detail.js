var bel = require('bel')
var style = require('./product-detail.csjs')
var cartIcon = require('./components/cart-icon')
var logoIcon = require('./components/logo-icon')
var button = require('./components/button.js')
var loading = require('./components/spinner')
var buttonBack = require('./components/button-back')
var stickyNav = require('./components/sticky-nav')

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

  function nav() {
    return bel`
      <div class="tt-product-nav ${style['product-nav']}">
        ${buttonBack()}
        ${cartIcon({
          isResolving: c.isResolving,
          total: c.total_unique_items
        })}
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
    var add = button({
      href: '#',
      onclick: addToCart
    }, 'add to cart')

    var view = button({ href: '/cart' }, 'view cart')

    var inCart = Object.keys(c.contents).find(function(id) {
      var item = c.contents[id]
      return item.id === p.id
    })
    return inCart ? view : add
  }

  return bel`
    <div class="tt-product-detail ${style['product-detail-page']}">


      ${stickyNav([
        buttonBack(),
        logoIcon(),
        cartIcon({
          isResolving: c.isResolving,
          total: c.total_unique_items
        })
      ])}

      ${imageGallery(images)}

      <div class="${style['product-description']}">
        ${head()}

        <div class="tt-product-desc">
          <p class="tt-prod-desc-text">${p.description}</p>
          <div class="tt-price ${style['tt-price']}">${p.price.value}</div>
        </div>

        <hr>

        <div class="tt-prod-buttons ${style['tt-prod-buttons']}">
          ${p.isResolving || data.cart.isResolving ? loading() : addButton()}
        </div>
      </div>

    </div>
  `
}
