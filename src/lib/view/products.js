var bel = require('bel')
var loading = require('./loading')
var style = require('./products.csjs')

module.exports = function(data) {
  if (data.isResolving) {
    return loading()
  }

  console.log(data.products)

  var ps = Object.keys(data.products).map(function(id) {
    var p = data.products[id]
    return bel`
      <li class="tt-product ${style['product-list-item']}">
        <div>
          ${p.title}
          <img src="${p.images[0].url.http}">
        </div>
      </li>
    `
  })

  return bel`<div class="tt-product-page">
    <ul class="tt-product-list ${style['product-container']}">
      ${ps}
    </ul>
  </div>`
}
