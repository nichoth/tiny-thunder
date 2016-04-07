var bel = require('bel')
var loading = require('./loading')
var style = require('./products.csjs')

module.exports = function(data) {
  if (data.isResolving) {
    return loading()
  }

  console.log(data.products)

  function product(p) {
    return bel`
      <li class="tt-product ${style['product-list-item']}">
        <div class="${style['product-image-wrapper']}" style="background-image: url('${p.images[0].url.http}')">
        </div>
        <p class="tt-product-item-text ${style['product-item-title']}">
          ${p.title}
        </p>
      </li>
    `
  }

  var ps = Object.keys(data.products).map(function(id) {
    var p = data.products[id]
    return product(p)
  })

  return bel`<div class="tt-product-page">
    <ul class="tt-product-list ${style['product-container']}">
      ${ps}
    </ul>
  </div>`
}
