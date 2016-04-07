var bel = require('bel')
var delButton = require('h-buttons/lib/delete')
var style = require('./product-detail.csjs')
var loading = require('./loading')

module.exports = function(data) {
  var p = data.product
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
        ${delButton(bel.createElement, {
          style: "width: 2em; height: 2em; opacity: 0.6;"
        }, [])}
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

  return bel`
    <div class="tt-product-detail ${style['product-detail-page']}">
      ${nav()}

      ${imageGallery(images)}

      ${head()}

      <p>
        ${p.description}
      </p>
    </div>
  `
}
